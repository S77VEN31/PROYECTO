/**
 * @fileoverview Example usage of Order types
 * Demonstrates data modeling with order objects
 */
import { OrderStatus, PaymentMethod } from "../../enums";
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
/**
 * Example of an order creation model
 */
const newOrderModel = {
    customerName: "Sarah Johnson",
    tableNumber: 5,
    products: orderProductsModel,
};
/**
 * Example of a complete order model as stored in the database
 */
const orderModel = {
    id: "order-78901",
    customerName: "Sarah Johnson",
    tableNumber: 5,
    products: orderProductsModel,
    status: OrderStatus.IN_PROGRESS,
    subtotal: 12.5,
    tax: 1.25,
    total: 13.75,
    tip: 2.75,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    active: true,
    createdAt: "2023-08-15T12:30:00Z",
    updatedAt: "2023-08-15T12:45:00Z",
    createdBy: "user-server1",
    completedAt: undefined,
    completedBy: undefined,
};
/**
 * Example of an order update model
 */
const orderUpdateModel = {
    status: OrderStatus.COMPLETED,
};
/**
 * Example of a cancelled order model
 */
const cancelledOrderModel = {
    ...orderModel,
    id: "order-78902",
    status: OrderStatus.CANCELLED,
};
export { cancelledOrderModel, newOrderModel, orderModel, orderProductsModel, orderUpdateModel, };
//# sourceMappingURL=order.example.js.map