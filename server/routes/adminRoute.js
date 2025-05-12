import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard", auth, isAdmin, getAdminDashboard);

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({ message: "welcome admin ${req.user.name}" });
});
export default router;
