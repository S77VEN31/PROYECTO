/**
 * @fileoverview Schemas for financial-related types
 */
import { PaymentMethod } from "../../enums";
import { z } from "zod";
/**
 * Schema for basic financial information
 */
export declare const FinancialSchema: z.ZodObject<{
    subtotal: z.ZodNumber;
    tax: z.ZodNumber;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    subtotal: number;
    tax: number;
    total: number;
}, {
    subtotal: number;
    tax: number;
    total: number;
}>;
/**
 * Schema for financial details with payment information
 */
export declare const PaymentFinancialSchema: z.ZodObject<{
    subtotal: z.ZodNumber;
    tax: z.ZodNumber;
    total: z.ZodNumber;
} & {
    tip: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    paymentMethod: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof PaymentMethod>>>;
}, "strip", z.ZodTypeAny, {
    subtotal: number;
    tax: number;
    total: number;
    tip?: number | null | undefined;
    paymentMethod?: PaymentMethod | null | undefined;
}, {
    subtotal: number;
    tax: number;
    total: number;
    tip?: number | null | undefined;
    paymentMethod?: PaymentMethod | null | undefined;
}>;
//# sourceMappingURL=financial.schema.d.ts.map