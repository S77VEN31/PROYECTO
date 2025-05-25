/**
 * @fileoverview Schemas for image-related types
 */
import { z } from "zod";
/**
 * Schema for Image representation
 */
export declare const ImageSchema: z.ZodObject<{
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    src: string;
    alt?: string | undefined;
    isPrimary?: boolean | undefined;
}, {
    src: string;
    alt?: string | undefined;
    isPrimary?: boolean | undefined;
}>;
