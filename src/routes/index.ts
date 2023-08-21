import { Router } from "express";
import { getCoinsHistoricalData } from "../controller";

const router = Router();

router.get("/historical", getCoinsHistoricalData);

export default router;
