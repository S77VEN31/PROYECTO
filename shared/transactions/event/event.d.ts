/**
 * Type declarations for Event transactions
 */

import { EventPriority, EventSource, OrderStatus } from "@shared/enums";
import { TransactionRecord } from "@shared/transactions";

/**
 * Event transaction representing an order state change
 * @interface EventTransaction
 * @extends TransactionRecord
 * @property {OrderStatus} status - Current status of the order
 * @property {EventSource} source - Component or service that generated the event
 * @property {string} orderId - ID of the order related to this event
 * @property {OrderStatus} [previousStatus] - Previous status of the order (for status changes)
 * @property {string} [userId] - ID of the user who triggered the event
 * @property {string} [reason] - Reason for the event (e.g., cancellation reason)
 * @property {EventPriority} [priority] - Processing priority (higher values = higher priority)
 * @property {string|null} [completedBy] - ID of the user or service that completed processing
 */
export interface EventTransaction extends TransactionRecord {
  status: OrderStatus;
  source: EventSource;
  orderId: string;
  previousStatus?: OrderStatus;
  userId?: string;
  reason?: string;
  priority?: EventPriority;
  completedBy?: string | null;
}

/**
 * Complete event representation
 * @interface Event
 * @extends EventTransaction
 * @property {string} id - Unique identifier for the event
 */
export interface Event extends EventTransaction {
  id: string;
}

/**
 * Input type for event creation operations
 * @type EventCreate
 */
export type EventCreate = Omit<Partial<Event>, "id"> &
  Pick<EventTransaction, "status" | "source" | "orderId">;

/**
 * Input type for event update operations
 * @type EventUpdate
 */
export type EventUpdate = Omit<
  Partial<Event>,
  "id" | "status" | "source" | "orderId"
>;

/**
 * @fileoverview Event API request and response type definitions
 */

import { IdParam, PaginationParams } from "@shared/common";
import { Event, EventCreate, EventUpdate } from "@shared/transactions";

// GET /events
export interface GetEventsRequest extends PaginationParams {
  orderId?: string;
  status?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetEventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

// GET /events/:id
export interface GetEventRequest extends IdParam {}

export interface GetEventResponse {
  event: Event;
}

// POST /events
export interface CreateEventRequest {
  event: EventCreate;
}

export interface CreateEventResponse {
  id: string;
  event: Event;
}

// PUT /events/:id
export interface UpdateEventRequest extends IdParam {
  event: EventUpdate;
}

export interface UpdateEventResponse {
  updated: boolean;
  event: Event;
}

// DELETE /events/:id
export interface DeleteEventRequest extends IdParam {}

export interface DeleteEventResponse {
  deleted: boolean;
}
import { EntityBase, EntityMetadata } from "@shared/entities";
import { EventStatus, EventType } from "@shared/enums";
