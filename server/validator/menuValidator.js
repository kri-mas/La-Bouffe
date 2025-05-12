import { check } from "express-validator";

export const menuCategoryValidation = [
  check("name").notEmpty().withMessage("Category name is required"),
  check("description").optional().isString(),
];
