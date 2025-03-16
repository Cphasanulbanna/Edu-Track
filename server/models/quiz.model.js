import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    published: { type: Boolean, default: false },
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizQuestions" }],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
