import mongoose from "mongoose";

const quizQuestionsSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, unique: true },
    options: [
      {
        option: { type: String, required: true },
        correct: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

const QuizQuestions = mongoose.model("QuizQuestions", quizQuestionsSchema);

export default QuizQuestions;
