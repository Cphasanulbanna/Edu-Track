import express from "express";
import { addQuestionAndOptions, createQuiz, fetchAllQuiz, fetchPastQuizzesOfAllStudents, fetchQuizResults, fetchSpecificQuiz, getAllPastQuizzesOfStudent, submitQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", fetchAllQuiz);
router.post("/add-questions-and-options/:quizId", addQuestionAndOptions);
router.get("/:quizId", fetchSpecificQuiz)
router.post("/submit-answer", submitQuiz);
router.get("/results", fetchQuizResults);
router.get("/student/quizzes", getAllPastQuizzesOfStudent);
router.get("/students/quizzes", fetchPastQuizzesOfAllStudents);





export default router;
