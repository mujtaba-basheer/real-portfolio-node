import catchAsync from "../utils/catch-async";
import * as fs from "node:fs/promises";
import { config } from "dotenv";
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
