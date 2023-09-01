import { Spot } from "@binance/connector";
import * as fs from "node:fs";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

type CoinInfoT = {
  name: string;
  color: string;
  icon: string;
};
type KLineDataItemT = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore.
];
type KLineDataT = {
  data: KLineDataItemT[];
};
type HistoricalPriceItemT = {
  time: number;
  close: number;
  open: number;
};
type CoinDayDataT = {
  qty: number;
  value: number;
  profit: number;
  profit_percent: number;
  time: number;
  close: number;
};
type OverviewT = {
  qty: number;
  value: number;
  profit: number;
};
type CoinDataT = {
  info: CoinInfoT;
  value: number;
  qty: number;
  profit: number;
  profit_percent: number;
  investment: number;
  data: CoinDayDataT[];
};
type ChartsData = {
  coins: CoinDataT[];
  total: CoinDayDataT[];
  overview: OverviewT;
};
interface AggrDoc {
  symbol: string;
  info: {
    name: string;
    color: string;
    icon: string;
    code: string;
  };
  transactions: {
    date: Date;
    qty: number;
    price: number;
  }[];
}

const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;

const client = new Spot(apiKey, apiSecret);

const getHistoricalData: (symbol: string) => Promise<HistoricalPriceItemT[]> = (
  symbol
) => {
  return new Promise((res, rej) => {
    client
      .klines(symbol, "1d", { limit: 60 })
      .then((response: KLineDataT) => {
        res(
          response.data.map((k) => ({
            time: k[6],
            open: +k[1],
            close: +k[4],
          }))
        );
      })
      .catch((error) => {
        client.logger.error(error.message);
        rej(error);
      });
  });
};

export const getCoinsHistoricalData = async () => {
  try {
    const dbPassword = process.env.MONGO_DATABASE_PASSWORD;
    const mongoUri = process.env.MONGO_CONNECTION_URI.replace(
      "<password>",
      encodeURIComponent(dbPassword)
    );
    const mongoClient = new MongoClient(mongoUri);
    const database = mongoClient.db("portfolio");
    const collection = database.collection("coins");

    const aggrCursor = collection.aggregate<AggrDoc>([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "coin",
          as: "transactions",
        },
      },
    ]);
    const wallet = await aggrCursor.toArray();
    await mongoClient.close();

    const promises: Promise<HistoricalPriceItemT[]>[] = [];
    for (const asset of wallet) {
      promises.push(getHistoricalData(asset.symbol));
    }

    const allHistoricalData = await Promise.all(promises);

    const chartsData: ChartsData = {
      coins: [],
      total: [],
      overview: {
        qty: 0,
        value: 0,
        profit: 0,
      },
    };
    const { coins, total, overview } = chartsData;
    for (let i = 0; i < wallet.length; i++) {
      const asset = wallet[i];
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
      let dateIndex: number;
      for (dateIndex = 0; dateIndex < transactions.length; dateIndex++) {
        if (transactions[dateIndex].date.valueOf() <= historicalData[0].time) {
          const { qty, price } = transactions[dateIndex];
          coin.qty += qty;

          const investment = qty * price;
          coin.investment += investment;
        } else break;
      }
      dateIndex--;

      for (let j = 0; j < historicalData.length; j++) {
        const { time, close } = historicalData[j];
        const h_date = new Date(time);
        const h_ds = h_date.toISOString().substring(0, 10);

        if (
          dateIndex < transactions.length - 1 &&
          transactions[dateIndex + 1].date.toISOString().substring(0, 10) ===
            h_ds
        ) {
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
        } else {
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
    fs.writeFile(
      "store/data.json",
      JSON.stringify(chartsData),
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
        }

        console.log(`File written. Date: ${new Date().toISOString()}`);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

getCoinsHistoricalData();
