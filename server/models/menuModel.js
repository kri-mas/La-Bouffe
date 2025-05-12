import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const menuModel = mongoose.models.new || mongoose.model("menu", menuSchema);
export default menuModel;
