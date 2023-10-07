import { StatusCodes } from "http-status-codes";
// import { sendMail } from "../middleware/sendEmail.js";
// import crypto from "crypto";
import bcrypt from "bcrypt";
import PlacementResult from "../models/PlacementResult.js";
import Student from "../models/Student.js";
import { uploadFile } from "../middleware/upload.js";
import OfferLetter from "../models/OfferLetter.js";
import mongoose from "mongoose";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Enter all details", StatusCodes.BAD_REQUEST);
  }
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error("User Not found", StatusCodes.NOT_FOUND);
  }
  const match = await student.comparePassword(password);
  if (!match) {
    throw new Error("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
  const accessToken = await student.createAccessToken();
  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    accessToken: accessToken,
    user: student,
  });
};

// export const forgotPassword = async (req, res, next) => {
//   const { email } = req.body;
//   const Coordinator = await Coordinator.findOne({ email, isActive: true });
//   if (!Coordinator) {
//     throw new Error("Enter your Registered Email", StatusCodes.UNAUTHORIZED);
//   }
//   const resetToken = Coordinator.getResetPasswordToken();
//   await Coordinator.save({ validateBeforeSave: false });
//   next();
//   const resetPasswordUrl = `${req.protocol}://${process.env.BASE_URL}/resetPassword/${resetToken}`;
//   const message = `Your reset password link is :\n\n ${resetPasswordUrl} \n\n This link will be active for the next 15 minutes.\n\n If you have not requested this email then please ignore it.`;
//   try {
//     await sendMail({
//       email: Coordinator.email,
//       subject: `Phoenix  Password  Recovery`,
//       message,
//     });
//     res.status(StatusCodes.OK).json({ message: "Email Sent Successfully" });
//   } catch (error) {
//     Coordinator.resetPasswordToken = undefined;
//     Coordinator.resetPasswordExpire = undefined;
//     await Coordinator.save({ validateBeforeSave: false });
//     next();
//     throw new Error(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
//   }
// };

// export const resetPassword = async (req, res, next) => {
//   const { password, confirmPassword } = req.body;
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");
//   const Coordinator = await Coordinator.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });
//   if (!Coordinator) {
//     throw new Error(
//       "Reset Password Token is Invalid or has been Expired",
//       StatusCodes.REQUEST_TIMEOUT
//     );
//   }
//   if (password !== confirmPassword) {
//     throw new Error("Passwords does not match", StatusCodes.BAD_REQUEST);
//   }
//   const newPassword = await bcrypt.hashSync(password, 10);
//   Coordinator.password = newPassword;
//   Coordinator.resetPasswordToken = undefined;
//   Coordinator.resetPasswordExpire = undefined;
//   await Coordinator.save({ validateBeforeSave: false });
//   next();
//   return res
//     .status(StatusCodes.OK)
//     .json({ message: "Password Updated Successfully" });
// };

export const getMyPlacementResults = async (req, res) => {
  const studentId = req.userId;
  const placementResults = await PlacementResult.find({ student: studentId });
  return res.status(StatusCodes.OK).json({
    message: "Placement Results data sent",
    count: placementResults.length,
    placementResults,
  });
};

export const myProfile = async (req, res) => {
  const studentId = req.userId;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new Error("Invalid Student Id", StatusCodes.BAD_REQUEST);
  }
  const student = await Student.findById(studentId)
    // .populate({
    //   path: "notifications",
    //   options: { sort: { createdAt: -1 } },
    // })
    .populate({
      path: "placements",
      options: { sort: { createdAt: -1 } },
    });

  if (!student) {
    throw new Error("student Not found", StatusCodes.NOT_FOUND);
  }

  return res.status(StatusCodes.OK).json({
    message: "Student details sent",
    student,
  });
};

export const updateProfile = async (req, res) => {
  const studentId = req.userId;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new Error("Invalid Student Id", StatusCodes.BAD_REQUEST);
  }
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("student Not found", StatusCodes.NOT_FOUND);
  }
  if (req.file) {
    await uploadFile(req.file, "StudentImage", studentId);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/StudentImage/${studentId}/${req.file.originalname}`;
    student.image = imageUrl;
  }
  const response = await Student.findByIdAndUpdate(
    studentId,
    { image: student.image },
    {
      new: true,
      runValidators: true,
    }
  );
  const updatedStudent = await Student.findById({studentId})
    // .populate({
    //   path: "notifications",
    //   options: { sort: { createdAt: -1 } },
    // })
    .populate({
      path: "placements",
      options: { sort: { createdAt: -1 } },
    });

  return res.status(StatusCodes.OK).json({
    message: "Students details sent",
    student : updatedStudent,
  });
};

export const uploadOfferLetter = async (req, res) => {
  const studentId = req.userId;
  const placementId = req.body.placementId;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new Error("Invalid Student Id", StatusCodes.BAD_REQUEST);
  }
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("student Not found", StatusCodes.NOT_FOUND);
  }
  if (req.file) {
    await uploadFile(req.file, "OfferLetter", studentId);
    const offerLetterUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/OfferLetter/${studentId}/${req.file.originalname}`;
    req.file.offerLetter = offerLetterUrl;
  }
  const newOfferLater = await OfferLetter.create({
    student: studentId,
    offerLetter: req.file.offerLetter,
    placement: placementId,
  });

  const data = await Student.findById(studentId)
    // .populate({
    //   path: "notifications",
    //   options: { sort: { createdAt: -1 } },
    // })
    .populate({
      path: "placements",
      options: { sort: { createdAt: -1 } },
    });

  if (!data) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Student not found" });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Student details sent", data });
};
