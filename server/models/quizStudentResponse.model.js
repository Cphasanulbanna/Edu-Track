import mongoose from "mongoose";

const quizStudentResponseSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    responses: [
      {
        question: { type:  mongoose.Schema.Types.ObjectId, ref:"QuizQuestion" },
        selectedOption: { type: mongoose.Schema.Types.ObjectId, ref:"QuizQuestion.option", required: true },
      },
    ],
    score: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    totalIncorrect: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const QuizStudentResponse = mongoose.model("QuizStudentResponse", quizStudentResponseSchema);

export default QuizStudentResponse;
