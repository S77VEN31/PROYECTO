"use strict";
/**
 * @fileoverview Schemas for timestamp-related types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletableTimestampSchema = exports.TimestampFieldSchema = exports.TimeStampsSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for timestamp fields present in all entities
 */
exports.TimeStampsSchema = zod_1.z.object({
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
/**
 * Schema for timestamp field
 */
exports.TimestampFieldSchema = zod_1.z.union([
    zod_1.z.string().datetime(),
    zod_1.z.date(),
]);
/**
 * Schema for entities that track completion time
 */
exports.CompletableTimestampSchema = zod_1.z.object({
    completedAt: zod_1.z.string().datetime().nullable().optional(),
});
//# sourceMappingURL=timestamp.schema.js.map