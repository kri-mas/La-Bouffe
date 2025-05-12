import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    item: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model.order || mongoose.model("order", orderSchema);
export default orderModel;
