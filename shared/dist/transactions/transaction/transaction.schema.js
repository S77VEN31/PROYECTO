/**
 * Base transaction schemas for the application
 */
import { CompletableTimestampSchema, TimeStampsSchema } from "../../common";
import { z } from "zod";
/**
 * Schema for core transaction properties
 */
export const TransactionRecordSchema = TimeStampsSchema.merge(CompletableTimestampSchema).extend({
    id: z.string().uuid().optional(),
    active: z.boolean().optional().default(true),
    reference: z.string().optional(),
});
/**
 * Schema for auditable transaction with user tracking
 */
export const AuditableTransactionSchema = TransactionRecordSchema.extend({
    createdBy: z.string().uuid().optional(),
    updatedBy: z.string().uuid().optional(),
    completedBy: z.string().uuid().optional(),
});
/**
 * Partial schema for flexible transaction creation
 */
export const PartialTransactionRecordSchema = TransactionRecordSchema.partial();
//# sourceMappingURL=transaction.schema.js.map