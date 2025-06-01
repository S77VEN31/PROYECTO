import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { CategoryCreate, CategoryVariant } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import { addSlugGenerationMiddleware } from "@middlewares";

/**
 * Category document interface that extends IBaseDocument with CategoryCreate fields
 * @interface CategoryDocument
 */
interface CategoryDocument
  extends IBaseDocument,
    Omit<CategoryCreate, keyof IBaseDocument> {}

/**
 * Schema for category model using CategoryCreate type from shared repository
 * @const categorySchema
 */
const categorySchema = new Schema<CategoryDocument>(
  {
    ...baseEntitySchemaFields,
    // Required fields from CategoryCreate
    icon: { type: String, required: true },
    variant: {
      type: String,
      enum: Object.values(CategoryVariant),
      required: true,
    },
    // Optional fields from CategoryCreate with defaults
    displayOrder: { type: Number, default: 0 },
    products: [{ type: String, default: [] }],
  },
  baseEntitySchemaOptions
);

/**
 * Indexes for better query performance
 */
categorySchema.index({ name: 1 });
categorySchema.index({ active: 1 });
categorySchema.index({ variant: 1 });
categorySchema.index({ displayOrder: 1 });
categorySchema.index({ slug: 1 }, { unique: true });

/**
 * Add middleware for automatic slug generation
 */
addSlugGenerationMiddleware(categorySchema as any);

/**
 * Mongoose model for categories
 * @const CategoryModel
 */
const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryModel;
export type { CategoryDocument };

