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

// Extend Express Request type to include user authentication data
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
 * @template T - The type of items in the data array
 * @property {T[]} data - Array of result items
 * @property {number} total - Total count of available items
 * @property {number} page - Current page number
 * @property {number} limit - Number of items per page
 * @property {number} pages - Total number of pages
 */
export interface PaginatedResponse<T = any> {
  data: T[];
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
 * Generic response for get operations
 * @interface GetResponse
 * @template T - The type of the retrieved entity
 * @property {T} data - The retrieved entity data
 */
export interface GetResponse<T = any> extends ApiResponse<T> {}

/**
 * Generic response for creation operations
 * @interface CreateResponse
 * @template T - The type of the created entity
 * @property {string} id - ID of the newly created entity
 * @property {T} data - The created entity data
 */
export interface CreateResponse<T = any> extends ApiResponse<T> {
  id: string;
}

/**
 * Generic response for update operations
 * @interface UpdateResponse
 * @template T - The type of the updated entity
 * @property {boolean} updated - Whether the update was successful
 * @property {T} data - The updated entity data
 */
export interface UpdateResponse<T = any> extends ApiResponse<T> {
  updated: boolean;
}

/**
 * Generic response for delete operations
 * @interface DeleteResponse
 * @template T - The type of the deleted entity
 * @property {boolean} deleted - Whether the deletion was successful
 */
export interface DeleteResponse<T = any> extends ApiResponse {
  deleted: boolean;
}
