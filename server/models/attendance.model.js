import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    checkedIn: {
      type: Boolean,
    },
    date: {
      type: String,
      required: true,
    },
    totalTime: { type: String },
    checkInTime: {
      type: String,
      required: true,
    },
    checkOutTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "leave", "holiday"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    location: { type: String },
    isHalfDay: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
