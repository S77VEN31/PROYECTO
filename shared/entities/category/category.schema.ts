/**
 * Schemas for Category entities
 */

import {
  IdParamSchema,
  ImageSchema,
  PaginationParamsSchema,
  SearchableParamsSchema,
} from "@shared/common";
import {
  Category,
  CategoryBase,
  CategoryCreate,
  CategoryFilterParams,
  CategoryUpdate,
  CreateCategoryRequestBody,
  DeleteCategoryRequestParams,
  EntityMetadataSchema,
  GetCategoriesRequestParams,
  GetCategoryRequestParams,
  UpdateCategoryRequestBody,
  UpdateCategoryRequestParams,
} from "@shared/entities";
import { CategoryVariant } from "@shared/enums";
import { z } from "zod";

/**
 * Schema for core category information
 */
export const CategoryBaseSchema = EntityMetadataSchema.extend({
  icon: z.string().min(1),
  displayOrder: z.number().int().min(0),
  products: z.array(z.string()),
  variant: z.nativeEnum(CategoryVariant),
}) satisfies z.ZodType<CategoryBase>;

/**
 * Schema for complete category representation
 */
export const CategorySchema = CategoryBaseSchema.extend({
  id: z.string().min(1),
}) satisfies z.ZodType<Category>;

/**
 * Schema for category creation
 */
export const CategoryCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  icon: z.string().min(1),
  variant: z.nativeEnum(CategoryVariant),
  displayOrder: z.number().int().min(0).optional(),
  products: z.array(z.string()).optional(),
  active: z.boolean().optional(),
  slug: z.string().optional(),
  searchTerm: z.string().optional(),
  backgroundImages: z.array(ImageSchema).optional(),
}) satisfies z.ZodType<CategoryCreate>;

/**
 * Schema for category updates
 */
export const CategoryUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  displayOrder: z.number().int().min(0).optional(),
  products: z.array(z.string()).optional(),
  variant: z.nativeEnum(CategoryVariant).optional(),
  slug: z.string().optional(),
  active: z.boolean().optional(),
}) satisfies z.ZodType<CategoryUpdate>;

/**
 * Category filter parameters schema
 */
export const CategoryFilterParamsSchema = SearchableParamsSchema.merge(
  PaginationParamsSchema
).extend({
  variant: z.string().optional(),
}) satisfies z.ZodType<CategoryFilterParams>;

/**
 * Category request validation schemas
 */

// GET /categories - validate query parameters
export const GetCategoriesRequestParamsSchema = SearchableParamsSchema.merge(
  PaginationParamsSchema
).extend({
  variant: z.nativeEnum(CategoryVariant).optional(),
}) satisfies z.ZodType<GetCategoriesRequestParams>;

// GET /categories/:id - validate params
export const GetCategoryRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<GetCategoryRequestParams>;

// POST /categories - validate body (category data without nesting)
export const CreateCategoryRequestBodySchema =
  CategoryCreateSchema satisfies z.ZodType<CreateCategoryRequestBody>;

// PUT /categories/:id - validate params
export const UpdateCategoryRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<UpdateCategoryRequestParams>;

// PUT /categories/:id - validate body
export const UpdateCategoryRequestBodySchema =
  CategoryUpdateSchema satisfies z.ZodType<UpdateCategoryRequestBody>;

// DELETE /categories/:id - validate params
export const DeleteCategoryRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<DeleteCategoryRequestParams>;
