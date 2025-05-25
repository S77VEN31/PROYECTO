"use strict";
/**
 * @fileoverview Schemas for metadata-related types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoMetadataSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for SEO metadata
 */
exports.SeoMetadataSchema = zod_1.z.object({
    pageTitle: zod_1.z.string().max(60).optional(),
    metaDescription: zod_1.z.string().max(160).optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
});
//# sourceMappingURL=metadata.schema.js.map