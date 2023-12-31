"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get("/historical", controller_1.getCoinsHistoricalData);
router.get("/coins", controller_1.getCoins);
router.post("/transaction", controller_1.addTransaction);
exports.default = router;
