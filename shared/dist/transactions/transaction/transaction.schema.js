"use strict";
/**
 * Base transaction schemas for the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialTransactionRecordSchema = exports.AuditableTransactionSchema = exports.TransactionRecordSchema = void 0;
const common_1 = require("@shared/common");
const zod_1 = require("zod");
/**
 * Schema for core transaction properties
 */
exports.TransactionRecordSchema = common_1.TimeStampsSchema.merge(common_1.CompletableTimestampSchema).extend({
    id: zod_1.z.string().uuid().optional(),
    active: zod_1.z.boolean().optional().default(true),
    reference: zod_1.z.string().optional(),
});
/**
 * Schema for auditable transaction with user tracking
 */
exports.AuditableTransactionSchema = exports.TransactionRecordSchema.extend({
    createdBy: zod_1.z.string().uuid().optional(),
    updatedBy: zod_1.z.string().uuid().optional(),
    completedBy: zod_1.z.string().uuid().optional(),
});
/**
 * Partial schema for flexible transaction creation
 */
exports.PartialTransactionRecordSchema = exports.TransactionRecordSchema.partial();
//# sourceMappingURL=transaction.schema.js.map