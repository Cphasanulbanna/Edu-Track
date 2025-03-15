import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    checkedIn: {
      type: Boolean,
      default: false,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      required: function () {
        return this.checkedIn;
      },
    },
    status: {
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
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
