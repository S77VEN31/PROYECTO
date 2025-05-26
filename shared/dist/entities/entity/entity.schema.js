"use strict";
/**
 * Base entity schemas that define validation for all entity types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialMetadataSchema = exports.FullMetadataSchema = exports.EntityMetadataSchema = exports.EntityBaseSchema = void 0;
const common_1 = require("../../common");
const zod_1 = require("zod");
/**
 * Schema for basic entity properties
 */
exports.EntityBaseSchema = common_1.TimeStampsSchema.extend({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    active: zod_1.z.boolean().optional().default(true),
});
/**
 * Schema for entity metadata
 */
exports.EntityMetadataSchema = exports.EntityBaseSchema.extend({
    slug: zod_1.z.string().min(1),
    searchTerm: zod_1.z.string().optional(),
    backgroundImages: zod_1.z.array(common_1.ImageSchema).optional(),
});
/**
 * Schema for complete metadata including SEO properties
 */
exports.FullMetadataSchema = exports.EntityMetadataSchema.merge(common_1.SeoMetadataSchema);
/**
 * Schema for creating entities with partial metadata
 */
exports.PartialMetadataSchema = exports.EntityMetadataSchema.partial();
//# sourceMappingURL=entity.schema.js.map