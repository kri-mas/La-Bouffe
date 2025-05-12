import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import validator from "validator";
import foodModel from "../models/foodModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) return res.json({ success: false, message: "User exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = createToken(user._id);
    res.json({ success: true, token, role: user.role });
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  res.json({ message: "Admin dashboard content" });
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalOrders = await orderModel.countDocuments();

    const totalRevenueResult = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const statusSummary = await orderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const topFoods = await orderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.food",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "_id",
          as: "food",
        },
      },
      { $unwind: "$food" },
      {
        $project: {
          _id: 0,
          name: "$food.name",
          quantity: "$totalQuantity",
        },
      },
    ]);

    res.json({
      success: true,
      dashboard: {
        totalOrders,
        totalRevenue,
        statusSummary,
        topFoods,
      },
    });
  } catch (err) {
    next(err);
  }
};
