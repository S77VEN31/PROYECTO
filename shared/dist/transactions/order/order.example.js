"use strict";
/**
 * @fileoverview Example usage of Order types
 * Demonstrates data modeling with order objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderUpdateModel = exports.orderProductsModel = exports.orderModel = exports.newOrderModel = exports.cancelledOrderModel = void 0;
const enums_1 = require("@shared/enums");
/**
 * Example of order product models
 */
const orderProductsModel = [
    {
        productId: "prod-001",
        quantity: 2,
        specialInstructions: "Extra hot",
    },
    {
        productId: "prod-002",
        quantity: 1,
    },
];
exports.orderProductsModel = orderProductsModel;
/**
 * Example of an order creation model
 */
const newOrderModel = {
    customerName: "Sarah Johnson",
    tableNumber: 5,
    products: orderProductsModel,
};
exports.newOrderModel = newOrderModel;
/**
 * Example of a complete order model as stored in the database
 */
const orderModel = {
    id: "order-78901",
    customerName: "Sarah Johnson",
    tableNumber: 5,
    products: orderProductsModel,
    status: enums_1.OrderStatus.IN_PROGRESS,
    subtotal: 12.5,
    tax: 1.25,
    total: 13.75,
    tip: 2.75,
    paymentMethod: enums_1.PaymentMethod.CREDIT_CARD,
    active: true,
    createdAt: "2023-08-15T12:30:00Z",
    updatedAt: "2023-08-15T12:45:00Z",
    createdBy: "user-server1",
    completedAt: undefined,
    completedBy: undefined,
};
exports.orderModel = orderModel;
/**
 * Example of an order update model
 */
const orderUpdateModel = {
    status: enums_1.OrderStatus.COMPLETED,
};
exports.orderUpdateModel = orderUpdateModel;
/**
 * Example of a cancelled order model
 */
const cancelledOrderModel = {
    ...orderModel,
    id: "order-78902",
    status: enums_1.OrderStatus.CANCELLED,
};
exports.cancelledOrderModel = cancelledOrderModel;
//# sourceMappingURL=order.example.js.map