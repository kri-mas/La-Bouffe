import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";
import { auth, isAdmin } from "../middleware/auth.js";
import { foodValidation } from "../validator/foodValidator.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add",
  auth,
  isAdmin,
  upload.single("image"),
  foodValidation,
  addFood
);
router.get("/list", listFood);
router.delete("/remove", auth, isAdmin, removeFood);

export default router;
