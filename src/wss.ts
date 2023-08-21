import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { WebsocketStream } from "@binance/connector";
import { createServer } from "http";
import { Console } from "console";
import { config } from "dotenv";
config();

type WsDataT = {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
};

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// io.on("connection", () => {
//   console.log("Connection to websocket...");
// });

// server.listen(5000, () => {
//   console.log("listening on *:5000");
// });

const logger = new Console({ stdout: process.stdout, stderr: process.stderr });

const symbols = ["BNBUSDT", "BTCUSDT"];

const callbacks = {
  open: () => logger.debug("Connected with Websocket server"),
  close: () => logger.debug("Disconnected with Websocket server"),
  message: (rawData: string) => {
    const data = JSON.parse(rawData) as WsDataT;
    console.log(data);
    if (symbols.includes(data.s)) console.log(data.s);

    // if (symbols.includes(data.s)) {
    //   console.log(data);
    // } else console.log(data.s);
  },
};

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;

const websocketStreamClient = new WebsocketStream({ logger, callbacks });
// subscribe ticker stream
symbols.forEach((symbol) => websocketStreamClient.miniTicker(symbol));
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 5 * 1000);
