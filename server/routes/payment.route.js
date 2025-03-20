import express from "express";
import { createRazorpayOrder, fetchAllTransactions, fetchTransactionsOfStudent, handlePaymentStatus, verifyPayment } from "../controllers/payment.controller.js";
import { verifyCaptcha } from "../middleware/recaptcha.middleware.js";


const router = express.Router();

router.post("/create-order", verifyCaptcha, createRazorpayOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook", handlePaymentStatus);
router.get("/history", fetchAllTransactions);
router.get("/history/:studentId", fetchTransactionsOfStudent);

export default router;
