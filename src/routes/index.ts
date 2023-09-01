import { Router } from "express";
import {
  getCoinsHistoricalData,
  getCoins,
  addTransaction,
} from "../controller";

const router = Router();

router.get("/historical", getCoinsHistoricalData);
router.get("/coins", getCoins);
router.post("/transaction", addTransaction);

export default router;
