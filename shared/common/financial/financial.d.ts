/**
 * @fileoverview Financial-related types used across the application
 */

import { PaymentMethod } from "@shared/enums";

/**
 * Basic financial information for transactions
 * @interface Financial
 * @property {number} subtotal - Subtotal amount before tax
 * @property {number} tax - Tax amount
 * @property {number} total - Total amount including tax
 */
export interface Financial {
  subtotal: number;
  tax: number;
  total: number;
}

/**
 * Extended financial information with payment details
 * @interface PaymentFinancial
 * @extends Financial
 * @property {number|null} [tip] - Optional tip amount
 * @property {PaymentMethod|null} [paymentMethod] - Payment method used
 */
export interface PaymentFinancial extends Financial {
  tip?: number | null;
  paymentMethod?: PaymentMethod | null;
}
