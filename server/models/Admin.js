import mongoose from "mongoose";
import validator from "validator";

const AdminSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", AdminSchema);
