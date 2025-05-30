/**
 * Schemas for Order transactions
 */
import { PaymentFinancialSchema } from "../../common";
import { OrderStatus, PaymentMethod } from "../../enums";
import { z } from "zod";
import { AuditableTransactionSchema } from "../transaction/transaction.schema";
/**
 * Schema for individual menu item within an order
 */
export const OrderProductSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    specialInstructions: z.string().optional(),
    toppings: z.array(z.string()).optional(),
});
/**
 * Schema for product toppings
 */
export const OrderToppingSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    price: z.number().nonnegative(),
    active: z.boolean().optional().default(true),
});
/**
 * Schema for core order information
 */
export const OrderTransactionSchema = AuditableTransactionSchema.extend({
    customerName: z.string(),
    tableNumber: z.number().int().positive(),
    products: z.array(OrderProductSchema),
    status: z.nativeEnum(OrderStatus),
});
/**
 * Schema for complete order representation
 */
export const OrderSchema = OrderTransactionSchema.merge(PaymentFinancialSchema).extend({
    id: z.string().uuid(),
});
/**
 * Schema for order creation
 */
export const OrderCreateSchema = z.object({
    customerName: z.string(),
    tableNumber: z.number().int().positive(),
    products: z.array(OrderProductSchema),
    subtotal: z.number().nonnegative().optional(),
    tax: z.number().nonnegative().optional(),
    total: z.number().nonnegative().optional(),
    tip: z.number().nonnegative().nullable().optional(),
    paymentMethod: z.nativeEnum(PaymentMethod).nullable().optional(),
    status: z.nativeEnum(OrderStatus).optional().default(OrderStatus.PENDING),
});
/**
 * Schema for order updates
 */
export const OrderUpdateSchema = z.object({
    status: z.nativeEnum(OrderStatus),
    customerName: z.string().optional(),
    tableNumber: z.number().int().positive().optional(),
    products: z.array(OrderProductSchema).optional(),
    subtotal: z.number().nonnegative().optional(),
    tax: z.number().nonnegative().optional(),
    total: z.number().nonnegative().optional(),
    tip: z.number().nonnegative().nullable().optional(),
    paymentMethod: z.nativeEnum(PaymentMethod).nullable().optional(),
});
//# sourceMappingURL=order.schema.js.map