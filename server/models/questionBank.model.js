import mongoose from "mongoose";

const questionBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
        },
    semester:{type: String, required: true},
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    document: {type: String}
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", questionBankSchema);

export default Batch;
