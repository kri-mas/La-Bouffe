import { check } from "express-validator";

export const foodValidation = [
  check("name").notEmpty().withMessage("Food name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("category").isMongoId().withMessage("Invalid category ID"),
];
