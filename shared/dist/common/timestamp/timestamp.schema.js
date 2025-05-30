/**
 * @fileoverview Schemas for timestamp-related types
 */
import { z } from "zod";
/**
 * Schema for timestamp fields present in all entities
 */
export const TimeStampsSchema = z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
/**
 * Schema for timestamp field
 */
export const TimestampFieldSchema = z.union([
    z.string().datetime(),
    z.date(),
]);
/**
 * Schema for entities that track completion time
 */
export const CompletableTimestampSchema = z.object({
    completedAt: z.string().datetime().nullable().optional(),
});
//# sourceMappingURL=timestamp.schema.js.map