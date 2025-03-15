import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
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
    year: { type: Number, required: true, unique: true },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
