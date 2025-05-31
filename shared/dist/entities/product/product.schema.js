/**
 * Schemas for Product entities
 */
import { ImageSchema, MongoIdSchema } from "../../common";
import { EntityMetadataSchema, } from "../../entities";
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
});
/**
 * Schema for core product information
 */
export const ProductBaseSchema = EntityMetadataSchema.extend({
    price: z.number().positive(),
    longDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    nutritionalInfo: NutritionalInfoSchema.optional(),
    preparationTime: z.number().nonnegative().optional(),
});
/**
 * Schema for complete product representation
 */
export const ProductSchema = ProductBaseSchema.extend({
    id: MongoIdSchema,
});
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
});
/**
 * Schema for product updates
 */
export const ProductUpdateSchema = ProductBaseSchema.omit({
    id: true,
}).partial();
/**
 * Product request validation schemas
 */
export const GetProductRequestSchema = z.object({
    id: MongoIdSchema,
});
export const CreateProductRequestSchema = z.object({
    product: z.object({
        name: z.string().min(2).max(100),
        description: z.string().min(1),
        price: z.number().positive(),
        longDescription: z.string().optional(),
        tags: z.array(z.string()).optional(),
        nutritionalInfo: NutritionalInfoSchema.optional(),
        category: MongoIdSchema.optional(),
        preparationTime: z.number().int().positive().optional(),
        images: z.array(z.string().url()).optional(),
        active: z.boolean().optional().default(true),
    }),
});
export const UpdateProductRequestSchema = z.object({
    id: MongoIdSchema,
    product: z.object({
        name: z.string().min(2).max(100).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        longDescription: z.string().optional(),
        tags: z.array(z.string()).optional(),
        nutritionalInfo: NutritionalInfoSchema.optional(),
        category: MongoIdSchema.optional(),
        preparationTime: z.number().int().positive().optional(),
        images: z.array(z.string().url()).optional(),
        active: z.boolean().optional(),
    }),
});
export const DeleteProductRequestSchema = z.object({
    id: MongoIdSchema,
});
//# sourceMappingURL=product.schema.js.map