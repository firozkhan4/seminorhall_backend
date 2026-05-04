import mongoose from "mongoose";

const HallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amenities: {
      type: String,
    },
    image_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Hall", HallSchema);
