import {
  OrderCreate,
  OrderStatus,
  PaymentMethod,
} from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

import {
  ITransactionDocument,
  baseTransactionSchemaFields,
  baseTransactionSchemaOptions,
} from "@models";

/**
 * Interface for order document in mongoose
 * Extends ITransactionDocument with the specific fields of Order
 * @typedef {Object} OrderDocument
 */
type OrderDocument = Omit<OrderCreate, keyof ITransactionDocument>;

/**
 * Schema for orders with transaction base fields and order-specific fields
 * @const orderSchema
 */
const orderSchema = new Schema(
  {
    // Base transaction fields
    ...baseTransactionSchemaFields,

    // Order-specific fields
    customerName: { type: String, required: true },
    tableNumber: { type: Number, required: true, min: 1 },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        specialInstructions: String,
        toppings: [String],
        _id: false,
      },
    ],
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },

    // Financial fields
    subtotal: { type: Number, min: 0 },
    tax: { type: Number, min: 0 },
    total: { type: Number, min: 0 },
    tip: { type: Number, min: 0, default: null },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      default: null,
    },
  },
  baseTransactionSchemaOptions
);

/**
 * Add useful indexes for order queries
 */
orderSchema.index({ customerName: 1 });
orderSchema.index({ tableNumber: 1 });
orderSchema.index({ status: 1 });

/**
 * Mongoose model for orders
 * @const OrderModel
 */
const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
