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
        res(
          response.data.map((k) => ({
            time: k[6],
            open: +k[1],
            close: +k[4],
          }))
        );
      })
      .catch((error) => {
        // client.logger.error(error.message);
        rej({
          code: error.code,
          response: {
            config: error.response.config,
            data: error.response.data,
          },
        });
      });
  });
};

const getAllExchangeInfo = () => {
  return new Promise((res, rej) => {
    client
      .exchangeInfo()
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        // client.logger.error(error.message);
        rej({
          code: error.code,
          response: {
            config: error.response.config,
            data: error.response.data,
          },
        });
      });
  });
};

const main = async () => {
  try {
    // const symbol = "BLURBNC";
    // const data = await getHistoricalData(symbol);
    const { symbols: data } = await getAllExchangeInfo();
    console.log(
      data
        .map((e) => {
          const { symbol, baseAsset, quoteAsset } = e;
          return {
            symbol,
            baseAsset,
            quoteAsset,
          };
        })
        .filter((e) => e.baseAsset.startsWith("BL"))
    );
  } catch (error) {
    console.error(error);
  }
};

main();
