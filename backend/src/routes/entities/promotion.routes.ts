/**
 * Promotion routes
 * Handles all promotion-related HTTP endpoints
 */

import {
  CreatePromotionRequestBodySchema,
  DeletePromotionRequestParamsSchema,
  GetPromotionRequestParamsSchema,
  GetPromotionsRequestParamsSchema,
  UpdatePromotionRequestBodySchema,
  UpdatePromotionRequestParamsSchema,
} from "colori-platform-shared";
import { Router } from "express";
import { PromotionController } from "../../controllers/entities/promotion.controller";
import { validate } from "../../middlewares/validation/validation.middleware";

const router = Router();

/**
 * GET /promotions
 * Get all promotions with optional filtering
 */
router.get(
  "/",
  validate(GetPromotionsRequestParamsSchema, "query"),
  PromotionController.getPromotions
);

/**
 * GET /promotions/:id
 * Get promotion by ID
 */
router.get(
  "/:id",
  validate(GetPromotionRequestParamsSchema, "params"),
  PromotionController.getPromotionById
);

/**
 * POST /promotions
 * Create new promotion
 */
router.post(
  "/",
  validate(CreatePromotionRequestBodySchema, "body"),
  PromotionController.createPromotion
);

/**
 * PUT /promotions/:id
 * Update existing promotion
 */
router.put(
  "/:id",
  validate(UpdatePromotionRequestParamsSchema, "params"),
  validate(UpdatePromotionRequestBodySchema, "body"),
  PromotionController.updatePromotion
);

/**
 * DELETE /promotions/:id
 * Delete promotion by ID
 */
router.delete(
  "/:id",
  validate(DeletePromotionRequestParamsSchema, "params"),
  PromotionController.deletePromotion
);

export default router;
