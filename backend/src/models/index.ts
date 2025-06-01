/**
 * Model exports
 * Re-exports all models for easier imports throughout the application
 *
 * @module models
 */

// Entity models
import CategoryModel, { CategoryDocument } from "./entities/category.model";
import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "./entities/entity.model";
import { ProductDocument, ProductModel } from "./entities/product.model";
import PromotionModel, { PromotionDocument } from "./entities/promotion.model";
import UserModel, { UserDocument } from "./entities/user.model";

// Transaction models
import EventModel from "./transactions/event.model";
import OrderModel from "./transactions/order.model";
import {
  ITransactionDocument,
  baseTransactionSchemaFields,
  baseTransactionSchemaOptions,
} from "./transactions/transaction.model";

// Entity model exports
export {
  CategoryModel,
  ProductModel,
  PromotionModel,
  UserModel,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
};

// Entity document type exports
export type {
  CategoryDocument,
  IBaseDocument,
  ProductDocument,
  PromotionDocument,
  UserDocument,
};

// Transaction model exports
export {
  EventModel,
  OrderModel,
  baseTransactionSchemaFields,
  baseTransactionSchemaOptions,
};
export type { ITransactionDocument };

// Legacy type aliases for backward compatibility
export type {
  CategoryDocument as ICategoryDocument,
  IBaseDocument as IEntity,
  IBaseDocument as IEntityDocument,
  ITransactionDocument as IEventDocument,
  ITransactionDocument as IOrderDocument,
  ProductDocument as IProductDocument,
  PromotionDocument as IPromotionDocument,
  ITransactionDocument as ITransaction,
  UserDocument as IUserDocument,
};

// Legacy model exports with interface names for backward compatibility
export {
  CategoryModel as ICategory,
  EventModel as IEvent,
  OrderModel as IOrder,
  ProductModel as IProduct,
  PromotionModel as IPromotion,
  UserModel as IUser,
};

