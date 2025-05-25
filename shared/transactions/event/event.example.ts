/**
 * Examples of event transactions
 */

import { EventPriority, EventSource, OrderStatus } from "@shared/enums";
import { Event, EventCreate, EventUpdate } from "./event.d";

/**
 * Example of a new order event
 */
export const newOrderEvent: Event = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  status: OrderStatus.PENDING,
  source: EventSource.POS,
  orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
  userId: "user-cashier1",
  priority: EventPriority.NORMAL,
  reference: "ORD-20230615-001",
  createdAt: "2023-06-15T14:30:00Z",
  updatedAt: "2023-06-15T14:30:00Z",
  completedAt: null,
  completedBy: null,
};

/**
 * Example of an order in-progress event
 */
export const orderInProgressEvent: Event = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
  status: OrderStatus.IN_PROGRESS,
  source: EventSource.KITCHEN_DISPLAY,
  orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
  previousStatus: OrderStatus.PENDING,
  userId: "user-cook1",
  priority: EventPriority.NORMAL,
  reference: "ORD-20230615-001",
  createdAt: "2023-06-15T14:40:00Z",
  updatedAt: "2023-06-15T14:40:00Z",
  completedAt: null,
  completedBy: null,
};

/**
 * Example of an order completed event
 */
export const orderCompletedEvent: Event = {
  id: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
  status: OrderStatus.COMPLETED,
  source: EventSource.KITCHEN_DISPLAY,
  orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
  previousStatus: OrderStatus.IN_PROGRESS,
  userId: "user-cook1",
  priority: EventPriority.HIGH,
  reference: "ORD-20230615-001",
  createdAt: "2023-06-15T15:35:00Z",
  updatedAt: "2023-06-15T15:35:00Z",
  completedAt: "2023-06-15T15:35:00Z",
  completedBy: "user-cook1",
};

/**
 * Example of an order cancelled event
 */
export const orderCancelledEvent: Event = {
  id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
  status: OrderStatus.CANCELLED,
  source: EventSource.ADMIN_PORTAL,
  orderId: "7fa85f64-5717-4562-b3fc-2c963f66a456",
  previousStatus: OrderStatus.PENDING,
  userId: "user-manager1",
  reason: "Customer requested cancellation",
  priority: EventPriority.NORMAL,
  reference: "ORD-20230615-001",
  createdAt: "2023-06-15T16:00:00Z",
  updatedAt: "2023-06-15T16:00:00Z",
  completedAt: "2023-06-15T16:00:00Z",
  completedBy: "user-manager1",
};

/**
 * Example of creating a new event
 */
export const createEventExample: EventCreate = {
  status: OrderStatus.PENDING,
  source: EventSource.POS,
  orderId: "8fa85f64-5717-4562-b3fc-2c963f66a654",
  userId: "user-cashier2",
  priority: EventPriority.NORMAL,
  reference: "ORD-20230615-002",
};

/**
 * Example of updating an event status
 */
export const updateEventExample: EventUpdate = {
  previousStatus: OrderStatus.PENDING,
  userId: "user-manager1",
  completedAt: "2023-06-15T15:10:00Z",
  completedBy: "user-manager1",
};
