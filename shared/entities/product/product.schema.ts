/**
 * Schemas for Product entities
 */

import { ImageSchema } from "@shared/common";
import {
  EntityMetadataSchema,
  NutritionalInfo,
  Product,
  ProductBase,
  ProductCreate,
  ProductUpdate,
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
  id: z.string().uuid(),
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
}) satisfies z.ZodType<ProductCreate>;

/**
 * Schema for product updates
 */
export const ProductUpdateSchema = ProductBaseSchema.omit({
  id: true,
}).partial() satisfies z.ZodType<ProductUpdate>;

/**
 * Product request validation schemas
 */

export const GetProductRequestSchema = z.object({
  id: z.string().uuid(),
});

export const CreateProductRequestSchema = z.object({
  product: z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(1),
    price: z.number().positive(),
    longDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    nutritionalInfo: NutritionalInfoSchema.optional(),
    category: z.string().uuid().optional(),
    preparationTime: z.number().int().positive().optional(),
    images: z.array(z.string().url()).optional(),
    active: z.boolean().optional().default(true),
  }),
});

export const UpdateProductRequestSchema = z.object({
  id: z.string().uuid(),
  product: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    longDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    nutritionalInfo: NutritionalInfoSchema.optional(),
    category: z.string().uuid().optional(),
    preparationTime: z.number().int().positive().optional(),
    images: z.array(z.string().url()).optional(),
    active: z.boolean().optional(),
  }),
});

export const DeleteProductRequestSchema = z.object({
  id: z.string().uuid(),
});
