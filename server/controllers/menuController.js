import menuModel from "../models/menuModel.js";
import { validationResult } from "express-validator";

export const addMenuCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, description } = req.body;

    const exists = await menuModel.findOne({ name });
    if (exists)
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });

    const category = new menuModel({ name, description });
    await category.save();
    res.json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

export const listMenuCategories = async (req, res, next) => {
  try {
    const categories = await menuModel.find();
    res.json({ success: true, categories });
  } catch (err) {
    next(err);
  }
};

export const deleteMenuCategory = async (req, res, next) => {
  try {
    await menuModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    next(err);
  }
};
