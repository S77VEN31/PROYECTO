/**
 * Promotion MongoDB model
 * Defines the schema and model for promotion entities
 */

import { addSlugGenerationMiddleware } from "@middlewares";
import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { PromotionCreate, PromotionType } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

/**
 * Promotion document interface that extends IBaseDocument with PromotionCreate fields
 * @interface PromotionDocument
 */
interface PromotionDocument
  extends IBaseDocument,
    Omit<PromotionCreate, keyof IBaseDocument> {}

/**
 * Schema for promotion model using PromotionCreate type from shared repository
 * @const promotionSchema
 */
const promotionSchema = new Schema<PromotionDocument>(
  {
    ...baseEntitySchemaFields,
    // Required fields from PromotionCreate
    type: {
      type: String,
      enum: Object.values(PromotionType),
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    // Optional fields from PromotionCreate
    code: {
      type: String,
      trim: true,
      uppercase: true,
      sparse: true, // Allows multiple null values but unique non-null values
    },
    discountValue: {
      type: Number,
      min: 0,
    },
    discountPercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    minimumPurchase: {
      type: Number,
      min: 0,
    },
    usageLimit: {
      type: Number,
      min: 1,
    },
    applicableProducts: [
      {
        type: String,
        trim: true,
      },
    ],
    applicableCategories: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  baseEntitySchemaOptions
);

/**
 * Indexes for better query performance
 */
promotionSchema.index({ name: 1 });
promotionSchema.index({ type: 1 });
promotionSchema.index({ active: 1 });
promotionSchema.index({ startDate: 1, endDate: 1 });
promotionSchema.index({ code: 1 }, { sparse: true });
promotionSchema.index({ slug: 1 }, { unique: true });

/**
 * Add middleware for automatic slug generation
 */
addSlugGenerationMiddleware(promotionSchema as any);

/**
 * Validation for discount configuration
 */
promotionSchema.pre("save", function (next) {
  // Only require discount for DISCOUNT type promotions
  if (this.type === PromotionType.DISCOUNT) {
    if (!this.discountValue && !this.discountPercent) {
      return next(
        new Error(
          "Either discountValue or discountPercent must be provided for discount promotions"
        )
      );
    }
  }

  // Ensure dates are valid
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);

  if (endDate <= startDate) {
    return next(new Error("End date must be after start date"));
  }

  next();
});

/**
 * Mongoose model for promotions
 * @const PromotionModel
 */
const PromotionModel = mongoose.model<PromotionDocument>(
  "Promotion",
  promotionSchema
);

export default PromotionModel;
export type { PromotionDocument };

