"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinsHistoricalData = void 0;
const catch_async_1 = require("../utils/catch-async");
const fs = require("node:fs/promises");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.getCoinsHistoricalData = (0, catch_async_1.default)(async (req, res, next) => {
    try {
        const rawData = await fs.readFile("store/data.json", "utf8");
        const data = JSON.parse(rawData);
        res.json({
            status: true,
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            msg: error.mesage,
        });
    }
});
