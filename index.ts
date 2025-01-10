import { parseConfig } from "./parse_config";
import { WsClient } from "./ws_client";
import { WsServer } from "./ws_server";

async function main() {
  const config = parseConfig();
  const wss = new WsServer();
  await wss.start(config.port);

  const client = new WsClient(config.target);

  client.onmessage = (message) => {
    wss.update(message);
  };

  await client.connect();

  wss.onmessage = (message) => {
    client.send(message);
  };
}

main();