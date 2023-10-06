import mongoose from "mongoose";
import validator from "validator";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required !"],
    },
    email: {
      type: String,
      required: [true, "Student email is required !"],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Student password is required !"],
    },
    image: {
      type: String,
      default:
        "https://storage.googleapis.com/file-transfer-application/studentdummy%20image.jpg",
    },
    rollNo: {
      type: String,
      unique: true,
      required: [true, "Student rollNo is required !"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Student date of birth is required !"],
    },
    contact: {
      type: String,
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "any", { strictMode: false }),
        message: "Enter a valid Mobile Number",
      },
      required: [true, "Contact cannot be empty"],
      unique: true,
    },
    department: {
      type: String,
      enum: [
        "CSE",
        "IT",
        "MECH",
        "ECE",
        "EEE",
        "CIVIL",
        "AIDS",
        "AIML",
        "IOT",
        "CIC",
      ],
      required: [true, "Student dept is required !"],
    },
    passoutYear: {
      type: Number,
      required: [true, "Student Passout year is required !"],
    },
    isPlaced: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

StudentSchema.virtual("notifications", {
  ref: "Notification",
  localField: "_id",
  foreignField: "student",
});
StudentSchema.virtual("placements", {
  ref: "PlacementResult",
  localField: "_id",
  foreignField: "student",
});

export default mongoose.model("Student", StudentSchema);
