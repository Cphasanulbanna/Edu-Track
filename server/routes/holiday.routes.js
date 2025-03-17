import express from "express";
import { addHolidays, fetchHolidays } from "../controllers/holiday.controller.js";

const router = express.Router();

router.post("/", addHolidays);
router.get("/", fetchHolidays);

export default router;
