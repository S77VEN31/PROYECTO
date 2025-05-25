"use strict";
/**
 * Schemas for Order transactions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdateSchema = exports.OrderCreateSchema = exports.OrderSchema = exports.OrderTransactionSchema = exports.OrderToppingSchema = exports.OrderProductSchema = void 0;
const common_1 = require("@shared/common");
const enums_1 = require("@shared/enums");
const transactions_1 = require("@shared/transactions");
const zod_1 = require("zod");
/**
 * Schema for individual menu item within an order
 */
exports.OrderProductSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().positive(),
    specialInstructions: zod_1.z.string().optional(),
    toppings: zod_1.z.array(zod_1.z.string()).optional(),
});
/**
 * Schema for product toppings
 */
exports.OrderToppingSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    active: zod_1.z.boolean().optional().default(true),
});
/**
 * Schema for core order information
 */
exports.OrderTransactionSchema = transactions_1.AuditableTransactionSchema.extend({
    customerName: zod_1.z.string(),
    tableNumber: zod_1.z.number().int().positive(),
    products: zod_1.z.array(exports.OrderProductSchema),
    status: zod_1.z.nativeEnum(enums_1.OrderStatus),
});
/**
 * Schema for complete order representation
 */
exports.OrderSchema = exports.OrderTransactionSchema.merge(common_1.PaymentFinancialSchema).extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for order creation
 */
exports.OrderCreateSchema = zod_1.z.object({
    customerName: zod_1.z.string(),
    tableNumber: zod_1.z.number().int().positive(),
    products: zod_1.z.array(exports.OrderProductSchema),
    subtotal: zod_1.z.number().nonnegative().optional(),
    tax: zod_1.z.number().nonnegative().optional(),
    total: zod_1.z.number().nonnegative().optional(),
    tip: zod_1.z.number().nonnegative().nullable().optional(),
    paymentMethod: zod_1.z.nativeEnum(enums_1.PaymentMethod).nullable().optional(),
    status: zod_1.z.nativeEnum(enums_1.OrderStatus).optional().default(enums_1.OrderStatus.PENDING),
});
/**
 * Schema for order updates
 */
exports.OrderUpdateSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(enums_1.OrderStatus),
    customerName: zod_1.z.string().optional(),
    tableNumber: zod_1.z.number().int().positive().optional(),
    products: zod_1.z.array(exports.OrderProductSchema).optional(),
    subtotal: zod_1.z.number().nonnegative().optional(),
    tax: zod_1.z.number().nonnegative().optional(),
    total: zod_1.z.number().nonnegative().optional(),
    tip: zod_1.z.number().nonnegative().nullable().optional(),
    paymentMethod: zod_1.z.nativeEnum(enums_1.PaymentMethod).nullable().optional(),
});
//# sourceMappingURL=order.schema.js.map