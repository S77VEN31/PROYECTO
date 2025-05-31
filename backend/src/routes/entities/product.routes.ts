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
  validate(CreateProductRequestSchema, "body"),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", validate(GetProductRequestSchema, "params"), getProductById);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateProductRequestSchema, "body"),
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteProductRequestSchema, "params"),
  deleteProduct
);

export default router;
