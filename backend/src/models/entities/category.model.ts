import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { CategoryCreate, CategoryVariant } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import { addSlugGenerationMiddleware } from "@middlewares";

/**
 * Specific type that merges IBaseDocument with CategoryCreate without conflicts
 * Takes only the fields from CategoryCreate that are not in IBaseDocument
 * @typedef {Object} CategoryDocument
 */
type CategoryDocument = Omit<CategoryCreate, keyof IBaseDocument>;

/**
 * Schema for category model with base fields and category-specific fields
 * @const categorySchema
 */
const categorySchema = new Schema<CategoryDocument>(
  {
    ...baseEntitySchemaFields,
    icon: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    products: [{ type: String, default: [] }],
    variant: {
      type: String,
      enum: Object.values(CategoryVariant),
      required: true,
    },
  },
  baseEntitySchemaOptions
);

// Add middleware for automatic slug generation
addSlugGenerationMiddleware(categorySchema);

/**
 * Mongoose model for categories
 * @const CategoryModel
 */
const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryModel;
