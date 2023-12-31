import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
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
    isActive: {
      type: Boolean,
      default: true,
    },
    college: {
      type: String,
      default: process.env.COLLEGE,
    },
  },
  {
    timestamps: true,
  }
);

CoordinatorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

CoordinatorSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hashSync(password, 10);
};

CoordinatorSchema.methods.createAccessToken = async function () {
  return jwt.sign(
    { userId: this._id, role: "coordinator" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

CoordinatorSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Coordinator", CoordinatorSchema);
