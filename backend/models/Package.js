import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  imageUrl: String
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);