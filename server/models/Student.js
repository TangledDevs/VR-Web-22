import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        "https://www.material-tailwind.com/img/face-2.jpg",
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
    college: {
      type: String,
      default: process.env.COLLEGE,
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
StudentSchema.virtual("offerletters", {
  ref: "OfferLetter",
  localField: "_id",
  foreignField: "student",
});

StudentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

StudentSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hashSync(password, 10);
};

StudentSchema.methods.createAccessToken = async function () {
  return jwt.sign(
    { userId: this._id, role: "student" },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

StudentSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("Student", StudentSchema);
