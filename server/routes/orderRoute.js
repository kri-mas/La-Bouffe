import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", auth, createOrder);
router.get("/user", auth, getUserOrders);
router.get("/admin", auth, isAdmin, getAllOrders);
router.patch("/:id/status", auth, isAdmin, updateOrderStatus);

export default router;
