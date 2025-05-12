import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  addMenuCategory,
  listMenuCategories,
  deleteMenuCategory,
} from "../controllers/menuController.js";
import { menuCategoryValidation } from "../validator/menuValidator.js";

const router = express.Router();

router.post("/add", auth, isAdmin, menuCategoryValidation, addMenuCategory);
router.get("/", listMenuCategories);
router.delete("/:id", auth, isAdmin, deleteMenuCategory);

export default router;
