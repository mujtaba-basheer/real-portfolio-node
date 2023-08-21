"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinsHistoricalData = void 0;
const wallet_1 = require("../data/wallet");
const connector_1 = require("@binance/connector");
const fs = require("node:fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;
const client = new connector_1.Spot(apiKey, apiSecret);
const getHistoricalData = (symbol) => {
    return new Promise((res, rej) => {
        client
            .klines(symbol, "1d", { limit: 60 })
            .then((response) => {
            res(response.data.map((k) => ({
                time: k[6],
                open: +k[1],
                close: +k[4],
            })));
        })
            .catch((error) => {
            client.logger.error(error.message);
            rej(error);
        });
    });
};
const getCoinsHistoricalData = async () => {
    try {
        const promises = [];
        for (const asset of wallet_1.default) {
            promises.push(getHistoricalData(asset.symbol));
        }
        const allHistoricalData = await Promise.all(promises);
        const chartsData = {
            coins: [],
            total: [],
            overview: {
                qty: 0,
                value: 0,
                profit: 0,
            },
        };
        const { coins, total, overview } = chartsData;
        for (let i = 0; i < wallet_1.default.length; i++) {
            const asset = wallet_1.default[i];
            const historicalData = allHistoricalData[i];
            coins.push({
                info: asset.info,
                value: 0,
                investment: 0,
                qty: 0,
                profit: 0,
                profit_percent: 0,
                data: [],
            });
            const coin = coins[i];
            const { data } = coin;
            const { transactions } = asset;
            let dateIndex;
            for (dateIndex = 0; dateIndex < transactions.length; dateIndex++) {
                if (transactions[dateIndex].date.valueOf() <= historicalData[0].time) {
                    const { qty, price } = transactions[dateIndex];
                    coin.qty += qty;
                    const investment = qty * price;
                    coin.investment += investment;
                }
                else
                    break;
            }
            dateIndex--;
            for (let j = 0; j < historicalData.length; j++) {
                const { time, close } = historicalData[j];
                const h_date = new Date(time);
                const h_ds = h_date.toISOString().substring(0, 10);
                if (dateIndex < transactions.length - 1 &&
                    transactions[dateIndex + 1].date.toISOString().substring(0, 10) ===
                        h_ds) {
                    dateIndex++;
                    const { qty, price } = transactions[dateIndex];
                    const t_val = qty * price;
                    coin.qty += qty;
                    coin.investment += t_val;
                }
                const c_val = coin.qty * close;
                const profit = c_val - coin.investment;
                const profit_percent = (profit / coin.investment) * 100;
                coin.value = c_val;
                coin.profit = profit;
                coin.profit_percent = profit_percent;
                data.push({
                    qty: coin.qty,
                    value: coin.value,
                    profit,
                    profit_percent,
                    time,
                    close,
                });
                if (!total[j]) {
                    total.push({
                        qty: coin.qty,
                        value: coin.value,
                        profit,
                        profit_percent,
                        time,
                        close,
                    });
                }
                else {
                    total[j].qty += coin.qty;
                    total[j].value += coin.value;
                    total[j].profit += profit;
                }
            }
            const lastTotalItem = total[historicalData.length - 1];
            overview.qty = lastTotalItem.qty;
            overview.value = lastTotalItem.value;
            overview.profit = lastTotalItem.profit;
        }
        // console.log(JSON.stringify(chartsData));
        fs.writeFile("store/data.json", JSON.stringify(chartsData), "utf8", (err) => {
            if (err) {
                console.error(err);
            }
            console.log(`File written. Date: ${new Date().toISOString()}`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getCoinsHistoricalData = getCoinsHistoricalData;
(0, exports.getCoinsHistoricalData)();