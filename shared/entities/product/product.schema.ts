/**
 * Schemas for Product entities
 */

import {
  IdParamSchema,
  ImageSchema,
  PaginationParamsSchema,
  SearchableParamsSchema,
} from "@shared/common";
import {
  CreateProductRequestBody,
  DeleteProductRequestParams,
  EntityMetadataSchema,
  GetProductRequestParams,
  GetProductsRequestParams,
  NutritionalInfo,
  Product,
  ProductBase,
  ProductCreate,
  ProductUpdate,
  UpdateProductRequestBody,
  UpdateProductRequestParams,
} from "@shared/entities";
import { z } from "zod";

/**
 * Schema for nutritional information
 */
export const NutritionalInfoSchema = z.object({
  calories: z.number().nonnegative().optional(),
  protein: z.number().nonnegative().optional(),
  carbs: z.number().nonnegative().optional(),
  fat: z.number().nonnegative().optional(),
  allergens: z.array(z.string()).optional(),
}) satisfies z.ZodType<NutritionalInfo>;

/**
 * Schema for core product information
 */
export const ProductBaseSchema = EntityMetadataSchema.extend({
  price: z.number().positive(),
  longDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  nutritionalInfo: NutritionalInfoSchema.optional(),
  preparationTime: z.number().nonnegative().optional(),
}) satisfies z.ZodType<ProductBase>;

/**
 * Schema for complete product representation
 */
export const ProductSchema = ProductBaseSchema.extend({
  id: z.string().min(1),
}) satisfies z.ZodType<Product>;

/**
 * Schema for product creation
 */
export const ProductCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  price: z.number().positive(),
  longDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  nutritionalInfo: NutritionalInfoSchema.optional(),
  preparationTime: z.number().nonnegative().optional(),
  slug: z.string().optional(),
  backgroundImages: z.array(ImageSchema).optional(),
  active: z.boolean().optional(),
}) satisfies z.ZodType<ProductCreate>;

/**
 * Schema for product updates
 */
export const ProductUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  longDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  nutritionalInfo: NutritionalInfoSchema.optional(),
  preparationTime: z.number().nonnegative().optional(),
  slug: z.string().optional(),
  backgroundImages: z.array(ImageSchema).optional(),
  active: z.boolean().optional(),
}) satisfies z.ZodType<ProductUpdate>;

/**
 * Product request validation schemas
 */

// GET /products - validate query parameters
export const GetProductsRequestParamsSchema = SearchableParamsSchema.merge(
  PaginationParamsSchema
).extend({
  category: z.string().optional(),
  tag: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
}) satisfies z.ZodType<GetProductsRequestParams>;

// GET /products/:id - validate params
export const GetProductRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<GetProductRequestParams>;

// POST /products - validate body (product data without nesting)
export const CreateProductRequestBodySchema =
  ProductCreateSchema satisfies z.ZodType<CreateProductRequestBody>;

// PUT /products/:id - validate params
export const UpdateProductRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<UpdateProductRequestParams>;

// PUT /products/:id - validate body
export const UpdateProductRequestBodySchema =
  ProductUpdateSchema satisfies z.ZodType<UpdateProductRequestBody>;

// DELETE /products/:id - validate params
export const DeleteProductRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<DeleteProductRequestParams>;
