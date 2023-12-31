import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyJWT.js";
import {
  getMyPlacementResults,
  login,
  myProfile,
  updateProfile,
  uploadOfferLetter,
} from "../controllers/StudentControllers.js";

const router = express.Router();

router.route("/login").post(login);

router.use(isAuthenticated);
router.use(authorizeRoles(["student"]));

router.route("/placements").get(getMyPlacementResults).post(uploadOfferLetter);
router.route("/profile").get(myProfile).patch(updateProfile);

export default router;
