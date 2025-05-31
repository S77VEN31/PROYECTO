/**
 * Common API schemas
 * Validation schemas for shared API types
 */

import { z } from "zod";
import { IdParam } from "./api.d";

/**
 * Generic ID parameter schema
 * Used for validating route parameters that contain an ID
 */
export const IdParamSchema = z.object({
  id: z.string().min(1),
}) satisfies z.ZodType<IdParam>;

/**
 * Pagination parameters schema
 */
export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

/**
 * Search parameters schema
 */
export const SearchableParamsSchema = z.object({
  search: z.string().optional(),
});
