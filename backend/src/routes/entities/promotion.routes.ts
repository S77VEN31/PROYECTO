import {
  createPromotion,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
} from "@controllers";
import { authMiddleware, validate } from "@middlewares";
import {
  CreatePromotionRequestSchema,
  DeletePromotionRequestSchema,
  GetPromotionRequestSchema,
  UpdatePromotionRequestSchema,
} from "colori-platform-shared";
import { Router } from "express";

const router = Router();

// Promotion CRUD routes
router.post(
  "/",
  authMiddleware,
  validate(CreatePromotionRequestSchema),
  createPromotion
);
router.get("/", getPromotions);
router.get("/:id", validate(GetPromotionRequestSchema), getPromotionById);
router.put(
  "/:id",
  authMiddleware,
  validate(UpdatePromotionRequestSchema),
  updatePromotion
);
router.delete(
  "/:id",
  authMiddleware,
  validate(DeletePromotionRequestSchema),
  deletePromotion
);

export default router;
