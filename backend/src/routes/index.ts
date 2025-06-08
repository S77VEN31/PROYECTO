import express from "express";

import authRoutes from "./auth.routes";
import categoryRoutes from "./entities/category.routes";
import productRoutes from "./entities/product.routes";
import promotionRoutes from "./entities/promotion.routes";
import userRoutes from "./entities/user.routes";
import eventRoutes from "./transactions/event.routes";
import orderRoutes from "./transactions/order.routes";
import uploadRoutes from "./upload.routes";

const router = express.Router();

// Register all route modules
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/promotions", promotionRoutes);
router.use("/orders", orderRoutes);
router.use("/events", eventRoutes);
router.use("/upload", uploadRoutes);

export default router;
