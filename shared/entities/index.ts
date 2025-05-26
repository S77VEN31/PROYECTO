/**
 * Entity type definitions and schemas
 *
 * @module shared/entities
 */

/**
 * Base entity types
 */
import {
  EntityBase,
  EntityMetadata,
  FullMetadata,
  PartialMetadata,
} from "./entity/entity.d";

import {
  EntityBaseSchema,
  EntityMetadataSchema,
  FullMetadataSchema,
  PartialMetadataSchema,
} from "./entity/entity.schema";

// Re-export base entity types
export {
  EntityBase,
  // Schemas
  EntityBaseSchema,
  EntityMetadata,
  EntityMetadataSchema,
  FullMetadata,
  FullMetadataSchema,
  PartialMetadata,
  PartialMetadataSchema,
};

/**
 * Category entity types and schemas
 */
import {
  Category,
  CategoryBase,
  CategoryCreate,
  CategoryUpdate,
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryRequestParams,
  DeleteCategoryResponse,
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryRequest,
  GetCategoryRequestParams,
  GetCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryRequestParams,
  UpdateCategoryResponse,
} from "./category/category.d";

import {
  CategoryBaseSchema,
  CategoryCreateSchema,
  CategorySchema,
  CategoryUpdateSchema,
  CreateCategoryRequestSchema,
  DeleteCategoryRequestSchema,
  GetCategoryRequestSchema,
  UpdateCategoryRequestSchema,
} from "./category/category.schema";

// Re-export category types
export {
  // Category types
  Category,
  CategoryBase,
  // Category schemas
  CategoryBaseSchema,
  CategoryCreate,
  CategoryCreateSchema,
  CategorySchema,
  CategoryUpdate,
  CategoryUpdateSchema,
  CreateCategoryRequest,
  // Request validation schemas
  CreateCategoryRequestSchema,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryRequestParams,
  DeleteCategoryRequestSchema,
  DeleteCategoryResponse,
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetCategoryRequest,
  GetCategoryRequestParams,
  GetCategoryRequestSchema,
  GetCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryRequestParams,
  UpdateCategoryRequestSchema,
  UpdateCategoryResponse,
};

/**
 * Product entity types and schemas
 */
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductRequestParams,
  DeleteProductResponse,
  GetProductRequest,
  GetProductRequestParams,
  GetProductResponse,
  GetProductsRequest,
  GetProductsResponse,
  NutritionalInfo,
  Product,
  ProductBase,
  ProductCreate,
  ProductUpdate,
  UpdateProductRequest,
  UpdateProductRequestParams,
  UpdateProductResponse,
} from "./product/product.d";

import {
  CreateProductRequestSchema,
  DeleteProductRequestSchema,
  GetProductRequestSchema,
  NutritionalInfoSchema,
  ProductBaseSchema,
  ProductCreateSchema,
  ProductSchema,
  ProductUpdateSchema,
  UpdateProductRequestSchema,
} from "./product/product.schema";

// Re-export product types
export {
  // Product types
  CreateProductRequest,
  // Request validation schemas
  CreateProductRequestSchema,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductRequestParams,
  DeleteProductRequestSchema,
  DeleteProductResponse,
  GetProductRequest,
  GetProductRequestParams,
  GetProductRequestSchema,
  GetProductResponse,
  GetProductsRequest,
  GetProductsResponse,
  NutritionalInfo,
  // Product schemas
  NutritionalInfoSchema,
  Product,
  ProductBase,
  ProductBaseSchema,
  ProductCreate,
  ProductCreateSchema,
  ProductSchema,
  ProductUpdate,
  ProductUpdateSchema,
  UpdateProductRequest,
  UpdateProductRequestParams,
  UpdateProductRequestSchema,
  UpdateProductResponse,
};

/**
 * Promotion entity types and schemas
 */
import {
  CreatePromotionRequest,
  CreatePromotionResponse,
  DeletePromotionRequest,
  DeletePromotionRequestParams,
  DeletePromotionResponse,
  GetPromotionRequest,
  GetPromotionRequestParams,
  GetPromotionResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  Promotion,
  PromotionBase,
  PromotionCreate,
  PromotionUpdate,
  UpdatePromotionRequest,
  UpdatePromotionRequestParams,
  UpdatePromotionResponse,
} from "./promotion/promotion.d";

import {
  CreatePromotionRequestSchema,
  DeletePromotionRequestSchema,
  GetPromotionRequestSchema,
  PromotionBaseSchema,
  PromotionCreateSchema,
  PromotionSchema,
  PromotionUpdateSchema,
  UpdatePromotionRequestSchema,
} from "./promotion/promotion.schema";

// Re-export promotion types
export {
  // Promotion types
  CreatePromotionRequest,
  // Request validation schemas
  CreatePromotionRequestSchema,
  CreatePromotionResponse,
  DeletePromotionRequest,
  DeletePromotionRequestParams,
  DeletePromotionRequestSchema,
  DeletePromotionResponse,
  GetPromotionRequest,
  GetPromotionRequestParams,
  GetPromotionRequestSchema,
  GetPromotionResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  Promotion,
  PromotionBase,
  // Promotion schemas
  PromotionBaseSchema,
  PromotionCreate,
  PromotionCreateSchema,
  PromotionSchema,
  PromotionUpdate,
  PromotionUpdateSchema,
  UpdatePromotionRequest,
  UpdatePromotionRequestParams,
  UpdatePromotionRequestSchema,
  UpdatePromotionResponse,
};

/**
 * User entity types and schemas
 */
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserRequestParams,
  DeleteUserResponse,
  GetUserRequest,
  GetUserRequestParams,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  UpdateUserRequest,
  UpdateUserRequestParams,
  UpdateUserResponse,
  User,
  UserBase,
  UserCreate,
  UserUpdate,
} from "./user/user.d";

import {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  LoginRequestSchema,
  UpdateUserRequestSchema,
  UserBaseSchema,
  UserCreateSchema,
  UserSchema,
  UserUpdateSchema,
} from "./user/user.schema";

// Re-export user types
export {
  // User types
  CreateUserRequest,
  // Request validation schemas
  CreateUserRequestSchema,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserRequestParams,
  DeleteUserRequestSchema,
  DeleteUserResponse,
  GetUserRequest,
  GetUserRequestParams,
  GetUserRequestSchema,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  LoginRequest,
  LoginRequestSchema,
  LoginResponse,
  LogoutResponse,
  UpdateUserRequest,
  UpdateUserRequestParams,
  UpdateUserRequestSchema,
  UpdateUserResponse,
  User,
  UserBase,
  // User schemas
  UserBaseSchema,
  UserCreate,
  UserCreateSchema,
  UserSchema,
  UserUpdate,
  UserUpdateSchema,
};

