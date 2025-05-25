import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreateProductRequestSchema,
  DeleteProductRequestSchema,
  GetProductRequestSchema,
  UpdateProductRequestSchema,
} from "colori-platform-shared";
import { Router } from "express";

const router = Router();

// Product CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreateProductRequestSchema),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", validate(GetProductRequestSchema), getProductById);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateProductRequestSchema),
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteProductRequestSchema),
  deleteProduct
);

export default router;
