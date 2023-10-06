import mongoose from "mongoose";
import validator from "validator";

const CoordinatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required !"],
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
      required: [true, "Coordinator dept is required !"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coordinator", CoordinatorSchema);
