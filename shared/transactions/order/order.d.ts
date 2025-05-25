/**
 * Type declarations for Order transactions
 */

import { PaymentFinancial } from "@shared/common";
import { OrderStatus } from "@shared/enums";
import { AuditableTransaction } from "@shared/transactions";

/**
 * Individual menu item entry within an order
 * @interface OrderProduct
 * @property {string} productId - Reference to the ordered product
 * @property {number} quantity - Number of items ordered
 * @property {string} [specialInstructions] - Custom preparation instructions
 * @property {string[]} [toppings] - Additional toppings for the product
 */
export declare interface OrderProduct {
  productId: string;
  quantity: number;
  specialInstructions?: string;
  toppings?: string[];
}

/**
 * Interface for product toppings
 * @interface OrderTopping
 * @property {string} id - Unique identifier for the topping
 * @property {string} name - Display name of the topping
 * @property {number} price - Additional cost for the topping
 * @property {boolean} [active] - Whether the topping is currently available
 */
export declare interface OrderTopping {
  id: string;
  name: string;
  price: number;
  active?: boolean;
}

/**
 * Core order information with customer and item details
 * @interface OrderTransaction
 * @extends AuditableTransaction
 * @property {string} customerName - Name of the customer placing the order
 * @property {number} tableNumber - Table identifier in the restaurant
 * @property {OrderProduct[]} products - Array of products included in the order
 * @property {OrderStatus} status - Current processing status of the order
 */
export declare interface OrderTransaction extends AuditableTransaction {
  customerName: string;
  tableNumber: number;
  products: OrderProduct[];
  status: OrderStatus;
}

/**
 * Complete order representation with financial details
 * @interface Order
 * @extends OrderTransaction
 * @extends PaymentFinancial
 * @property {string} id - Unique identifier for the order
 */
export declare interface Order extends OrderTransaction, PaymentFinancial {
  id: string;
}

/**
 * Input type for order creation operations
 * @type OrderCreate
 */
export declare type OrderCreate = Omit<Partial<Order>, "id"> &
  Pick<OrderTransaction, "customerName" | "tableNumber" | "products">;

/**
 * Input type for order update operations
 * @type OrderUpdate
 */
export declare type OrderUpdate = Omit<Partial<Order>, "id"> &
  Pick<OrderTransaction, "status">;

/**
 * @fileoverview Order API request and response type definitions
 */

import { IdParam, PaginationParams } from "@shared/common";
import { Order, OrderCreate, OrderUpdate } from "@shared/transactions";

// GET /orders
export interface GetOrdersRequest extends PaginationParams {
  status?: string;
  tableNumber?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetOrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

// GET /orders/:id
export interface GetOrderRequest extends IdParam {}

export interface GetOrderResponse {
  order: Order;
}

// POST /orders
export interface CreateOrderRequest {
  order: OrderCreate;
}

export interface CreateOrderResponse {
  id: string;
  order: Order;
}

// PUT /orders/:id
export interface UpdateOrderRequest extends IdParam {
  order: OrderUpdate;
}

export interface UpdateOrderResponse {
  updated: boolean;
  order: Order;
}

// DELETE /orders/:id
export interface DeleteOrderRequest extends IdParam {}

export interface DeleteOrderResponse {
  deleted: boolean;
}
