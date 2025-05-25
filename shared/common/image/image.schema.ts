/**
 * @fileoverview Schemas for image-related types
 */

import { Image } from "@shared/common";
import { z } from "zod";

/**
 * Schema for Image representation
 */
export const ImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().optional(),
  isPrimary: z.boolean().optional(),
}) satisfies z.ZodType<Image>;
