import express from "express";

import categoryRoutes from "./entities/category.routes";
import productRoutes from "./entities/product.routes";
import promotionRoutes from "./entities/promotion.routes";
import userRoutes from "./entities/user.routes";

const router = express.Router();

// Register all route modules
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/promotions", promotionRoutes);

export default router;
