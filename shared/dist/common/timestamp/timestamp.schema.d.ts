/**
 * @fileoverview Schemas for timestamp-related types
 */
import { z } from "zod";
/**
 * Schema for timestamp fields present in all entities
 */
export declare const TimeStampsSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
}, {
    createdAt: string;
    updatedAt: string;
}>;
/**
 * Schema for timestamp field
 */
export declare const TimestampFieldSchema: z.ZodUnion<[z.ZodString, z.ZodDate]>;
/**
 * Schema for entities that track completion time
 */
export declare const CompletableTimestampSchema: z.ZodObject<{
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    completedAt?: string | null | undefined;
}, {
    completedAt?: string | null | undefined;
}>;
//# sourceMappingURL=timestamp.schema.d.ts.map