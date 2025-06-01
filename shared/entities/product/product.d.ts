/**
 * Type declarations for Product entities
 */

import { Image } from "@shared/common";
import { ClientEntity, DatabaseEntity, EntityMetadata } from "@shared/entities";

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
 * Complete product representation for client-side (API responses, frontend)
 * @interface Product
 * @extends ClientEntity<ProductBase>
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} description - Description of the product
 * @property {boolean} [active] - Whether the product is active
 * @property {string} slug - URL-friendly identifier
 * @property {string} [searchTerm] - Additional search keywords
 * @property {Image[]} [backgroundImages] - Background images for the product
 * @property {number} price - Product price
 * @property {string} [longDescription] - Detailed product description
 * @property {string[]} [tags] - Categorization tags
 * @property {NutritionalInfo} [nutritionalInfo] - Nutritional information
 * @property {number} [preparationTime] - Preparation time in minutes
 */
export declare interface Product extends ClientEntity<ProductBase> {
  // Explicit declaration of inherited properties for better type resolution
  // From EntityBase
  name: string;
  description: string;
  active?: boolean;
  // From EntityMetadata
  slug: string;
  searchTerm?: string;
  backgroundImages?: Image[];
  // From ProductBase
  price: number;
  longDescription?: string;
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
}

/**
 * Product representation for database operations (backend)
 * @interface ProductDocument
 * @extends DatabaseEntity<ProductBase>
 * @property {string} _id - MongoDB ObjectId as string
 */
export declare interface ProductDocument extends DatabaseEntity<ProductBase> {}

/**
 * Input type for product creation operations
 * @type ProductCreate
 */
export declare type ProductCreate = {
  // Required fields from EntityBase
  name: string;
  description: string;
  // Required product-specific fields
  price: number;
  // Optional product-specific fields
  longDescription?: string;
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
  // Optional EntityBase fields
  active?: boolean;
  // Optional EntityMetadata fields
  slug?: string;
  searchTerm?: string;
  backgroundImages?: Image[];
};

/**
 * Input type for product update operations
 * @type ProductUpdate
 */
export declare type ProductUpdate = Partial<{
  name: string;
  description: string;
  price: number;
  longDescription: string;
  tags: string[];
  nutritionalInfo: NutritionalInfo;
  preparationTime: number;
  active: boolean;
  slug: string;
  searchTerm: string;
  backgroundImages: Image[];
}>;

/**
 * @fileoverview Product API request and response type definitions
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
 * Product filter parameters
 * @interface ProductFilterParams
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {string} [category] - Filter by category
 * @property {string} [tag] - Filter by tag
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 */
export interface ProductFilterParams extends PaginationParams, SearchableParams {
  category?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
}

// GET /products
export interface GetProductsRequestParams extends ProductFilterParams {}

export interface GetProductsResponse
  extends ApiResponse<PaginatedResponse<Product>> {}

// GET /products/:id - params only
export interface GetProductRequestParams extends IdParam {}

export interface GetProductResponse extends GetResponse<Product> {}

// POST /products - body only (product data without nesting)
export interface CreateProductRequestBody extends ProductCreate {}

export interface CreateProductResponse extends CreateResponse<ProductCreate> {}

// PUT /products/:id - params + body
export interface UpdateProductRequestParams extends IdParam {}

export interface UpdateProductRequestBody extends ProductUpdate {}

export interface UpdateProductResponse extends UpdateResponse<ProductUpdate> {}

// DELETE /products/:id - params only
export interface DeleteProductRequestParams extends IdParam {}

export interface DeleteProductResponse extends DeleteResponse<Product> {}
