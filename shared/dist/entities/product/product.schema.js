"use strict";
/**
 * Schemas for Product entities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductRequestSchema = exports.UpdateProductRequestSchema = exports.CreateProductRequestSchema = exports.GetProductRequestSchema = exports.ProductUpdateSchema = exports.ProductCreateSchema = exports.ProductSchema = exports.ProductBaseSchema = exports.NutritionalInfoSchema = void 0;
const common_1 = require("../../common");
const entities_1 = require("../../entities");
const zod_1 = require("zod");
/**
 * Schema for nutritional information
 */
exports.NutritionalInfoSchema = zod_1.z.object({
    calories: zod_1.z.number().nonnegative().optional(),
    protein: zod_1.z.number().nonnegative().optional(),
    carbs: zod_1.z.number().nonnegative().optional(),
    fat: zod_1.z.number().nonnegative().optional(),
    allergens: zod_1.z.array(zod_1.z.string()).optional(),
});
/**
 * Schema for core product information
 */
exports.ProductBaseSchema = entities_1.EntityMetadataSchema.extend({
    price: zod_1.z.number().positive(),
    longDescription: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    nutritionalInfo: exports.NutritionalInfoSchema.optional(),
    preparationTime: zod_1.z.number().nonnegative().optional(),
});
/**
 * Schema for complete product representation
 */
exports.ProductSchema = exports.ProductBaseSchema.extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for product creation
 */
exports.ProductCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    longDescription: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    nutritionalInfo: exports.NutritionalInfoSchema.optional(),
    preparationTime: zod_1.z.number().nonnegative().optional(),
    slug: zod_1.z.string().optional(),
    backgroundImages: zod_1.z.array(common_1.ImageSchema).optional(),
});
/**
 * Schema for product updates
 */
exports.ProductUpdateSchema = exports.ProductBaseSchema.omit({
    id: true,
}).partial();
/**
 * Product request validation schemas
 */
exports.GetProductRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.CreateProductRequestSchema = zod_1.z.object({
    product: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100),
        description: zod_1.z.string().min(1),
        price: zod_1.z.number().positive(),
        longDescription: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        nutritionalInfo: exports.NutritionalInfoSchema.optional(),
        category: zod_1.z.string().uuid().optional(),
        preparationTime: zod_1.z.number().int().positive().optional(),
        images: zod_1.z.array(zod_1.z.string().url()).optional(),
        active: zod_1.z.boolean().optional().default(true),
    }),
});
exports.UpdateProductRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    product: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        description: zod_1.z.string().min(1).optional(),
        price: zod_1.z.number().positive().optional(),
        longDescription: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        nutritionalInfo: exports.NutritionalInfoSchema.optional(),
        category: zod_1.z.string().uuid().optional(),
        preparationTime: zod_1.z.number().int().positive().optional(),
        images: zod_1.z.array(zod_1.z.string().url()).optional(),
        active: zod_1.z.boolean().optional(),
    }),
});
exports.DeleteProductRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=product.schema.js.map