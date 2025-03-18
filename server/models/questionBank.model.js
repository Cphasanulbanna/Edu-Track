import mongoose from "mongoose";

const questionBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    year: { type: Number, required: true },
    document: {type: String}
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", questionBankSchema);

export default Batch;
