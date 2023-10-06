import { StatusCodes } from "http-status-codes";
// import { sendMail } from "../middleware/sendEmail.js";
// import crypto from "crypto";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import PlacementResult from "../models/PlacementResult.js";
import Student from "../models/Student.js";
import Coordinator from "../models/Coordinator.js";
import mongoose from "mongoose";
import xlsx from "xlsx";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Enter all details", StatusCodes.BAD_REQUEST);
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("User Not found", StatusCodes.NOT_FOUND);
  }
  const match = await admin.comparePassword(password);
  if (!match) {
    throw new Error("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
  const accessToken = await admin.createAccessToken();
  return res.status(StatusCodes.OK).json({
    message: "Login successful",
    accessToken: accessToken,
    user: admin,
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

export const getAllPlacementResults = async (req, res) => {
  const placementResults = await PlacementResult.find({}).populate({
    path: "student",
  });
  console.log(placementResults);
  return res.status(StatusCodes.OK).json({
    message: "Placement Results data sent",
    count: placementResults.length,
    placementResults,
  });
};

export const uploadPlacementResults = async (req, res) => {
  if (req.file) {
    const file = req.file.buffer;

    const workbook = xlsx.read(file, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const placementResultsData = xlsx.utils.sheet_to_json(worksheet);
    await PlacementResult.insertMany(placementResultsData);
  }

  const placementResults = await PlacementResult.find({}).populate("student");
  return res.status(StatusCodes.OK).json({
    message: "Placement Results data added successfully",
    placementResults,
  });
};

export const addPlacement = async (req, res) => {
  const { student, company, ctc, placementDate, position } = req.body;
  if (!student || !company || !ctc || !placementDate || !position) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const newPlacement = await PlacementResult.create(req.body);
  const placementResults = await PlacementResult.find({}).populate("student");
  return res.status(StatusCodes.OK).json({
    message: "Placement Results data sent",
    count: placementResults.length,
    placementResults,
  });
};

export const getAllCoordinators = async (req, res) => {
  const coordinators = await Coordinator.find({});
  return res.status(StatusCodes.OK).json({
    message: "Coordinators details sent",
    count: coordinators.length,
    coordinators,
  });
};

export const addCoordinator = async (req, res) => {
  const { name, email, password, contact, department } = req.body;
  if (!name || !email || !password || !contact || !department) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const iscoordinator = await Coordinator.findOne({ email });
  if (iscoordinator) {
    throw new Error("coordinator already exists", StatusCodes.CONFLICT);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  const newCoordinator = await Coordinator.create(req.body);
  const coordinators = await Coordinator.find({ isActive: true });
  return res.status(StatusCodes.OK).json({
    message: `Coordinator ${name} details added successfully`,
    coordinators,
  });
};

export const updateCoordinatorDetails = async (req, res) => {
  const coordinatorId = req.params.coordinatorId;
  console.log(coordinatorId);
  if (!coordinatorId || !mongoose.isValidObjectId(coordinatorId)) {
    throw new Error("Invalid Coordinator", StatusCodes.BAD_REQUEST);
  }
  const coordinator = await Coordinator.findById(coordinatorId);
  if (!coordinator) {
    throw new Error("Coordinator Not found", StatusCodes.NOT_FOUND);
  }
  const response = await Coordinator.findByIdAndUpdate(
    coordinatorId,
    req.body,
    { new: true, runValidators: true }
  );
  const coordinators = await Coordinator.find({});
  return res.status(StatusCodes.OK).json({
    message: `Coordinator ${response.name} details updated`,
    coordinators,
  });
};

export const deleteCoordinator = async (req, res) => {
  const coordinatorId = req.params.coordinatorId;
  console.log(coordinatorId);
  if (!coordinatorId || !mongoose.isValidObjectId(coordinatorId)) {
    throw new Error("Invalid coordinator", StatusCodes.BAD_REQUEST);
  }
  const coordinator = await Coordinator.findById(coordinatorId);

  if (!coordinator) {
    throw new Error("Coordinator Not found", StatusCodes.NOT_FOUND);
  }
  const response = await Coordinator.findByIdAndDelete(
    coordinatorId,
    { isActive: !coordinator.isActive },
    { new: true, runValidators: true }
  );
  const coordinators = await Coordinator.find({});
  return res
    .status(StatusCodes.OK)
    .json({ message: `coordinator ${response.name} deleted`, coordinators });
};

export const addAdmin = async (req, res) => {
  const { name, email, password, contact } = req.body;
  if (!name || !email || !password || !contact) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const isAdmin = await Admin.findOne({ email });
  if (isAdmin) {
    throw new Error("Admin already exists", StatusCodes.CONFLICT);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  const newAdmin = await Admin.create(req.body);
  return res.status(StatusCodes.OK).json({
    message: `Admin ${newAdmin.name} has been assigned the role of admin`,
    subadmins,
  });
};

export const getAllStudents = async (req, res) => {
  const students = await Student.find({})
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
    count: students.length,
    students,
  });
};

export const uploadStudents = async (req, res) => {
  if (req.file) {
    const file = req.file.buffer;

    const workbook = xlsx.read(file, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const studentsData = xlsx.utils.sheet_to_json(worksheet);
    await Student.insertMany(studentsData);
  }

  const students = await Student.find({})
    // .populate({
    //   path: "notifications",
    //   options: { sort: { createdAt: -1 } },
    // })
    .populate({
      path: "placements",
      options: { sort: { createdAt: -1 } },
    });

  return res.status(StatusCodes.OK).json({
    message: "Students details added successfully",
    students,
  });
};

export const addStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    contact,
    rollNo,
    dateOfBirth,
    department,
    passoutYear,
    gender,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !contact ||
    !rollNo ||
    !dateOfBirth ||
    !department ||
    !passoutYear ||
    !gender
  ) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const isStudent = await Student.findOne({ email });
  if (isStudent) {
    throw new Error("Student already exists", StatusCodes.CONFLICT);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  const newStudent = await Student.create(req.body);
  const students = await Student.find({})
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
    count: students.length,
    students,
  });
};

export const updateStudentDetails = async (req, res) => {
  const studentId = req.params.studentId;
  if (!studentId || !mongoose.isValidObjectId(studentId)) {
    throw new Error("Invalid Coordinator", StatusCodes.BAD_REQUEST);
  }
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error("student Not found", StatusCodes.NOT_FOUND);
  }
  const response = await student.findByIdAndUpdate(studentId, req.body, {
    new: true,
    runValidators: true,
  });
  const students = await Student.find({})
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
    count: students.length,
    students,
  });
};
