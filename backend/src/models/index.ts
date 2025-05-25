/**
 * Model exports
 * Re-exports all models for easier imports throughout the application
 *
 * @module models
 */

// Entity models
import {
  CategoryModel,
  ICategory,
  ICategoryDocument,
} from "./entities/category.model";

import { BaseEntity, IEntity, IEntityDocument } from "./entities/entity.model";

import {
  IProduct,
  IProductDocument,
  ProductModel,
} from "./entities/product.model";

import {
  IPromotion,
  IPromotionDocument,
  PromotionModel,
} from "./entities/promotion.model";

import { IUser, IUserDocument, UserModel } from "./entities/user.model";

// Transaction models
import { EventModel, IEvent, IEventDocument } from "./transactions/event.model";

import { IOrder, IOrderDocument, OrderModel } from "./transactions/order.model";

import {
  ITransaction,
  ITransactionDocument,
  TransactionModel,
} from "./transactions/transaction.model";

// Entity model exports
export { CategoryModel, ICategory, ICategoryDocument };

export { BaseEntity, IEntity, IEntityDocument };

export { IProduct, IProductDocument, ProductModel };

export { IPromotion, IPromotionDocument, PromotionModel };

export { IUser, IUserDocument, UserModel };

// Transaction model exports
export { EventModel, IEvent, IEventDocument };

export { IOrder, IOrderDocument, OrderModel };

export { ITransaction, ITransactionDocument, TransactionModel };
