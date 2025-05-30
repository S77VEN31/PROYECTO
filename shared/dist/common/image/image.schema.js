/**
 * @fileoverview Schemas for image-related types
 */
import { z } from "zod";
/**
 * Schema for Image representation
 */
export const ImageSchema = z.object({
    src: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().optional(),
});
//# sourceMappingURL=image.schema.js.map