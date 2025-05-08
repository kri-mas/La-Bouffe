import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";

import multer from "multer";
import { auth, isAdmin } from "../middleware/auth.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), auth, isAdmin, addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", auth, isAdmin, removeFood);

export default foodRouter;
