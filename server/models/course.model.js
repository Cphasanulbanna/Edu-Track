import mongoose from "mongoose";
import { checkIndexes, dropAnIndex } from "../helper/db/db.helper.js";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: ""
    },
    teachers : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
