import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    semesterNumber: { type: Number, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    feeAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Semester = mongoose.model("Semester", semesterSchema);

export default Semester;
