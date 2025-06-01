/**
 * Entity type definitions and schemas
 *
 * @module shared/entities
 */

/**
 * Base entity types
 */
import {
  ClientEntity,
  DatabaseEntity,
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
  ClientEntity,
  DatabaseEntity,
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
  CategoryDocument,
  CategoryFilterParams,
  CategoryUpdate,
  CreateCategoryRequestBody,
  CreateCategoryResponse,
  DeleteCategoryRequestParams,
  DeleteCategoryResponse,
  GetCategoriesRequestParams,
  GetCategoriesResponse,
  GetCategoryRequestParams,
  GetCategoryResponse,
  UpdateCategoryRequestBody,
  UpdateCategoryRequestParams,
  UpdateCategoryResponse,
} from "./category/category.d";

  import {
    CategoryBaseSchema,
    CategoryCreateSchema,
    CategoryFilterParamsSchema,
    CategorySchema,
    CategoryUpdateSchema,
    CreateCategoryRequestBodySchema,
    DeleteCategoryRequestParamsSchema,
    GetCategoriesRequestParamsSchema,
    GetCategoryRequestParamsSchema,
    UpdateCategoryRequestBodySchema,
    UpdateCategoryRequestParamsSchema,
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
    CategoryDocument,
    CategoryFilterParams,
    CategoryFilterParamsSchema,
    CategorySchema,
    CategoryUpdate,
    CategoryUpdateSchema,
    // Request/Response types
    CreateCategoryRequestBody,
    CreateCategoryRequestBodySchema,
    CreateCategoryResponse,
    DeleteCategoryRequestParams,
    DeleteCategoryRequestParamsSchema,
    DeleteCategoryResponse,
    GetCategoriesRequestParams,
    GetCategoriesRequestParamsSchema,
    GetCategoriesResponse,
    GetCategoryRequestParams,
    GetCategoryRequestParamsSchema,
    GetCategoryResponse,
    UpdateCategoryRequestBody,
    UpdateCategoryRequestBodySchema,
    UpdateCategoryRequestParams,
    UpdateCategoryRequestParamsSchema,
    UpdateCategoryResponse,
  };

  /**
   * Product entity types and schemas
   */
  import {
    CreateProductRequestBody,
    CreateProductResponse,
    DeleteProductRequestParams,
    DeleteProductResponse,
    GetProductRequestParams,
    GetProductResponse,
    GetProductsRequestParams,
    GetProductsResponse,
    NutritionalInfo,
    Product,
    ProductBase,
    ProductCreate,
    ProductDocument,
    ProductFilterParams,
    ProductUpdate,
    UpdateProductRequestBody,
    UpdateProductRequestParams,
    UpdateProductResponse,
  } from "./product/product.d";

  import {
    CreateProductRequestBodySchema,
    DeleteProductRequestParamsSchema,
    GetProductRequestParamsSchema,
    GetProductsRequestParamsSchema,
    NutritionalInfoSchema,
    ProductBaseSchema,
    ProductCreateSchema,
    ProductSchema,
    ProductUpdateSchema,
    UpdateProductRequestBodySchema,
    UpdateProductRequestParamsSchema,
  } from "./product/product.schema";

  // Re-export product types
  export {
    // Request/Response types
    CreateProductRequestBody,
    CreateProductRequestBodySchema,
    CreateProductResponse,
    DeleteProductRequestParams,
    DeleteProductRequestParamsSchema,
    DeleteProductResponse,
    GetProductRequestParams,
    GetProductRequestParamsSchema,
    GetProductResponse,
    GetProductsRequestParams,
    GetProductsRequestParamsSchema,
    GetProductsResponse,
    // Product types
    NutritionalInfo,
    // Product schemas
    NutritionalInfoSchema,
    Product,
    ProductBase,
    ProductBaseSchema,
    ProductCreate,
    ProductCreateSchema,
    ProductDocument,
    ProductFilterParams,
    ProductSchema,
    ProductUpdate,
    ProductUpdateSchema,
    UpdateProductRequestBody,
    UpdateProductRequestBodySchema,
    UpdateProductRequestParams,
    UpdateProductRequestParamsSchema,
    UpdateProductResponse,
  };

  /**
   * Promotion entity types and schemas
   */
  import {
    CreatePromotionRequestBody,
    CreatePromotionResponse,
    DeletePromotionRequestParams,
    DeletePromotionResponse,
    GetPromotionRequestParams,
    GetPromotionResponse,
    GetPromotionsRequestParams,
    GetPromotionsResponse,
    Promotion,
    PromotionBase,
    PromotionCreate,
    PromotionDocument,
    PromotionFilterParams,
    PromotionUpdate,
    UpdatePromotionRequestBody,
    UpdatePromotionRequestParams,
    UpdatePromotionResponse,
  } from "./promotion/promotion.d";

  import {
    CreatePromotionRequestBodySchema,
    DeletePromotionRequestParamsSchema,
    GetPromotionRequestParamsSchema,
    GetPromotionsRequestParamsSchema,
    PromotionBaseSchema,
    PromotionCreateSchema,
    PromotionSchema,
    PromotionUpdateSchema,
    UpdatePromotionRequestBodySchema,
    UpdatePromotionRequestParamsSchema,
  } from "./promotion/promotion.schema";

  // Re-export promotion types
  export {
    // Request/Response types
    CreatePromotionRequestBody,
    CreatePromotionRequestBodySchema,
    CreatePromotionResponse,
    DeletePromotionRequestParams,
    DeletePromotionRequestParamsSchema,
    DeletePromotionResponse,
    GetPromotionRequestParams,
    GetPromotionRequestParamsSchema,
    GetPromotionResponse,
    GetPromotionsRequestParams,
    GetPromotionsRequestParamsSchema,
    GetPromotionsResponse,
    // Promotion types
    Promotion,
    PromotionBase,
    // Promotion schemas
    PromotionBaseSchema,
    PromotionCreate,
    PromotionCreateSchema,
    PromotionDocument,
    PromotionFilterParams,
    PromotionSchema,
    PromotionUpdate,
    PromotionUpdateSchema,
    UpdatePromotionRequestBody,
    UpdatePromotionRequestBodySchema,
    UpdatePromotionRequestParams,
    UpdatePromotionRequestParamsSchema,
    UpdatePromotionResponse,
  };

  /**
   * User entity types and schemas
   */
  import {
    CreateUserRequestBody,
    CreateUserResponse,
    DeleteUserRequestParams,
    DeleteUserResponse,
    GetUserRequestParams,
    GetUserResponse,
    GetUsersRequestParams,
    GetUsersResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    UpdateUserRequestBody,
    UpdateUserRequestParams,
    UpdateUserResponse,
    User,
    UserBase,
    UserCreate,
    UserDocument,
    UserFilterParams,
    UserUpdate,
  } from "./user/user.d";

  import {
    CreateUserRequestBodySchema,
    DeleteUserRequestParamsSchema,
    GetUserRequestParamsSchema,
    GetUsersRequestParamsSchema,
    LoginRequestSchema,
    UpdateUserRequestBodySchema,
    UpdateUserRequestParamsSchema,
    UserBaseSchema,
    UserCreateSchema,
    UserSchema,
    UserUpdateSchema,
  } from "./user/user.schema";

  // Re-export user types
  export {
    // Request/Response types
    CreateUserRequestBody,
    CreateUserRequestBodySchema,
    CreateUserResponse,
    DeleteUserRequestParams,
    DeleteUserRequestParamsSchema,
    DeleteUserResponse,
    GetUserRequestParams,
    GetUserRequestParamsSchema,
    GetUserResponse,
    GetUsersRequestParams,
    GetUsersRequestParamsSchema,
    GetUsersResponse,
    LoginRequest,
    LoginRequestSchema,
    LoginResponse,
    LogoutResponse,
    UpdateUserRequestBody,
    UpdateUserRequestBodySchema,
    UpdateUserRequestParams,
    UpdateUserRequestParamsSchema,
    UpdateUserResponse,
    // User types
    User,
    UserBase,
    // User schemas
    UserBaseSchema,
    UserCreate,
    UserCreateSchema,
    UserDocument,
    UserFilterParams,
    UserSchema,
    UserUpdate,
    UserUpdateSchema,
  };

