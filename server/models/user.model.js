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
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: () => this.role?.[0]?.("teacher") },
    roleNumber: { unique: true, type: String, required: () => this.role?.[0]?.("student") },
    department: { unique: true, type: String, required: () => this.role?.[0]?.("Department") }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
