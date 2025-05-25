/**
 * Type declarations for Category entities
 */

import { EntityBase, EntityMetadata } from "@shared/entities";
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
 * Complete category representation with unique identifier
 * @interface Category
 * @extends CategoryBase
 * @property {string} id - Unique identifier for the category
 */
export declare interface Category extends CategoryBase {
  id: string;
}

/**
 * Input type for category creation operations
 * @type CategoryCreate
 */
export declare type CategoryCreate = Omit<Partial<Category>, "id"> &
  Pick<EntityBase, "name" | "description">;

/**
 * Input type for category update operations
 * @type CategoryUpdate
 */
export declare type CategoryUpdate = Omit<Partial<Category>, "id">;

/**
 * @fileoverview Category API request and response type definitions
 */

import { IdParam, PaginationParams } from "@shared/common";
import { Category, CategoryCreate, CategoryUpdate } from "@shared/entities";

// GET /categories
export interface GetCategoriesRequest extends PaginationParams {
  search?: string;
}

export interface GetCategoriesResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

// GET /categories/:id
export interface GetCategoryRequest extends IdParam {}

export interface GetCategoryResponse {
  category: Category;
}

// POST /categories
export interface CreateCategoryRequest {
  category: CategoryCreate;
}

export interface CreateCategoryResponse {
  id: string;
  category: Category;
}

// PUT /categories/:id
export interface UpdateCategoryRequest extends IdParam {
  category: CategoryUpdate;
}

export interface UpdateCategoryResponse {
  updated: boolean;
  category: Category;
}

// DELETE /categories/:id
export interface DeleteCategoryRequest extends IdParam {}

export interface DeleteCategoryResponse {
  deleted: boolean;
}

// Express compatible request parameter types
export type GetCategoryRequestParams = {
  id: string;
};

export type UpdateCategoryRequestParams = {
  id: string;
};

export type DeleteCategoryRequestParams = {
  id: string;
};
