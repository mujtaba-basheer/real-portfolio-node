"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_1 = require("socket.io");
const connector_1 = require("@binance/connector");
const http_1 = require("http");
const console_1 = require("console");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = express();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
// io.on("connection", () => {
//   console.log("Connection to websocket...");
// });
// server.listen(5000, () => {
//   console.log("listening on *:5000");
// });
const logger = new console_1.Console({ stdout: process.stdout, stderr: process.stderr });
const symbols = ["BNBUSDT", "BTCUSDT"];
const callbacks = {
    open: () => logger.debug("Connected with Websocket server"),
    close: () => logger.debug("Disconnected with Websocket server"),
    message: (rawData) => {
        const data = JSON.parse(rawData);
        console.log(data);
        if (symbols.includes(data.s))
            console.log(data.s);
        // if (symbols.includes(data.s)) {
        //   console.log(data);
        // } else console.log(data.s);
    },
};
const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const websocketStreamClient = new connector_1.WebsocketStream({ logger, callbacks });
// subscribe ticker stream
symbols.forEach((symbol) => websocketStreamClient.miniTicker(symbol));
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 5 * 1000);
