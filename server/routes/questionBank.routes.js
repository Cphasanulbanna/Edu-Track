import express from "express";
import { uploadQuestionBank } from "../controllers/questionBank.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadQuestionBank);

export default router;
