/**
 * Model exports
 * Re-exports all models for easier imports throughout the application
 *
 * @module models
 */

// Entity models
import CategoryModel from "./entities/category.model";
import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "./entities/entity.model";
import { ProductModel } from "./entities/product.model";
import PromotionModel from "./entities/promotion.model";
import UserModel from "./entities/user.model";

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
export type { IBaseDocument };

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
  IBaseDocument as ICategoryDocument,
  IBaseDocument as IEntity,
  IBaseDocument as IEntityDocument,
  ITransactionDocument as IEventDocument,
  ITransactionDocument as IOrderDocument,
  IBaseDocument as IProductDocument,
  IBaseDocument as IPromotionDocument,
  ITransactionDocument as ITransaction,
  IBaseDocument as IUserDocument,
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

