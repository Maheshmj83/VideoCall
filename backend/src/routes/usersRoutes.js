import { Router } from "express";
const router = Router();

import {
  addToHistory,
  getUserHistory,
  register,
  login,
} from "../controllers/userController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);

export default router;
