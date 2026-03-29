import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package"
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);