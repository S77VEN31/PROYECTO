"use strict";
/**
 * Schemas for Category entities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryRequestSchema = exports.UpdateCategoryRequestSchema = exports.CreateCategoryRequestSchema = exports.GetCategoryRequestSchema = exports.CategoryUpdateSchema = exports.CategoryCreateSchema = exports.CategorySchema = exports.CategoryBaseSchema = void 0;
const common_1 = require("@shared/common");
const entities_1 = require("@shared/entities");
const enums_1 = require("@shared/enums");
const zod_1 = require("zod");
/**
 * Schema for core category information
 */
exports.CategoryBaseSchema = entities_1.EntityMetadataSchema.extend({
    icon: zod_1.z.string(),
    displayOrder: zod_1.z.number().int(),
    products: zod_1.z.array(zod_1.z.string().uuid()),
    variant: zod_1.z.nativeEnum(enums_1.CategoryVariant),
});
/**
 * Schema for complete category representation
 */
exports.CategorySchema = exports.CategoryBaseSchema.extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for category creation
 */
exports.CategoryCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    icon: zod_1.z.string().optional(),
    displayOrder: zod_1.z.number().int().optional(),
    products: zod_1.z.array(zod_1.z.string().uuid()).optional(),
    variant: zod_1.z.nativeEnum(enums_1.CategoryVariant).optional(),
    slug: zod_1.z.string().optional(),
    backgroundImages: zod_1.z.array(common_1.ImageSchema).optional(),
});
/**
 * Schema for category updates
 */
exports.CategoryUpdateSchema = exports.CategoryBaseSchema.omit({
    id: true,
}).partial();
/**
 * Category request validation schemas
 */
exports.GetCategoryRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.CreateCategoryRequestSchema = zod_1.z.object({
    category: zod_1.z.object({
        name: zod_1.z.string().min(2).max(50),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
        active: zod_1.z.boolean().optional().default(true),
        order: zod_1.z.number().int().optional(),
        metadata: zod_1.z.record(zod_1.z.string()).optional(),
    }),
});
exports.UpdateCategoryRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    category: zod_1.z.object({
        name: zod_1.z.string().min(2).max(50).optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().url().optional(),
        active: zod_1.z.boolean().optional(),
        order: zod_1.z.number().int().optional(),
        metadata: zod_1.z.record(zod_1.z.string()).optional(),
    }),
});
exports.DeleteCategoryRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
//# sourceMappingURL=category.schema.js.map