"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletInfo = void 0;
const getWalletInfo = (client) => {
    return new Promise((res, rej) => {
        client
            .fundingWallet()
            .then((response) => {
            res(response.data);
        })
            .catch(rej);
    });
};
exports.getWalletInfo = getWalletInfo;
