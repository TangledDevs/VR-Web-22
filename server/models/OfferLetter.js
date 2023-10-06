import mongoose from "mongoose";

const OfferLetterSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required "],
    },
    placement: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PlacementResult",
      required: [true, "Result ID is required "],
    },
    offerLetter: {
      type: String,
      required: [true, "Offer Letter is required "],
    },
    status: {
      type: String,
      enum: ["Valid", "Invalid"],
      default: "Valid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OfferLetter", OfferLetterSchema);
