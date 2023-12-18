import express from "express"
const router=express.Router();

import { getCurrentUser, login, logout, register } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/logout").get(logout);

export default router