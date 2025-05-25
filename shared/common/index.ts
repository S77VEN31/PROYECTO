/**
 * Common utility types and schemas
 *
 * @module shared/common
 */

/**
 * API related type definitions
 */
import {
  ApiResponse,
  AuthResponse,
  CategoryFilterOptions,
  CreateResponse,
  DeleteResponse,
  EntityResponse,
  IdParam,
  JwtPayload,
  PaginatedResponse,
  PaginationParams,
  ProductFilterOptions,
  PromotionFilterOptions,
  SearchableParams,
  UpdateResponse,
  UserFilterOptions,
} from "./api/api.d";

// Re-export API types
export {
  ApiResponse,
  AuthResponse,
  CategoryFilterOptions,
  CreateResponse,
  DeleteResponse,
  EntityResponse,
  IdParam,
  JwtPayload,
  PaginatedResponse,
  PaginationParams,
  ProductFilterOptions,
  PromotionFilterOptions,
  SearchableParams,
  UpdateResponse,
  UserFilterOptions,
};

/**
 * Financial data types and schemas
 */
import { Financial, PaymentFinancial } from "./financial/financial.d";

import {
  FinancialSchema,
  PaymentFinancialSchema,
} from "./financial/financial.schema";

// Re-export financial types
export { Financial, FinancialSchema, PaymentFinancial, PaymentFinancialSchema };

/**
 * Image related types and schemas
 */
import { Image } from "./image/image.d";
import { ImageSchema } from "./image/image.schema";

// Re-export image types
export { Image, ImageSchema };

/**
 * Metadata types and schemas
 */
import { SeoMetadata } from "./metadata/metadata.d";
import { SeoMetadataSchema } from "./metadata/metadata.schema";

// Re-export metadata types
export { SeoMetadata, SeoMetadataSchema };

/**
 * Timestamp types and schemas
 */
import {
  CompletableTimestamp,
  TimeStamps,
  TimestampField,
} from "./timestamp/timestamp.d";

import {
  CompletableTimestampSchema,
  TimeStampsSchema,
} from "./timestamp/timestamp.schema";

// Re-export timestamp types
export {
  CompletableTimestamp,
  CompletableTimestampSchema,
  TimeStamps,
  TimeStampsSchema,
  TimestampField,
};
