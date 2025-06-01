import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { ProductCreate } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import { addSlugGenerationMiddleware } from "@middlewares";

/**
 * Product document interface that extends IBaseDocument with ProductCreate fields
 * @interface ProductDocument
 */
interface ProductDocument
  extends IBaseDocument,
    Omit<ProductCreate, keyof IBaseDocument> {}

/**
 * Schema for product model using ProductCreate type from shared repository
 * @const productSchema
 */
const productSchema = new Schema<ProductDocument>(
  {
    ...baseEntitySchemaFields,
    // Required fields from ProductCreate
    price: { type: Number, required: true },
    // Optional fields from ProductCreate
    longDescription: { type: String },
    tags: [{ type: String }],
    nutritionalInfo: {
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fat: { type: Number },
      allergens: [{ type: String }],
    },
    preparationTime: { type: Number },
  },
  baseEntitySchemaOptions
);

/**
 * Add middleware for automatic slug generation
 */
addSlugGenerationMiddleware(productSchema as any);

/**
 * Mongoose model for products
 * @const ProductModel
 */
export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);

export type { ProductDocument };
