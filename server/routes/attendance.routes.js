import express from "express";
import { checkIn , checkOut} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/checkIn/:batchId/:studentId", checkIn)
router.post("/checkOut/:batchId/:studentId", checkOut)

export default router;
