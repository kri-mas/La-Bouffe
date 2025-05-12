import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addToCart,
  getCart,
  clearCart,
} from "../controllers/cartController.js";
import { addToCartValidation } from "../validator/cartValidator.js";

const router = express.Router();

router.post("/add", auth, addToCartValidation, addToCart);
router.get("/", auth, getCart);
router.delete("/clear", auth, clearCart);

export default router;
