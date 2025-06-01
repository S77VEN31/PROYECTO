import { authMiddleware, validate } from "@/middlewares";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@controllers";
import {
  CreateCategoryRequestBodySchema,
  DeleteCategoryRequestParamsSchema,
  GetCategoriesRequestParamsSchema,
  GetCategoryRequestParamsSchema,
  UpdateCategoryRequestBodySchema,
  UpdateCategoryRequestParamsSchema,
} from "colori-platform-shared";
import express from "express";
const router = express.Router();

// Category CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreateCategoryRequestBodySchema, "body"),
  createCategory
);
router.get(
  "/",
  validate(GetCategoriesRequestParamsSchema, "query"),
  getCategories
);
router.get(
  "/:id",
  validate(GetCategoryRequestParamsSchema, "params"),
  getCategoryById
);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateCategoryRequestParamsSchema, "params"),
  validate(UpdateCategoryRequestBodySchema, "body"),
  updateCategory
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteCategoryRequestParamsSchema, "params"),
  deleteCategory
);

export default router;
