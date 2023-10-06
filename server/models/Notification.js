import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required !"],
    },
    description: {
      type: String,
      required: [true, "Description is required !"],
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Student ID is required !"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", NotificationSchema);
