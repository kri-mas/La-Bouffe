import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const cart = await cartModel
      .findOne({ user: req.user._id })
      .populate("items.food");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const order = new orderModel({
      user: req.user._id,
      items: cart.items.map((item) => ({
        food: item.food._id,
        quantity: item.quantity,
      })),
      totalPrice: cart.totalPrice,
    });

    await order.save();
    await cartModel.findOneAndDelete({ user: req.user._id }); // Clear cart

    res.json({ success: true, message: "Order placed", order });
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("items.food");
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .populate("items.food");
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ success: true, message: "Order updated", order });
  } catch (err) {
    next(err);
  }
};
