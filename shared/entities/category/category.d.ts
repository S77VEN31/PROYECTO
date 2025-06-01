/**
 * Type declarations for Category entities
 */

import { Image } from "@shared/common";
import { ClientEntity, DatabaseEntity, EntityMetadata } from "@shared/entities";
import { CategoryVariant } from "@shared/enums";

/**
 * Core properties for menu category entities
 * @interface CategoryBase
 * @extends EntityMetadata
 * @property {string} icon - Icon identifier or path for visual representation
 * @property {number} displayOrder - Order in which category should be displayed
 * @property {string[]} products - Array of product IDs belonging to this category
 * @property {CategoryVariant} variant - Visual styling variant for the category
 */
export declare interface CategoryBase extends EntityMetadata {
  icon: string;
  displayOrder: number;
  products: string[];
  variant: CategoryVariant;
}

/**
 * Complete category representation for client-side (API responses, frontend)
 * @interface Category
 * @extends ClientEntity<CategoryBase>
 * @property {string} id - Unique identifier for the category
 */
export declare interface Category extends ClientEntity<CategoryBase> {}

/**
 * Category representation for database operations (backend)
 * @interface CategoryDocument
 * @extends DatabaseEntity<CategoryBase>
 * @property {string} _id - MongoDB ObjectId as string
 */
export declare interface CategoryDocument
  extends DatabaseEntity<CategoryBase> {}

/**
 * Input type for category creation operations
 * @type CategoryCreate
 */
export declare type CategoryCreate = {
  // Required fields from EntityBase
  name: string;
  description: string;
  // Required category-specific fields
  icon: string;
  variant: CategoryVariant;
  // Optional category-specific fields
  displayOrder?: number;
  products?: string[];
  // Optional EntityBase fields
  active?: boolean;
  // Optional EntityMetadata fields
  slug?: string;
  searchTerm?: string;
  backgroundImages?: Image[];
};

/**
 * Input type for category update operations
 * @type CategoryUpdate
 */
export declare type CategoryUpdate = Partial<{
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
  products: string[];
  variant: CategoryVariant;
}>;

/**
 * @fileoverview Category API request and response type definitions
 */

import {
  ApiResponse,
  CreateResponse,
  DeleteResponse,
  GetResponse,
  IdParam,
  PaginatedResponse,
  PaginationParams,
  SearchableParams,
  UpdateResponse,
} from "@shared/common";

/**
 * Category filter parameters
 * @interface CategoryFilterParams
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {string} [variant] - Filter by category variant
 */
export interface CategoryFilterParams
  extends PaginationParams,
    SearchableParams {
  variant?: string;
}

// GET /categories
export interface GetCategoriesRequestParams extends CategoryFilterParams {}

export interface GetCategoriesResponse
  extends ApiResponse<PaginatedResponse<Category>> {}

// GET /categories/:id - params only
export interface GetCategoryRequestParams extends IdParam {}

export interface GetCategoryResponse extends GetResponse<Category> {}

// POST /categories - body only (category data without nesting)
export interface CreateCategoryRequestBody extends CategoryCreate {}

export interface CreateCategoryResponse
  extends CreateResponse<CategoryCreate> {}

// PUT /categories/:id - params + body
export interface UpdateCategoryRequestParams extends IdParam {}

export interface UpdateCategoryRequestBody extends CategoryUpdate {}

export interface UpdateCategoryResponse
  extends UpdateResponse<CategoryUpdate> {}

// DELETE /categories/:id - params only
export interface DeleteCategoryRequestParams extends IdParam {}

export interface DeleteCategoryResponse extends DeleteResponse<Category> {}
