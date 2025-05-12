import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  registerValidation,
  loginValidation,
} from "../validator/userValidator.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;
