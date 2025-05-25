"use strict";
/**
 * @fileoverview Schemas for financial-related types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentFinancialSchema = exports.FinancialSchema = void 0;
const enums_1 = require("../../enums");
const zod_1 = require("zod");
/**
 * Schema for basic financial information
 */
exports.FinancialSchema = zod_1.z.object({
    subtotal: zod_1.z.number().nonnegative(),
    tax: zod_1.z.number().nonnegative(),
    total: zod_1.z.number().nonnegative(),
});
/**
 * Schema for financial details with payment information
 */
exports.PaymentFinancialSchema = exports.FinancialSchema.extend({
    tip: zod_1.z.number().nonnegative().nullable().optional(),
    paymentMethod: zod_1.z.nativeEnum(enums_1.PaymentMethod).nullable().optional(),
});
//# sourceMappingURL=financial.schema.js.map