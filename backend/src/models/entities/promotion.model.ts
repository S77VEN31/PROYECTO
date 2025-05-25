import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { PromotionCreate, PromotionType } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import { addSlugGenerationMiddleware } from "@middlewares";

/**
 * Specific type that merges IBaseDocument with PromotionCreate without conflicts
 * Takes only the fields from PromotionCreate that are not in IBaseDocument
 * @typedef {Object} PromotionDocument
 */
type PromotionDocument = Omit<PromotionCreate, keyof IBaseDocument>;

/**
 * Schema for promotion model with base fields and promotion-specific fields
 * @const promotionSchema
 */
const promotionSchema = new Schema<PromotionDocument>(
  {
    ...baseEntitySchemaFields,
    type: {
      type: String,
      enum: Object.values(PromotionType),
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    code: String,
    discountValue: Number,
    discountPercent: Number,
    minimumPurchase: Number,
    usageLimit: Number,
    applicableProducts: [{ type: String, default: [] }],
    applicableCategories: [{ type: String, default: [] }],
  },
  baseEntitySchemaOptions
);

/**
 * Add middleware for automatic slug generation
 */
addSlugGenerationMiddleware(promotionSchema);

/**
 * Mongoose model for promotions
 * @const PromotionModel
 */
const PromotionModel = mongoose.model<PromotionDocument>(
  "Promotion",
  promotionSchema
);

export default PromotionModel;
