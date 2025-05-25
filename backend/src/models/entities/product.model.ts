import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { ProductCreate } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import { addSlugGenerationMiddleware } from "@middlewares";

/**
 * Specific type that merges IBaseDocument with ProductCreate without conflicts
 * Takes only the fields from ProductCreate that are not in IBaseDocument
 * @typedef {Object} ProductDocument
 */
type ProductDocument = Omit<ProductCreate, keyof IBaseDocument>;

/**
 * Schema for product model with base fields and product-specific fields
 * @const productSchema
 */
const productSchema = new Schema<ProductDocument>(
  {
    ...baseEntitySchemaFields,
    price: { type: Number, required: true },
    longDescription: String,
    tags: [String],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      allergens: [String],
    },
    preparationTime: Number,
  },
  baseEntitySchemaOptions
);

/**
 * Add middleware for automatic slug generation
 */
addSlugGenerationMiddleware(productSchema);

/**
 * Mongoose model for products
 * @const ProductModel
 */
export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
