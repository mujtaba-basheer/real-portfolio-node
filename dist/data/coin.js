"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coinInfoMap = {
    ETHUSDT: {
        name: "Ethereum",
        color: "73, 73, 255",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
        code: "ETH",
    },
    BTCUSDT: {
        name: "Bitcoin",
        color: "247, 147, 26",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
        code: "BTC",
    },
    SOLUSDT: {
        name: "Solana",
        color: "0, 147, 147",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
        code: "SOL",
    },
    AVAXUSDT: {
        name: "Avalanche",
        color: "248, 198, 198",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
        code: "AVAX",
    },
    FTMUSDT: {
        name: "Fantom",
        color: "205, 209, 255",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
        code: "FTM",
    },
    APEUSDT: {
        name: "ApeCoin",
        color: "179, 200, 245",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png",
        code: "APE",
    },
    SANDUSDT: {
        name: "The Sandbox",
        color: "187, 239, 255",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6210.png",
        code: "SAND",
    },
    SHIBUSDT: {
        name: "Shiba Inu",
        color: "255, 228, 181",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png",
        code: "SHIB",
    },
    MATICUSDT: {
        name: "Polygon",
        color: "218, 200, 247",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
        code: "MATIC",
    },
    DOTUSDT: {
        name: "Polkadot",
        color: "248, 179, 215",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
        code: "DOT",
    },
    LINKUSDT: {
        name: "Chainlink",
        color: "191, 206, 244",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
        code: "LINK",
    },
    GALAUSDT: {
        name: "Gala",
        color: "204, 204, 204",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/7080.png",
        code: "GALA",
    },
    LDOUSDT: {
        name: "Lido DAO",
        color: "220, 242, 251",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/8000.png",
        code: "LDO",
    },
    ADAUSDT: {
        name: "Cardano",
        color: "194, 210, 241",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
        code: "ADA",
    },
    ALUUSD: {
        name: "Altura",
        color: "252, 202, 248",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/9637.png",
        code: "ALU",
    },
    BLURUSDT: {
        name: "Blur",
        color: "248, 203, 180",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/23121.png",
        code: "BLUR",
    },
    VETUSDT: {
        name: "VeChain",
        color: "212, 204, 232",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3077.png",
        code: "VET",
    },
    ARBUSDT: {
        name: "Arbitrum",
        color: "184, 230, 255",
        icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png",
        code: "ARB",
    },
};
exports.default = coinInfoMap;
