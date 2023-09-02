"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const cors_1 = require("./middleware/cors");
const routes_1 = require("./routes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = express();
app.options("*", (0, cors_1.default)());
app.use((0, cors_1.default)());
// @ts-ignore
app.use(express.json({ limit: "5mb" }));
// @ts-ignore
app.use(morgan("dev"));
app.use("/api", routes_1.default);
app.get("/*", (req, res) => {
    res.send("API running successfully...\n");
});
// spinning up the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}...`));
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
});
