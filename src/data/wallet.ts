import coinInfoMap from "./coin";

type CoinInfoT = {
  name: string;
  color: string;
  icon: string;
};
type TransactionInfoT = {
  date: Date;
  qty: number;
  price: number;
};
type CoinT = {
  symbol: string;
  info: CoinInfoT;
  transactions: TransactionInfoT[];
};

const wallet: CoinT[] = [
  {
    symbol: "BTCUSDT",
    info: coinInfoMap["BTCUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 35.76201318,
        price: 12701.98,
      },
    ],
  },
  {
    symbol: "ETHUSDT",
    info: coinInfoMap["ETHUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 88.7283053279999,
        price: 376.87,
      },
    ],
  },
  {
    symbol: "AVAXUSDT",
    info: coinInfoMap["AVAXUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 868.869275752,
        price: 13.54,
      },
    ],
  },
  {
    symbol: "FTMUSDT",
    info: coinInfoMap["FTMUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 26349.075872,
        price: 0.435,
      },
    ],
  },
  {
    symbol: "SOLUSDT",
    info: coinInfoMap["SOLUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 50.736322,
        price: 17.45,
      },
    ],
  },
  {
    symbol: "APEUSDT",
    info: coinInfoMap["APEUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 1578.74833,
        price: 2.29,
      },
    ],
  },
  {
    symbol: "SANDUSDT",
    info: coinInfoMap["SANDUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 36322.357649416,
        price: 0.523,
      },
    ],
  },
  {
    symbol: "SHIBUSDT",
    info: coinInfoMap["SHIBUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 999237936.7229179,
        price: 0.000011,
      },
    ],
  },
  {
    symbol: "MATICUSDT",
    info: coinInfoMap["MATICUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 25886.180819312,
        price: 0.884,
      },
    ],
  },
  {
    symbol: "DOTUSDT",
    info: coinInfoMap["DOTUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 1824.242304413,
        price: 5.24,
      },
    ],
  },
  {
    symbol: "LINKUSDT",
    info: coinInfoMap["LINKUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 1701.739766821,
        price: 7.34,
      },
    ],
  },
  {
    symbol: "GALAUSDT",
    info: coinInfoMap["GALAUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 198784.819743157,
        price: 0.0289,
      },
    ],
  },
  {
    symbol: "LDOUSDT",
    info: coinInfoMap["LDOUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 3290.819743157,
        price: 2.34,
      },
    ],
  },
  {
    symbol: "ADAUSDT",
    info: coinInfoMap["ADAUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 6328.3774,
        price: 0.29,
      },
    ],
  },
  // {
  //   symbol: "ALUUSD",
  //   info: coinInfoMap["ALUUSD"],
  //   transactions: [
  //     {
  //       date: new Date("2023-05-01"),
  //       qty: 29548.746,
  //       price: 0.25,
  //     },
  //   ],
  // },
  // {
  //   symbol: "BLURUSDT",
  //   info: coinInfoMap["BLURUSDT"],
  //   transactions: [
  //     {
  //       date: new Date("2023-05-01"),
  //       qty: 5224.744,
  //       price: 1.053,
  //     },
  //   ],
  // },
  {
    symbol: "VETUSDT",
    info: coinInfoMap["VETUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 244197.5,
        price: 0.06,
      },
    ],
  },
  {
    symbol: "ARBUSDT",
    info: coinInfoMap["ARBUSDT"],
    transactions: [
      {
        date: new Date("2023-05-01"),
        qty: 701.112,
        price: 1.12,
      },
    ],
  },
];

export default wallet;
