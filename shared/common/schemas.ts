/**
 * Common validation schemas
 * Shared schemas used across different entities
 */

import { z } from "zod";

/**
 * Schema for MongoDB ObjectId validation
 * Validates 24-character hexadecimal strings (MongoDB ObjectId format)
 */
export const MongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

/**
 * Schema for optional MongoDB ObjectId validation
 */
export const OptionalMongoIdSchema = MongoIdSchema.optional();

/**
 * Schema for arrays of MongoDB ObjectIds
 */
export const MongoIdArraySchema = z.array(MongoIdSchema);

/**
 * Schema for optional arrays of MongoDB ObjectIds
 */
export const OptionalMongoIdArraySchema = MongoIdArraySchema.optional(); 