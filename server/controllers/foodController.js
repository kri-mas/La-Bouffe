import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

const addFood = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (err) {
    next(err);
  }
};

const listFood = async (req, res, next) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    next(err);
  }
};

const removeFood = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    const imagePath = path.join("uploads", food.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Image deletion failed:", err);
    });

    await foodModel.findByIdAndDelete(foodId);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    next(err);
  }
};

export { addFood, listFood, removeFood };
