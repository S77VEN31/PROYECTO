/**
 * Promotion routes
 * Handles all promotion-related HTTP endpoints
 */

import { Router } from "express";
import { PromotionController } from "../../controllers/entities/promotion.controller";
import { validate } from "../../middlewares/validation/validation.middleware";
import {
  CreatePromotionRequestSchema,
  DeletePromotionRequestSchema,
  GetPromotionRequestSchema,
  UpdatePromotionRequestSchema,
} from "colori-platform-shared";

const router = Router();

/**
 * GET /promotions
 * Get all promotions with optional filtering
 */
router.get("/", PromotionController.getPromotions);

/**
 * GET /promotions/:id
 * Get promotion by ID
 */
router.get(
  "/:id",
  validate(GetPromotionRequestSchema, "params"),
  PromotionController.getPromotionById
);

/**
 * POST /promotions
 * Create new promotion
 */
router.post(
  "/",
  validate(CreatePromotionRequestSchema, "body"),
  PromotionController.createPromotion
);

/**
 * PUT /promotions/:id
 * Update existing promotion
 */
router.put(
  "/:id",
  validate(UpdatePromotionRequestSchema, "body"),
  PromotionController.updatePromotion
);

/**
 * DELETE /promotions/:id
 * Delete promotion by ID
 */
router.delete(
  "/:id",
  validate(DeletePromotionRequestSchema, "params"),
  PromotionController.deletePromotion
);

export default router;
