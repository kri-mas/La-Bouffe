import { check } from "express-validator";

export const addToCartValidation = [
  check("foodId").isMongoId().withMessage("Invalid food ID"),
  check("quantity").isInt({ min: 1 }).withMessage("Quantity must be 1 or more"),
];
