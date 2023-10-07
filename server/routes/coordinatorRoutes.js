import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyJWT.js";
import {
  getAllStudents,
  getMyDeptPlacementResults,
  getStudent,
  login,
  validateOfferLetter,
} from "../controllers/CoordinatorControllers.js";
const router = express.Router();

router.route("/login").post(login);

router.use(isAuthenticated);
router.use(authorizeRoles(["coordinator"]));

router.route("/students").get(getAllStudents);
router.route("/students/:studentId").get(getStudent)
router.route("/placements").get(getMyDeptPlacementResults).post(validateOfferLetter);;

export default router;
