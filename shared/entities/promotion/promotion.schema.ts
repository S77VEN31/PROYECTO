/**
 * Schemas for Promotion entities
 */

import {
  IdParamSchema,
  ImageSchema,
  OptionalMongoIdArraySchema,
  PaginationParamsSchema,
  SearchableParamsSchema,
} from "@shared/common";
import {
  CreatePromotionRequestBody,
  DeletePromotionRequestParams,
  EntityMetadataSchema,
  GetPromotionRequestParams,
  GetPromotionsRequestParams,
  Promotion,
  PromotionBase,
  PromotionCreate,
  PromotionUpdate,
  UpdatePromotionRequestBody,
  UpdatePromotionRequestParams,
} from "@shared/entities";
import { PromotionType } from "@shared/enums";
import { z } from "zod";

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
  id: z.string().min(1),
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
  active: z.boolean().optional(),
}) satisfies z.ZodType<PromotionCreate>;

/**
 * Schema for promotion updates
 */
export const PromotionUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
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
  slug: z.string().optional(),
  backgroundImages: z.array(ImageSchema).optional(),
  active: z.boolean().optional(),
}) satisfies z.ZodType<PromotionUpdate>;

/**
 * Promotion request validation schemas
 */

// GET /promotions - validate query parameters
export const GetPromotionsRequestParamsSchema = SearchableParamsSchema.merge(
  PaginationParamsSchema
).extend({
  active: z.boolean().optional(),
  type: z.string().optional(),
}) satisfies z.ZodType<GetPromotionsRequestParams>;

// GET /promotions/:id - validate params
export const GetPromotionRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<GetPromotionRequestParams>;

// POST /promotions - validate body (promotion data without nesting)
export const CreatePromotionRequestBodySchema =
  PromotionCreateSchema satisfies z.ZodType<CreatePromotionRequestBody>;

// PUT /promotions/:id - validate params
export const UpdatePromotionRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<UpdatePromotionRequestParams>;

// PUT /promotions/:id - validate body
export const UpdatePromotionRequestBodySchema =
  PromotionUpdateSchema satisfies z.ZodType<UpdatePromotionRequestBody>;

// DELETE /promotions/:id - validate params
export const DeletePromotionRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<DeletePromotionRequestParams>;
