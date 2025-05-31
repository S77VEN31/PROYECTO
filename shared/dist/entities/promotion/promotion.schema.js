/**
 * Schemas for Promotion entities
 */
import { ImageSchema, MongoIdSchema, OptionalMongoIdArraySchema } from "../../common";
import { EntityMetadataSchema } from "../../entities";
import { PromotionType } from "../../enums";
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
});
/**
 * Schema for complete promotion representation
 */
export const PromotionSchema = PromotionBaseSchema.extend({
    id: MongoIdSchema,
});
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
});
/**
 * Schema for promotion updates
 */
export const PromotionUpdateSchema = PromotionBaseSchema.omit({
    id: true,
}).partial();
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
//# sourceMappingURL=promotion.schema.js.map