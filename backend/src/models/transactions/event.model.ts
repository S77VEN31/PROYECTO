import { EventCreate, OrderStatus } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

// Direct import from the shared/transactions we created
import { EventPriority, EventSource } from "colori-platform-shared";

import {
  ITransactionDocument,
  baseTransactionSchemaFields,
  baseTransactionSchemaOptions,
} from "./transaction.model";

/**
 * Interface for event document in mongoose
 * Extends ITransactionDocument with the specific fields of EventTransaction
 * @typedef {Object} EventDocument
 */
type EventDocument = Omit<EventCreate, keyof ITransactionDocument>;

/**
 * Schema for system events with transaction base fields and event-specific fields
 * @const eventSchema
 */
const eventSchema = new Schema(
  {
    // Base transaction fields
    ...baseTransactionSchemaFields,

    // Event-specific fields
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    source: {
      type: String,
      enum: Object.values(EventSource),
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    previousStatus: {
      type: String,
      enum: Object.values(OrderStatus),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reason: { type: String },
    priority: {
      type: String,
      enum: Object.values(EventPriority),
      default: EventPriority.NORMAL,
    },
  },
  baseTransactionSchemaOptions
);

/**
 * Add indexes to improve query performance
 */
eventSchema.index({ status: 1 });
eventSchema.index({ source: 1 });
eventSchema.index({ orderId: 1 });
eventSchema.index({ userId: 1 });

/**
 * Mongoose model for events
 * @const EventModel
 */
const EventModel = mongoose.model<EventDocument>("Event", eventSchema);

export default EventModel;
