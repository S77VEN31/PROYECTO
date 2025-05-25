/**
 * @fileoverview Common API request and response types
 * Provides standardized interfaces for API communication
 */

import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

/**
 * Extended JWT Payload with user ID
 * @interface JwtPayload
 * @extends BaseJwtPayload
 * @property {string} id - User identifier
 */
export interface JwtPayload extends BaseJwtPayload {
  id: string;
  userId: string;
  email: string;
  role: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Generic base interface for all API responses
 * @interface ApiResponse
 * @template T - The type of data returned in the response
 * @property {boolean} success - Indicates if the request was successful
 * @property {T} [data] - The response data (present on successful requests)
 * @property {string} [message] - A human-readable message about the result
 * @property {string} [error] - Error message (present on failed requests)
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Generic paginated response for list endpoints
 * @interface PaginatedResponse
 * @template T - The type of items in the results array
 * @property {T[]} results - Array of result items
 * @property {number} total - Total count of available items
 * @property {number} page - Current page number
 * @property {number} limit - Number of items per page
 * @property {number} pages - Total number of pages
 */
export interface PaginatedResponse<T = any> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Common pagination query parameters
 * @interface PaginationParams
 * @property {number} [page=1] - Page number (1-indexed)
 * @property {number} [limit=10] - Number of items per page
 * @property {string} [sortBy] - Field to sort by
 * @property {'asc'|'desc'} [sortOrder='asc'] - Sort direction
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Common search parameter
 * @interface SearchableParams
 * @property {string} [search] - Search term to filter results
 */
export interface SearchableParams {
  search?: string;
}

/**
 * Category filter options
 * @interface CategoryFilterOptions
 * @extends PaginationParams
 * @extends SearchableParams
 */
export interface CategoryFilterOptions
  extends PaginationParams,
    SearchableParams {}

/**
 * Product filter options
 * @interface ProductFilterOptions
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {string} [category] - Filter by category ID
 * @property {string} [tag] - Filter by tag
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 */
export interface ProductFilterOptions
  extends PaginationParams,
    SearchableParams {
  category?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Promotion filter options
 * @interface PromotionFilterOptions
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {boolean} [active] - Filter by active status
 * @property {string} [type] - Filter by promotion type
 */
export interface PromotionFilterOptions
  extends PaginationParams,
    SearchableParams {
  active?: boolean;
  type?: string;
}

/**
 * User filter options
 * @interface UserFilterOptions
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {string} [role] - Filter by user role
 */
export interface UserFilterOptions extends PaginationParams, SearchableParams {
  role?: string;
}

/**
 * Authentication response
 * @interface AuthResponse
 * @template T - The user entity type
 * @property {T} user - The authenticated user
 * @property {string} token - JWT authentication token
 */
export interface AuthResponse<T = any> {
  user: T;
  token: string;
}

/**
 * Generic ID parameter interface
 * @interface IdParam
 * @property {string} id - Entity identifier
 */
export interface IdParam {
  id: string;
}

/**
 * Generic response for endpoints that return a single entity
 * @interface EntityResponse
 * @template T - The entity type
 * @property {T} entity - The returned entity
 */
export interface EntityResponse<T = any> {
  entity: T;
}

/**
 * Generic response for creation operations
 * @interface CreateResponse
 * @property {string} id - ID of the newly created entity
 */
export interface CreateResponse {
  id: string;
}

/**
 * Generic response for update operations
 * @interface UpdateResponse
 * @property {boolean} updated - Whether the update was successful
 */
export interface UpdateResponse {
  updated: boolean;
}

/**
 * Generic response for delete operations
 * @interface DeleteResponse
 * @property {boolean} deleted - Whether the deletion was successful
 */
export interface DeleteResponse {
  deleted: boolean;
}
