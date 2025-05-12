import cartModel from "../models/cartModel.js";
import foodModel from "../models/foodModel.js";
import { validationResult } from "express-validator";

export const addToCart = async (req, res, next) => {
  const userId = req.user._id;
  const { foodId, quantity } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [{ food: foodId, quantity }],
        totalPrice: food.price * quantity,
      });
    } else {
      const existingItem = cart.items.find((item) => item.food.equals(foodId));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ food: foodId, quantity });
      }

      cart.totalPrice += food.price * quantity;
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartModel
      .findOne({ user: req.user._id })
      .populate("items.food");
    if (!cart)
      return res.json({ success: true, cart: { items: [], totalPrice: 0 } });

    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await cartModel.findOneAndDelete({ user: req.user._id });
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
};
