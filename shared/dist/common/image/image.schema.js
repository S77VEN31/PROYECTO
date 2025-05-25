"use strict";
/**
 * @fileoverview Schemas for image-related types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for Image representation
 */
exports.ImageSchema = zod_1.z.object({
    src: zod_1.z.string().url(),
    alt: zod_1.z.string().optional(),
    isPrimary: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=image.schema.js.map