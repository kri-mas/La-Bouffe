import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);
export default cartModel;
