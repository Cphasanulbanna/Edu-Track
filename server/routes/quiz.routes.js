import express from "express";
import { addQuestionAndOptions, createQuiz, fetchAllQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", fetchAllQuiz);
router.post("/add-questions-and-options/:quizId", addQuestionAndOptions);

export default router;
