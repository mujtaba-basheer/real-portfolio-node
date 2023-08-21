"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = exports.getAllCoins = void 0;
const catch_async_1 = require("../utils/catch-async");
const connector_1 = require("@binance/connector");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.getAllCoins = (0, catch_async_1.default)(async (req, res, next) => {
    try {
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.SECRET_KEY;
        const client = new connector_1.Spot(apiKey, apiSecret);
        const { data: coins } = await client.coinInfo();
        const coinsNameList = coins
            .map((c) => ({ name: c.coin }))
            .sort((a, b) => a.name.localeCompare(b.name));
        res.json({
            status: true,
            data: coinsNameList,
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
exports.getWallet = (0, catch_async_1.default)(async (req, res, next) => {
    try {
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.SECRET_KEY;
        const client = new connector_1.Spot(apiKey, apiSecret);
        const { data: wallet } = await client.userAsset();
        res.json({
            status: true,
            data: wallet,
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
