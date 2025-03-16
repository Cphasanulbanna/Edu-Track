import express from "express";
import { applyLeave, fetchAllLeaveRequestOfUser, takeActionOnLeave } from "../controllers/leaveRequest.controller.js";

const router = express.Router();

router.post("/take-action/:leaveRequestId", takeActionOnLeave)
router.post("/:userId/:batchId", applyLeave)
router.get("/:userId", fetchAllLeaveRequestOfUser)


export default router;
