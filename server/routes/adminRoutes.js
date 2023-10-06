import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyJWT.js";
import {
  addAdmin,
  addCoordinator,
  addPlacement,
  addStudent,
  deleteCoordinator,
  getAllCoordinators,
  getAllPlacementResults,
  getAllStudents,
  login,
  updateCoordinatorDetails,
  updateStudentDetails,
  uploadPlacementResults,
  uploadStudents,
} from "../controllers/adminControllers.js";
const router = express.Router();

router.route("login").post(login);

// router.use(isAuthenticated);
// router.use(authorizeRoles(["admin"]));

router
  .route("students")
  .get(getAllStudents)
  .post(addStudent)
  .patch(updateStudentDetails);
router.route("students/upload").post(uploadStudents);
router.route("/coordinators").get(getAllCoordinators).post(addCoordinator);

router
  .route("/coordinators/:coordinatorId")
  .patch(updateCoordinatorDetails)
  .delete(deleteCoordinator);
  
router.route("placements").get(getAllPlacementResults).post(addPlacement);
router.route("placements/uploadResults").post(uploadPlacementResults);
router.route("new").post(addAdmin);

export default router;
