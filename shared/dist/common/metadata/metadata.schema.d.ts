/**
 * @fileoverview Schemas for metadata-related types
 */
import { z } from "zod";
/**
 * Schema for SEO metadata
 */
export declare const SeoMetadataSchema: z.ZodObject<{
    pageTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    pageTitle?: string | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
}, {
    pageTitle?: string | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
}>;
