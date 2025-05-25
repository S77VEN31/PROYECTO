"use strict";
/**
 * Examples of event transactions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventExample = exports.createEventExample = exports.orderCancelledEvent = exports.orderCompletedEvent = exports.orderInProgressEvent = exports.newOrderEvent = void 0;
const enums_1 = require("@shared/enums");
/**
 * Example of a new order event
 */
exports.newOrderEvent = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: enums_1.OrderStatus.PENDING,
    source: enums_1.EventSource.POS,
    orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
    userId: "user-cashier1",
    priority: enums_1.EventPriority.NORMAL,
    reference: "ORD-20230615-001",
    createdAt: "2023-06-15T14:30:00Z",
    updatedAt: "2023-06-15T14:30:00Z",
    completedAt: null,
    completedBy: null,
};
/**
 * Example of an order in-progress event
 */
exports.orderInProgressEvent = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
    status: enums_1.OrderStatus.IN_PROGRESS,
    source: enums_1.EventSource.KITCHEN_DISPLAY,
    orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
    previousStatus: enums_1.OrderStatus.PENDING,
    userId: "user-cook1",
    priority: enums_1.EventPriority.NORMAL,
    reference: "ORD-20230615-001",
    createdAt: "2023-06-15T14:40:00Z",
    updatedAt: "2023-06-15T14:40:00Z",
    completedAt: null,
    completedBy: null,
};
/**
 * Example of an order completed event
 */
exports.orderCompletedEvent = {
    id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
    status: enums_1.OrderStatus.COMPLETED,
    source: enums_1.EventSource.KITCHEN_DISPLAY,
    orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
    previousStatus: enums_1.OrderStatus.IN_PROGRESS,
    userId: "user-cook1",
    priority: enums_1.EventPriority.HIGH,
    reference: "ORD-20230615-001",
    createdAt: "2023-06-15T15:35:00Z",
    updatedAt: "2023-06-15T15:35:00Z",
    completedAt: "2023-06-15T15:35:00Z",
    completedBy: "user-cook1",
};
/**
 * Example of an order cancelled event
 */
exports.orderCancelledEvent = {
    id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
    status: enums_1.OrderStatus.CANCELLED,
    source: enums_1.EventSource.ADMIN_PORTAL,
    orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
    previousStatus: enums_1.OrderStatus.PENDING,
    userId: "user-manager1",
    reason: "Customer requested cancellation",
    priority: enums_1.EventPriority.NORMAL,
    reference: "ORD-20230615-001",
    createdAt: "2023-06-15T16:00:00Z",
    updatedAt: "2023-06-15T16:00:00Z",
    completedAt: "2023-06-15T16:00:00Z",
    completedBy: "user-manager1",
};
/**
 * Example of creating a new event
 */
exports.createEventExample = {
    status: enums_1.OrderStatus.PENDING,
    source: enums_1.EventSource.POS,
    orderId: "8fa85f64-5717-4562-b3fc-2c963f66a654",
    userId: "user-cashier2",
    priority: enums_1.EventPriority.NORMAL,
    reference: "ORD-20230615-002",
};
/**
 * Example of updating an event status
 */
exports.updateEventExample = {
    previousStatus: enums_1.OrderStatus.PENDING,
    userId: "user-manager1",
    completedAt: "2023-06-15T15:10:00Z",
    completedBy: "user-manager1",
};
//# sourceMappingURL=event.example.js.map