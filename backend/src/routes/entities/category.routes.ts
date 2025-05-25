import { authMiddleware, validate } from "@/middlewares";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "@controllers";
import {
  CreateCategoryRequestSchema,
  DeleteCategoryRequestSchema,
  GetCategoryRequestSchema,
  UpdateCategoryRequestSchema,
} from "colori-platform-shared";
import express from "express";
const router = express.Router();

// Category CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreateCategoryRequestSchema),
  createCategory
);
router.get("/", getCategories);
router.get("/:id", validate(GetCategoryRequestSchema), getCategoryById);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdateCategoryRequestSchema),
  updateCategory
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeleteCategoryRequestSchema),
  deleteCategory
);

export default router;
