/**
 * @fileoverview Schemas for financial-related types
 */

import { PaymentMethod } from "@shared/enums";
import { z } from "zod";
import { Financial, PaymentFinancial } from "./financial.d";

/**
 * Schema for basic financial information
 */
export const FinancialSchema = z.object({
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),
}) satisfies z.ZodType<Financial>;

/**
 * Schema for financial details with payment information
 */
export const PaymentFinancialSchema = FinancialSchema.extend({
  tip: z.number().nonnegative().nullable().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).nullable().optional(),
}) satisfies z.ZodType<PaymentFinancial>;
