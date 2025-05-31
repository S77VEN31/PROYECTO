/**
 * Local Product Types
 * Temporary solution while shared module compilation issues are resolved
 */

/**
 * Nutritional information for a product
 */
export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  allergens?: string[];
}

/**
 * Product entity
 */
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Product creation request
 */
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
}

/**
 * Product update request
 */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
}

/**
 * Get products request parameters
 */
export interface GetProductsRequest {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
}

/**
 * Get products response
 */
export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Create product request body
 */
export interface CreateProductRequestBody {
  product: ProductCreate;
}

/**
 * Update product request body
 */
export interface UpdateProductRequestBody {
  id: string;
  product: ProductUpdate;
}

/**
 * Product ID parameter
 */
export interface ProductIdParam {
  id: string;
} 
 * Local Product Types
 * Temporary solution while shared module compilation issues are resolved
 */

/**
 * Nutritional information for a product
 */
export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  allergens?: string[];
}

/**
 * Product entity
 */
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Product creation request
 */
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
}

/**
 * Product update request
 */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  preparationTime?: number;
  nutritionalInfo?: NutritionalInfo;
  active?: boolean;
}

/**
 * Get products request parameters
 */
export interface GetProductsRequest {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  active?: boolean;
}

/**
 * Get products response
 */
export interface GetProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Create product request body
 */
export interface CreateProductRequestBody {
  product: ProductCreate;
}

/**
 * Update product request body
 */
export interface UpdateProductRequestBody {
  id: string;
  product: ProductUpdate;
}

/**
 * Product ID parameter
 */
export interface ProductIdParam {
  id: string;
} 