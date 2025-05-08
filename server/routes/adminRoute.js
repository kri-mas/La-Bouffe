import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({ message: "welcome admin ${req.user.name}" });
});
export default router;
