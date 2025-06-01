import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreateProductRequestBodySchema,
  DeleteProductRequestParamsSchema,
  GetProductRequestParamsSchema,
  GetProductsRequestParamsSchema,
  UpdateProductRequestBodySchema,
  UpdateProductRequestParamsSchema,
} from "colori-platform-shared";
import { Router } from "express";

const router = Router();

// Product CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreateProductRequestBodySchema, "body"),
  createProduct
);
router.get("/", validate(GetProductsRequestParamsSchema, "query"), getProducts);
router.get(
  "/:id",
  validate(GetProductRequestParamsSchema, "params"),
  getProductById
);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateProductRequestParamsSchema, "params"),
  validate(UpdateProductRequestBodySchema, "body"),
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteProductRequestParamsSchema, "params"),
  deleteProduct
);

export default router;
