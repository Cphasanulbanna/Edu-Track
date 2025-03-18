import express from "express";
import { fetchAllQuestions, uploadQuestionBank } from "../controllers/questionBank.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("document"), uploadQuestionBank);
router.get("/", fetchAllQuestions);

export default router;
