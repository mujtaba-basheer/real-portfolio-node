import catchAsync from "../utils/catch-async";
import * as fs from "node:fs/promises";
import db from "../db";
import updateHistoricalData from "../script/calc";
import { config } from "dotenv";
import { ObjectId } from "mongodb";
config();

type CoinInfoT = {
  name: string;
  color: string;
  icon: string;
};
type CoinDayDataT = {
  qty: number;
  value: number;
  profit: number;
};
type CoinDataT = {
  info: CoinInfoT;
  value: number;
  qty: number;
  profit: number;
  data: CoinDayDataT[];
};
type ChartsData = {
  coins: CoinDataT[];
  total: CoinDayDataT[];
};
interface CoinDoc {
  symbol: string;
  info: {
    name: string;
    color: string;
    icon: string;
    code: string;
  };
}
interface TransactionDoc {
  date: Date;
  qty: number;
  price: number;
  coin: ObjectId;
}

export const getCoinsHistoricalData = catchAsync(async (req, res, next) => {
  try {
    const rawData = await fs.readFile("store/data.json", "utf8");
    const data = JSON.parse(rawData) as ChartsData;

    res.json({
      status: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: error.mesage,
    });
  }
});

export const getCoins = catchAsync(async (req, res, next) => {
  try {
    const collection = db.collection<CoinDoc>("coins");
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: error.mesage,
    });
  }
});

export const addTransaction = catchAsync(async (req, res, next) => {
  try {
    const doc = req.body as TransactionDoc;

    if (doc.date) doc.date = new Date(doc.date);
    const dateCheck = doc.date && doc.date instanceof Date;
    const qtyCheck = doc.qty && typeof doc.qty === "number";
    const priceCheck = doc.price && typeof doc.price === "number";
    if (doc.coin) doc.coin = new ObjectId(doc.coin);
    const idCheck = doc.coin && doc.coin instanceof ObjectId;

    if (!(dateCheck && qtyCheck && priceCheck && idCheck)) {
      throw new Error("Missing or invalid fields!");
    }

    const collection = db.collection<TransactionDoc>("transactions");
    await collection.insertOne(doc);

    res.json({
      status: true,
      msg: "Added transaction successfully!",
    });

    updateHistoricalData().catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      msg: error.mesage,
    });
  }
});
