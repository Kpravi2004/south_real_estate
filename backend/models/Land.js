import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    land_type: { type: String, required: true },
    district: { type: String, required: true },
    taluk: { type: String, required: true },
    land_size: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
    images: { type: [String], default: [] },
    video: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);
export default Land;
