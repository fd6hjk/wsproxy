import { WebSocket } from "ws";

export class WsClient {
  constructor(
    private readonly url: string,
    private readonly config = {
      reconnect: true,
    }
  ) { }

  private ws?: WebSocket;

  #onmessage?: (message: string) => void;
  set onmessage(cb: (message: string) => void) {
    this.#onmessage = cb;
  }

  async connect() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(this.url);
      this.ws!.onopen = () => {
        resolve(null);
        this.ws!.onmessage = (message) => {
          this.#onmessage?.(message.data.toString());
        }
      }
      this.ws.onclose = () => {
        if (this.config.reconnect) this.handleFailure();
      }
    });
  }

  send(message: string) {
    this.ws?.send(message);
  }

  async handleFailure() {
    console.log('Reconnecting...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.ws?.close();
    await this.connect();
  }
}
