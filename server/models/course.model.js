import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: async function (teacherId) {
            const user = await mongoose.model("User").findOne({
              _id: teacherId,
              role: "teacher",
            });
            return user != null;
          },
          message: "User must have the 'teacher' role",
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
