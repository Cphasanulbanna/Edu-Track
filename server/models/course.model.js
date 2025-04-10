import mongoose from "mongoose";
import Semester from "./semester.model.js";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    duration: {
      type: Number,
    },
    description: {
      type: String,
      default: "",
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    semesters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semester",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

courseSchema.pre("findOneAndDelete", async function (next) {
  const courseId = this.getQuery()._id;
  await Semester.deleteMany({ course: courseId });
  next();
});

export default Course;
