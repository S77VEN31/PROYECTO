/**
 * @fileoverview Example usage of Order types
 * Demonstrates data modeling with order objects
 */
import { Order, OrderCreate, OrderProduct, OrderUpdate } from "../../transactions";
/**
 * Example of order product models
 */
declare const orderProductsModel: OrderProduct[];
/**
 * Example of an order creation model
 */
declare const newOrderModel: OrderCreate;
/**
 * Example of a complete order model as stored in the database
 */
declare const orderModel: Order;
/**
 * Example of an order update model
 */
declare const orderUpdateModel: OrderUpdate;
/**
 * Example of a cancelled order model
 */
declare const cancelledOrderModel: Order;
export { cancelledOrderModel, newOrderModel, orderModel, orderProductsModel, orderUpdateModel, };
