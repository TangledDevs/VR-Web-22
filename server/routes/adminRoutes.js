import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyJWT.js";
import { addAdmin, addCoordinator, addPlacement, addStudent, deleteCoordinator, getAllCoordinators, getAllPlacementResults, getAllStudents, login, updateCoordinatorDetails, updateStudentDetails } from "../controllers/adminControllers.js";
const router = express.Router();

router.route('login').post(login)

router.use(isAuthenticated)
router.use(authorizeRoles(["admin"]))

router.route('students').get(getAllStudents).post(addStudent).patch(updateStudentDetails)
router.route('coordintaors').get(getAllCoordinators).patch(updateCoordinatorDetails).delete(deleteCoordinator).post(addCoordinator)
router.route('placements').get(getAllPlacementResults).post(addPlacement)
router.route('new').post(addAdmin)

export default router;
