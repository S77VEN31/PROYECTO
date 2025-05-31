/**
 * Schemas for Promotion entities
 */

import { ImageSchema, MongoIdSchema, OptionalMongoIdArraySchema } from "@shared/common";
import { EntityMetadataSchema } from "@shared/entities";
import { PromotionType } from "@shared/enums";
import { z } from "zod";
import {
  Promotion,
  PromotionBase,
  PromotionCreate,
  PromotionUpdate,
} from "./promotion";

/**
 * Schema for core promotion information
 */
export const PromotionBaseSchema = EntityMetadataSchema.extend({
  type: z.nativeEnum(PromotionType),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  code: z.string().optional(),
  discountValue: z.number().nonnegative().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  minimumPurchase: z.number().nonnegative().optional(),
  usageLimit: z.number().int().nonnegative().optional(),
  applicableProducts: OptionalMongoIdArraySchema,
  applicableCategories: OptionalMongoIdArraySchema,
}) satisfies z.ZodType<PromotionBase>;

/**
 * Schema for complete promotion representation
 */
export const PromotionSchema = PromotionBaseSchema.extend({
  id: MongoIdSchema,
}) satisfies z.ZodType<Promotion>;

/**
 * Schema for promotion creation
 */
export const PromotionCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  type: z.nativeEnum(PromotionType),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  code: z.string().optional(),
  discountValue: z.number().nonnegative().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  minimumPurchase: z.number().nonnegative().optional(),
  usageLimit: z.number().int().nonnegative().optional(),
  applicableProducts: OptionalMongoIdArraySchema,
  applicableCategories: OptionalMongoIdArraySchema,
  slug: z.string().optional(),
  backgroundImages: z.array(ImageSchema).optional(),
}) satisfies z.ZodType<PromotionCreate>;

/**
 * Schema for promotion updates
 */
export const PromotionUpdateSchema = PromotionBaseSchema.omit({
  id: true,
}).partial() satisfies z.ZodType<PromotionUpdate>;

/**
 * Promotion request validation schemas
 */

export const GetPromotionRequestSchema = z.object({
  id: MongoIdSchema,
});

export const CreatePromotionRequestSchema = z.object({
  promotion: z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(1),
    type: z.nativeEnum(PromotionType),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    code: z.string().optional(),
    discountValue: z.number().nonnegative().optional(),
    discountPercent: z.number().min(0).max(100).optional(),
    minimumPurchase: z.number().nonnegative().optional(),
    usageLimit: z.number().int().nonnegative().optional(),
    applicableProducts: OptionalMongoIdArraySchema,
    applicableCategories: OptionalMongoIdArraySchema,
    active: z.boolean().optional().default(true),
  }),
});

export const UpdatePromotionRequestSchema = z.object({
  id: MongoIdSchema,
  promotion: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().min(1).optional(),
    type: z.nativeEnum(PromotionType).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    code: z.string().optional(),
    discountValue: z.number().nonnegative().optional(),
    discountPercent: z.number().min(0).max(100).optional(),
    minimumPurchase: z.number().nonnegative().optional(),
    usageLimit: z.number().int().nonnegative().optional(),
    applicableProducts: OptionalMongoIdArraySchema,
    applicableCategories: OptionalMongoIdArraySchema,
    active: z.boolean().optional(),
  }),
});

export const DeletePromotionRequestSchema = z.object({
  id: MongoIdSchema,
});
