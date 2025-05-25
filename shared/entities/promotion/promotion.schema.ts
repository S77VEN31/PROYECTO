/**
 * Schemas for Promotion entities
 */

import { ImageSchema } from "@shared/common";
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
  applicableProducts: z.array(z.string().uuid()).optional(),
  applicableCategories: z.array(z.string().uuid()).optional(),
}) satisfies z.ZodType<PromotionBase>;

/**
 * Schema for complete promotion representation
 */
export const PromotionSchema = PromotionBaseSchema.extend({
  id: z.string().uuid(),
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
  applicableProducts: z.array(z.string().uuid()).optional(),
  applicableCategories: z.array(z.string().uuid()).optional(),
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
  id: z.string().uuid(),
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
    applicableProducts: z.array(z.string().uuid()).optional(),
    applicableCategories: z.array(z.string().uuid()).optional(),
    active: z.boolean().optional().default(true),
  }),
});

export const UpdatePromotionRequestSchema = z.object({
  id: z.string().uuid(),
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
    applicableProducts: z.array(z.string().uuid()).optional(),
    applicableCategories: z.array(z.string().uuid()).optional(),
    active: z.boolean().optional(),
  }),
});

export const DeletePromotionRequestSchema = z.object({
  id: z.string().uuid(),
});
