"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransaction = exports.getCoins = exports.getCoinsHistoricalData = void 0;
const catch_async_1 = require("../utils/catch-async");
const fs = require("node:fs/promises");
const db_1 = require("../db");
const dotenv_1 = require("dotenv");
const mongodb_1 = require("mongodb");
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
exports.getCoins = (0, catch_async_1.default)(async (req, res, next) => {
    try {
        const collection = db_1.default.collection("coins");
        const coins = await collection
            .find()
            .project({
            _id: 1,
            name: "$info.name",
        })
            .toArray();
        res.json({
            status: true,
            data: coins,
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
exports.addTransaction = (0, catch_async_1.default)(async (req, res, next) => {
    try {
        const doc = req.body;
        if (doc.date)
            doc.date = new Date(doc.date);
        const dateCheck = doc.date && doc.date instanceof Date;
        const qtyCheck = doc.qty && typeof doc.qty === "number";
        const priceCheck = doc.price && typeof doc.price === "number";
        if (doc.coin)
            doc.coin = new mongodb_1.ObjectId(doc.coin);
        const idCheck = doc.coin && doc.coin instanceof mongodb_1.ObjectId;
        if (!(dateCheck && qtyCheck && priceCheck && idCheck)) {
            throw new Error("Missing or invalid fields!");
        }
        const collection = db_1.default.collection("transactions");
        await collection.insertOne(doc);
        res.json({
            status: true,
            msg: "Added transaction successfully!",
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
