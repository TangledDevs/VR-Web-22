import { StatusCodes } from "http-status-codes";
// import { sendMail } from "../middleware/sendEmail.js";
// import crypto from "crypto";
import bcrypt from "bcrypt";
import Student from "../models/Student.js";
import OfferLetter from "../models/OfferLetter.js";
import PlacementResult from "../models/PlacementResult.js";
import Coordinator from "../models/Coordinator.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Enter all details", StatusCodes.BAD_REQUEST);
  }
  const coordinator = await Coordinator.findOne({ email });
  if (!coordinator) {
    throw new Error("User Not found", StatusCodes.NOT_FOUND);
  }
  const match = await coordinator.comparePassword(password);
  if (!match) {
    throw new Error("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
  const accessToken = await coordinator.createAccessToken();
  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    accessToken: accessToken,
    coordinator,
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

export const getAllStudents = async (req, res) => {
  const coordinatorId = req.userId;
  const coordinator = await Coordinator.findById({ coordinatorId });
  const students = await Student.find({ department: coordinator.department })
    .populate({
      path: "notifications",
      options: { sort: { createdAt: -1 } },
    })
    .populate({
      path: "placements",
      options: { sort: { createdAt: -1 } },
    });

  return res.status(StatusCodes.OK).json({
    message: "Students details sent",
    count: students.length,
    students,
  });
};

export const getStudent = async (req, res) => {
  const studentId = req.params.studentId;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Not a valid studentID" });
  }

  const data = await Student.findById(studentId)
    .populate({
      path: "notifications",
      options: { sort: { createdAt: -1 } },
    })
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

export const validateOfferLetter = async (req, res) => {
  const studentId = req.params.studentId;
  const { offerLetterId } = req.body;
  if (
    !studentId ||
    !offerLetterId ||
    !mongoose.isValidObjectId(studentId) ||
    !mongoose.isValidObjectId(offerLetterId)
  ) {
    throw new Error("Invalid Student Id or Letter Id", StatusCodes.BAD_REQUEST);
  }
  const letter = await OfferLetter.findById(offerLetterId);
  if (!letter) {
    throw new Error("Student Not found", StatusCodes.NOT_FOUND);
  }
  const response = await OfferLetter.findByIdAndUpdate(
    offerLetterId,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );
  const data = await Student.findById(studentId)
    .populate({
      path: "notifications",
      options: { sort: { createdAt: -1 } },
    })
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

export const getMyDeptPlacementResults = async (req, res) => {
  const coordinatorId = req.userId;
  const coordinator = await Coordinator.findById({ coordinatorId });
  const deptPlacements = await PlacementResult.find({
    department: coordinator.department,
  });
  return res.status(StatusCodes.OK).json({
    message: "Placement Results data sent",
    count: deptPlacements.length,
    deptPlacements,
  });
};
