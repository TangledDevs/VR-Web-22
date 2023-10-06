import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import asyncErrors from "express-async-errors";
import { ErrorMiddleWare } from "./middleware/error.js";
import adminRoutes from "./routes/adminRoutes.js";
import coordinatorRoutes from "./routes/coordinatorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import multer from "multer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(asyncErrors);
app.use(ErrorMiddleWare);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

app.use("/admin/", upload.single("bulkUpload"), adminRoutes);
app.use("/coordinator/", coordinatorRoutes);
app.use("/student/", upload.single("profileImage"), studentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Team Tangled Devs " });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
