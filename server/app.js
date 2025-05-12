import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";
import foodRoutes from "./routes/foodRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import menuRoutes from "./routes/menuRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => res.send("API running"));

export default app;
