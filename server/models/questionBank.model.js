import mongoose from "mongoose";

const questionBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    semester: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    uuid: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);

export default QuestionBank;
