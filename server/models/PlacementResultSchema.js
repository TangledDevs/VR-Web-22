import mongoose from "mongoose";

const PlacementResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required "],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
    },
    package: {
      type: Number,
      required: [true, "Package is required "],
    },
    placementDate: {
      type: Date,
      required: [true, "Placement Date is required !"],
    },
    role: {
      type: String,
      required: [true, "Job role is required !"],
    },
    acceptanceStatus: {
      type: Boolean,
      default: true,
    },
    offerLetter: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PlacementResult", PlacementResultSchema);
