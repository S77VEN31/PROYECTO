/**
 * @fileoverview Schemas for timestamp-related types
 */

import { z } from "zod";
import {
  CompletableTimestamp,
  TimeStamps,
  TimestampField,
} from "./timestamp.d";

/**
 * Schema for timestamp fields present in all entities
 */
export const TimeStampsSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<TimeStamps>;

/**
 * Schema for timestamp field
 */
export const TimestampFieldSchema = z.union([
  z.string().datetime(),
  z.date(),
]) satisfies z.ZodType<TimestampField>;

/**
 * Schema for entities that track completion time
 */
export const CompletableTimestampSchema = z.object({
  completedAt: z.string().datetime().nullable().optional(),
}) satisfies z.ZodType<CompletableTimestamp>;
