/**
 * Transaction-related types and schemas
 *
 * @module shared/transactions
 */

/**
 * Event types and schemas
 */
import {
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
  Event,
  EventCreate,
  EventTransaction,
  EventUpdate,
  GetEventRequest,
  GetEventResponse,
  GetEventsRequest,
  GetEventsResponse,
  UpdateEventRequest,
  UpdateEventResponse,
} from "./event/event.d";

import { EventSchema, EventTransactionSchema } from "./event/event.schema";

// Re-export event types
export {
  // Event types
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
  Event,
  EventCreate,
  // Event schemas
  EventSchema,
  EventTransaction,
  EventTransactionSchema,
  EventUpdate,
  GetEventRequest,
  GetEventResponse,
  GetEventsRequest,
  GetEventsResponse,
  UpdateEventRequest,
  UpdateEventResponse,
};

/**
 * Order types and schemas
 */
import {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  GetSalesReportRequest,
  GetSalesReportResponse,
  GetSalesReportExportRequest,
  GetSalesReportExportResponse,
  Order,
  OrderCreate,
  OrderProduct,
  OrderTopping,
  OrderTransaction,
  OrderUpdate,
  SalesStatistics,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "./order/order.d";

import {
  OrderProductSchema,
  OrderSchema,
  OrderToppingSchema,
  OrderTransactionSchema,
} from "./order/order.schema";

// Re-export order types
export {
  // Order types
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  GetSalesReportRequest,
  GetSalesReportResponse,
  GetSalesReportExportRequest,
  GetSalesReportExportResponse,
  Order,
  OrderCreate,
  OrderProduct,
  // Order schemas
  OrderProductSchema,
  OrderSchema,
  OrderTopping,
  OrderToppingSchema,
  OrderTransaction,
  OrderTransactionSchema,
  OrderUpdate,
  SalesStatistics,
  UpdateOrderRequest,
  UpdateOrderResponse,
};

/**
 * Transaction types and schemas
 */
import {
  AuditableTransaction,
  PartialTransactionRecord,
  TransactionRecord,
} from "./transaction/transaction.d";

import {
  AuditableTransactionSchema,
  TransactionRecordSchema,
} from "./transaction/transaction.schema";

// Re-export transaction types
export {
  // Transaction types
  AuditableTransaction,
  // Transaction schemas
  AuditableTransactionSchema,
  PartialTransactionRecord,
  TransactionRecord,
  TransactionRecordSchema,
};
