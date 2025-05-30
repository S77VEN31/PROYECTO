/**
 * Base entity schemas that define validation for all entity types
 */
import { ImageSchema, SeoMetadataSchema, TimeStampsSchema, } from "../../common";
import { z } from "zod";
/**
 * Schema for basic entity properties
 */
export const EntityBaseSchema = TimeStampsSchema.extend({
    id: z.string().uuid().optional(),
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    active: z.boolean().optional().default(true),
});
/**
 * Schema for entity metadata
 */
export const EntityMetadataSchema = EntityBaseSchema.extend({
    slug: z.string().min(1),
    searchTerm: z.string().optional(),
    backgroundImages: z.array(ImageSchema).optional(),
});
/**
 * Schema for complete metadata including SEO properties
 */
export const FullMetadataSchema = EntityMetadataSchema.merge(SeoMetadataSchema);
/**
 * Schema for creating entities with partial metadata
 */
export const PartialMetadataSchema = EntityMetadataSchema.partial();
//# sourceMappingURL=entity.schema.js.map