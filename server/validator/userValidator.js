import { check } from "express-validator";

export const registerValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email"),
  check("password").isLength({ min: 8 }).withMessage("Min 8 chars required"),
];

export const loginValidation = [
  check("email").isEmail(),
  check("password").notEmpty(),
];
