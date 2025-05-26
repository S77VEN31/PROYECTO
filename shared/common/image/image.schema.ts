/**
 * @fileoverview Schemas for image-related types
 */

import { z } from "zod";
import { Image } from "./image.d";

/**
 * Schema for Image representation
 */
export const ImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
}) satisfies z.ZodType<Image>;
