import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
    },
    amount: { type: Number, required: true },
    feeType: {
      type: String,
      enum: [
        "SEMESTER_FEES",
        "Exam Fee",
        "Event Fee",
        "Library Fee",
        "Hostel Fee",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    paymentDate: { type: String },
    transactionId: { type: String, unique: true },
    method: {type: String}
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
