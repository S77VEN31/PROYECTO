/**
 * Schemas for Event transactions
 */
import { EventPriority, EventSource, OrderStatus } from "../../enums";
import { TransactionRecordSchema } from "../../transactions/transaction/transaction.schema";
import { z } from "zod";
/**
 * Schema for event transaction
 */
export const EventTransactionSchema = TransactionRecordSchema.extend({
    status: z.nativeEnum(OrderStatus),
    source: z.nativeEnum(EventSource),
    orderId: z.string().uuid(),
    previousStatus: z.nativeEnum(OrderStatus).optional(),
    userId: z.string().uuid().optional(),
    reason: z.string().optional(),
    priority: z
        .nativeEnum(EventPriority)
        .optional()
        .default(EventPriority.NORMAL),
    completedBy: z.string().nullable().optional(),
});
/**
 * Schema for complete event
 */
export const EventSchema = EventTransactionSchema.extend({
    id: z.string().uuid(),
});
/**
 * Schema for event creation
 */
export const EventCreateSchema = z.object({
    status: z.nativeEnum(OrderStatus),
    source: z.nativeEnum(EventSource),
    orderId: z.string().uuid(),
    previousStatus: z.nativeEnum(OrderStatus).optional(),
    userId: z.string().uuid().optional(),
    reason: z.string().optional(),
    priority: z.nativeEnum(EventPriority).optional(),
    reference: z.string().optional(),
});
/**
 * Schema for event updates
 */
export const EventUpdateSchema = z.object({
    previousStatus: z.nativeEnum(OrderStatus).optional(),
    userId: z.string().uuid().optional(),
    reason: z.string().optional(),
    priority: z.nativeEnum(EventPriority).optional(),
    completedAt: z.string().nullable().optional(),
    completedBy: z.string().nullable().optional(),
});
//# sourceMappingURL=event.schema.js.map