import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    duration: {
      type: Number
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
    ]
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
