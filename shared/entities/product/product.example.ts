/**
 * @fileoverview Example usage of Product types
 * Demonstrates data modeling with product objects
 */

import {
  GetProductsRequestParams,
  NutritionalInfo,
  Product,
  ProductCreate,
  ProductUpdate,
} from "@shared/entities";

/**
 * Example of a nutritional information model
 */
const nutritionalInfoModel: NutritionalInfo = {
  calories: 5,
  protein: 0.1,
  carbs: 1.5,
  fat: 0,
  allergens: [],
};

/**
 * Example of a product creation model
 */
const newProductModel: ProductCreate = {
  name: "Espresso",
  description: "Single shot of our signature espresso blend",
  price: 3.5,
  longDescription:
    "Our signature espresso is crafted from a blend of ethically sourced beans, roasted to perfection to bring out rich chocolate and caramel notes.",
  tags: ["coffee", "espresso", "hot"],
  nutritionalInfo: nutritionalInfoModel,
  preparationTime: 3,
};

/**
 * Example of a complete product model as stored in the database
 */
const productModel = {
  id: "prod-001",
  // EntityBase fields
  name: "Espresso",
  description: "Single shot of our signature espresso blend",
  active: true,
  createdAt: "2023-08-15T10:00:00Z",
  updatedAt: "2023-08-15T10:00:00Z",
  // EntityMetadata fields
  slug: "espresso",
  searchTerm: "espresso coffee shot hot",
  // ProductBase specific fields
  price: 3.5,
  longDescription:
    "Our signature espresso is crafted from a blend of ethically sourced beans, roasted to perfection to bring out rich chocolate and caramel notes.",
  tags: ["coffee", "espresso", "hot"],
  nutritionalInfo: nutritionalInfoModel,
  preparationTime: 3,
} as Product;

/**
 * Example of a product update model
 */
const productUpdateModel: ProductUpdate = {
  price: 4.0,
};

/**
 * Example of a product with minimal properties
 */
const minimalProductModel: ProductCreate = {
  name: "Filtered Coffee",
  description: "House blend filtered coffee",
  price: 2.5,
};

/**
 * Example of filtering products by category
 * This will return all products that belong to the specified category
 */
const getProductsByCategoryExample: GetProductsRequestParams = {
  category: "cat-001", // Category ID
  page: 1,
  limit: 20,
};

/**
 * Example of filtering products with multiple parameters
 * This combines category filtering with other filters
 */
const getProductsWithFiltersExample: GetProductsRequestParams = {
  category: "cat-001", // Category ID
  search: "coffee",
  minPrice: 2.0,
  maxPrice: 10.0,
  tag: "hot",
  page: 1,
  limit: 10,
};

/**
 * Example of getting all products without category filter
 */
const getAllProductsExample: GetProductsRequestParams = {
  page: 1,
  limit: 50,
};

export {
  getAllProductsExample,
  getProductsByCategoryExample,
  getProductsWithFiltersExample,
  minimalProductModel,
  newProductModel,
  nutritionalInfoModel,
  productModel,
  productUpdateModel,
};

