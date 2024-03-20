import express from "express";
import { createRazorpayOrder, handlePaymentStatus, verifyPayment } from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook", handlePaymentStatus);

export default router;
