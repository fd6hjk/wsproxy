import { WebSocketServer } from "ws";

export class WsServer {
  private wss?: WebSocketServer;

  update(message: string) {
    this.wss?.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  #onmessage?: (message: string) => void;

  set onmessage(cb: (message: string) => void) {
    this.#onmessage = cb;
  }

  start(port: number) {
    return new Promise((resolve) => {
      this.wss = new WebSocketServer({ port: port }, () => {
        resolve(null);
      });

      this.wss.on('connection', (ws) => {
        ws.on('message', (message) => {
          this.#onmessage?.(message.toString());
        });
      });
    });
  }

  close() {
    this.wss?.close();
    this.wss = undefined;
  }
}
