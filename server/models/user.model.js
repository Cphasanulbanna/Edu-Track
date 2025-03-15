import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: function () {
        return !this.googleId; // Only require password if the user doesn't sign up with Google
      },
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    googleId: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    roleNumber: { unique: true, type: String },
    department: {
      unique: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    batch: { unique: true, type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
