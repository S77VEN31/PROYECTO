/**
 * @fileoverview Schemas for metadata-related types
 */

import { SeoMetadata } from "@shared/common";
import { z } from "zod";

/**
 * Schema for SEO metadata
 */
export const SeoMetadataSchema = z.object({
  pageTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
}) satisfies z.ZodType<SeoMetadata>;
