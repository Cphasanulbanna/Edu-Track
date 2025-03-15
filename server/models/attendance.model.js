import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    checkedIn: {
      type: Boolean,
      default: false,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    status: {
      default: false,
      type: String,
      enum: ["present", "absent", "late", "leave"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    location: { type: String },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
