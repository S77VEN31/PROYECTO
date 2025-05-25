"use strict";
/**
 * Schemas for Event transactions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUpdateSchema = exports.EventCreateSchema = exports.EventSchema = exports.EventTransactionSchema = void 0;
const enums_1 = require("@shared/enums");
const transaction_schema_1 = require("@shared/transactions/transaction/transaction.schema");
const zod_1 = require("zod");
/**
 * Schema for event transaction
 */
exports.EventTransactionSchema = transaction_schema_1.TransactionRecordSchema.extend({
    status: zod_1.z.nativeEnum(enums_1.OrderStatus),
    source: zod_1.z.nativeEnum(enums_1.EventSource),
    orderId: zod_1.z.string().uuid(),
    previousStatus: zod_1.z.nativeEnum(enums_1.OrderStatus).optional(),
    userId: zod_1.z.string().uuid().optional(),
    reason: zod_1.z.string().optional(),
    priority: zod_1.z
        .nativeEnum(enums_1.EventPriority)
        .optional()
        .default(enums_1.EventPriority.NORMAL),
    completedBy: zod_1.z.string().nullable().optional(),
});
/**
 * Schema for complete event
 */
exports.EventSchema = exports.EventTransactionSchema.extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for event creation
 */
exports.EventCreateSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(enums_1.OrderStatus),
    source: zod_1.z.nativeEnum(enums_1.EventSource),
    orderId: zod_1.z.string().uuid(),
    previousStatus: zod_1.z.nativeEnum(enums_1.OrderStatus).optional(),
    userId: zod_1.z.string().uuid().optional(),
    reason: zod_1.z.string().optional(),
    priority: zod_1.z.nativeEnum(enums_1.EventPriority).optional(),
    reference: zod_1.z.string().optional(),
});
/**
 * Schema for event updates
 */
exports.EventUpdateSchema = zod_1.z.object({
    previousStatus: zod_1.z.nativeEnum(enums_1.OrderStatus).optional(),
    userId: zod_1.z.string().uuid().optional(),
    reason: zod_1.z.string().optional(),
    priority: zod_1.z.nativeEnum(enums_1.EventPriority).optional(),
    completedAt: zod_1.z.string().nullable().optional(),
    completedBy: zod_1.z.string().nullable().optional(),
});
//# sourceMappingURL=event.schema.js.map