import express from "express";
import { applyLeave } from "../controllers/leaveRequest.controller.js";

const router = express.Router();

router.post("/:userId/:batchId", applyLeave)


export default router;
