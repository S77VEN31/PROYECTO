/**
 * Promotion MongoDB model
 * Defines the schema and model for promotion entities
 */

import mongoose, { Schema, Document } from "mongoose";
import { PromotionType } from "colori-platform-shared";

/**
 * Promotion document interface for MongoDB
 */
export interface IPromotionDocument extends Document {
  name: string;
  description: string;
  slug: string;
  type: PromotionType;
  startDate: string;
  endDate: string;
  code?: string;
  discountValue?: number;
  discountPercent?: number;
  minimumPurchase?: number;
  usageLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Promotion MongoDB schema
 */
const PromotionSchema = new Schema<IPromotionDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
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
    applicableProducts: [{
      type: String,
      trim: true,
    }],
    applicableCategories: [{
      type: String,
      trim: true,
    }],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "promotions",
  }
);

/**
 * Indexes for better query performance
 */
PromotionSchema.index({ name: 1 });
PromotionSchema.index({ type: 1 });
PromotionSchema.index({ active: 1 });
PromotionSchema.index({ startDate: 1, endDate: 1 });
PromotionSchema.index({ code: 1 }, { sparse: true });
PromotionSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save middleware to generate slug if not provided
 */
PromotionSchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

/**
 * Validation for discount configuration
 */
PromotionSchema.pre("save", function (next) {
  // Only require discount for DISCOUNT type promotions
  if (this.type === PromotionType.DISCOUNT) {
    if (!this.discountValue && !this.discountPercent) {
      return next(new Error("Either discountValue or discountPercent must be provided for discount promotions"));
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
 * Export the Promotion model
 */
const PromotionModel = mongoose.model<IPromotionDocument>("Promotion", PromotionSchema);

export default PromotionModel;
