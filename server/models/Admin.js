import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    college: {
      type: String,
      default: process.env.COLLEGE,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

AdminSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hashSync(password, 10);
};

AdminSchema.methods.createAccessToken = async function () {
  return jwt.sign(
    { userId: this._id, role: "admin" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

AdminSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Admin", AdminSchema);
