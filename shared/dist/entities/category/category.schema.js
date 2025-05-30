/**
 * Schemas for Category entities
 */
import { ImageSchema } from "../../common";
import { EntityMetadataSchema, } from "../../entities";
import { CategoryVariant } from "../../enums";
import { z } from "zod";
/**
 * Schema for core category information
 */
export const CategoryBaseSchema = EntityMetadataSchema.extend({
    icon: z.string(),
    displayOrder: z.number().int(),
    products: z.array(z.string().uuid()),
    variant: z.nativeEnum(CategoryVariant),
});
/**
 * Schema for complete category representation
 */
export const CategorySchema = CategoryBaseSchema.extend({
    id: z.string().uuid(),
});
/**
 * Schema for category creation
 */
export const CategoryCreateSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    icon: z.string().optional(),
    displayOrder: z.number().int().optional(),
    products: z.array(z.string().uuid()).optional(),
    variant: z.nativeEnum(CategoryVariant).optional(),
    slug: z.string().optional(),
    backgroundImages: z.array(ImageSchema).optional(),
});
/**
 * Schema for category updates
 */
export const CategoryUpdateSchema = CategoryBaseSchema.omit({
    id: true,
}).partial();
/**
 * Category request validation schemas
 */
export const GetCategoryRequestSchema = z.object({
    id: z.string().uuid(),
});
export const CreateCategoryRequestSchema = z.object({
    category: z.object({
        name: z.string().min(2).max(50),
        description: z.string().optional(),
        image: z.string().url().optional(),
        active: z.boolean().optional().default(true),
        order: z.number().int().optional(),
        metadata: z.record(z.string()).optional(),
    }),
});
export const UpdateCategoryRequestSchema = z.object({
    id: z.string().uuid(),
    category: z.object({
        name: z.string().min(2).max(50).optional(),
        description: z.string().optional(),
        image: z.string().url().optional(),
        active: z.boolean().optional(),
        order: z.number().int().optional(),
        metadata: z.record(z.string()).optional(),
    }),
});
export const DeleteCategoryRequestSchema = z.object({
    id: z.string().uuid(),
});
//# sourceMappingURL=category.schema.js.map