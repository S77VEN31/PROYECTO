/**
 * Type declarations for Product entities
 */

import { EntityBase, EntityMetadata } from "@shared/entities";

/**
 * Dietary and nutritional information for food products
 * @interface NutritionalInfo
 * @property {number} [calories] - Caloric content of the product
 * @property {number} [protein] - Protein content in grams
 * @property {number} [carbs] - Carbohydrate content in grams
 * @property {number} [fat] - Fat content in grams
 * @property {string[]} [allergens] - List of potential allergens in the product
 */
export declare interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  allergens?: string[];
}

/**
 * Core product information with pricing and attributes
 * @interface ProductBase
 * @extends EntityMetadata
 * @property {number} price - Product price in the default currency
 * @property {string} [longDescription] - Detailed product description
 * @property {string[]} [tags] - Categorization tags for filtering and search
 * @property {NutritionalInfo} [nutritionalInfo] - Nutritional and dietary information
 * @property {number} [preparationTime] - Estimated preparation time in minutes
 */
export declare interface ProductBase extends EntityMetadata {
  price: number;
  longDescription?: string;
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
}

/**
 * Complete product representation with unique identifier
 * @interface Product
 * @extends ProductBase
 * @property {string} id - Unique identifier for the product
 */
export declare interface Product extends ProductBase {
  id: string;
}

/**
 * Input type for product creation operations
 * @type ProductCreate
 */
export declare type ProductCreate = Omit<Partial<Product>, "id"> &
  Pick<EntityBase, "name" | "description">;

/**
 * Input type for product update operations
 * @type ProductUpdate
 */
export declare type ProductUpdate = Omit<Partial<Product>, "id">;

/**
 * @fileoverview Product API request and response type definitions
 */

import { IdParam, PaginationParams } from "@shared/common";
import { Product, ProductCreate, ProductUpdate } from "@shared/entities";

// GET /products
export interface GetProductsRequest extends PaginationParams {
  category?: string;
  tag?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// GET /products/:id
export interface GetProductRequest extends IdParam {}

export interface GetProductResponse {
  product: Product;
}

// POST /products
export interface CreateProductRequest {
  product: ProductCreate;
}

export interface CreateProductResponse {
  id: string;
  product: Product;
}

// PUT /products/:id
export interface UpdateProductRequest extends IdParam {
  product: ProductUpdate;
}

export interface UpdateProductResponse {
  updated: boolean;
  product: Product;
}

// DELETE /products/:id
export interface DeleteProductRequest extends IdParam {}

export interface DeleteProductResponse {
  deleted: boolean;
}

// Express compatible request parameter types
export type GetProductRequestParams = {
  id: string;
};

export type UpdateProductRequestParams = {
  id: string;
};

export type DeleteProductRequestParams = {
  id: string;
};
