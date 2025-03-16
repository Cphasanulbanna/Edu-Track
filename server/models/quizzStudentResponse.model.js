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
    score: {type: Number, default: 0}
  },
  { timestamps: true }
);

const quizStudentResponse = mongoose.model("quizStudentResponse", quizStudentResponseSchema);

export default quizStudentResponse;
