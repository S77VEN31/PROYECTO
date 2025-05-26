"use strict";
/**
 * Schemas for Promotion entities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePromotionRequestSchema = exports.UpdatePromotionRequestSchema = exports.CreatePromotionRequestSchema = exports.GetPromotionRequestSchema = exports.PromotionUpdateSchema = exports.PromotionCreateSchema = exports.PromotionSchema = exports.PromotionBaseSchema = void 0;
const common_1 = require("../../common");
const entities_1 = require("../../entities");
const enums_1 = require("../../enums");
const zod_1 = require("zod");
/**
 * Schema for core promotion information
 */
exports.PromotionBaseSchema = entities_1.EntityMetadataSchema.extend({
    type: zod_1.z.nativeEnum(enums_1.PromotionType),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
    code: zod_1.z.string().optional(),
    discountValue: zod_1.z.number().nonnegative().optional(),
    discountPercent: zod_1.z.number().min(0).max(100).optional(),
    minimumPurchase: zod_1.z.number().nonnegative().optional(),
    usageLimit: zod_1.z.number().int().nonnegative().optional(),
    applicableProducts: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    applicableCategories: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
/**
 * Schema for complete promotion representation
 */
exports.PromotionSchema = exports.PromotionBaseSchema.extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for promotion creation
 */
exports.PromotionCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    type: zod_1.z.nativeEnum(enums_1.PromotionType),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
    code: zod_1.z.string().optional(),
    discountValue: zod_1.z.number().nonnegative().optional(),
    discountPercent: zod_1.z.number().min(0).max(100).optional(),
    minimumPurchase: zod_1.z.number().nonnegative().optional(),
    usageLimit: zod_1.z.number().int().nonnegative().optional(),
    applicableProducts: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    applicableCategories: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    slug: zod_1.z.string().optional(),
    backgroundImages: zod_1.z.array(common_1.ImageSchema).optional(),
});
/**
 * Schema for promotion updates
 */
exports.PromotionUpdateSchema = exports.PromotionBaseSchema.omit({
    id: true,
}).partial();
/**
 * Promotion request validation schemas
 */
exports.GetPromotionRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.CreatePromotionRequestSchema = zod_1.z.object({
    promotion: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
        description: zod_1.z.string().min(1),
        type: zod_1.z.nativeEnum(enums_1.PromotionType),
        startDate: zod_1.z.string().datetime(),
        endDate: zod_1.z.string().datetime(),
        code: zod_1.z.string().optional(),
        discountValue: zod_1.z.number().nonnegative().optional(),
        discountPercent: zod_1.z.number().min(0).max(100).optional(),
        minimumPurchase: zod_1.z.number().nonnegative().optional(),
        usageLimit: zod_1.z.number().int().nonnegative().optional(),
        applicableProducts: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        applicableCategories: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        active: zod_1.z.boolean().optional().default(true),
    }),
});
exports.UpdatePromotionRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    promotion: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        description: zod_1.z.string().min(1).optional(),
        type: zod_1.z.nativeEnum(enums_1.PromotionType).optional(),
        startDate: zod_1.z.string().datetime().optional(),
        endDate: zod_1.z.string().datetime().optional(),
        code: zod_1.z.string().optional(),
        discountValue: zod_1.z.number().nonnegative().optional(),
        discountPercent: zod_1.z.number().min(0).max(100).optional(),
        minimumPurchase: zod_1.z.number().nonnegative().optional(),
        usageLimit: zod_1.z.number().int().nonnegative().optional(),
        applicableProducts: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        applicableCategories: zod_1.z.array(zod_1.z.string().uuid()).optional(),
        active: zod_1.z.boolean().optional(),
    }),
});
exports.DeletePromotionRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=promotion.schema.js.map