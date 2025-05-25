/**
 * @fileoverview Base transaction types for the application
 * Defines core interfaces for transaction records, audit logging, and event tracking
 */

import { TimeStamps } from "@shared/common";

/**
 * Core properties for all transaction records in the system
 * Represents temporal business events with tracking information
 * @interface TransactionRecord
 * @extends TimeStamps
 * @property {string} [id] - Unique identifier for the transaction
 * @property {boolean} [active] - Flag indicating if the transaction is active or has been voided
 * @property {string} [reference] - External reference code or invoice number
 * @property {string|null} [completedAt] - ISO timestamp when the transaction was finalized
 */
export interface TransactionRecord extends TimeStamps {
  id?: string;
  active?: boolean;
  reference?: string;
  completedAt?: string | null;
}

/**
 * Utility type for flexible transaction creation
 * Makes all transaction record properties optional for initial data entry
 * @type PartialTransactionRecord
 */
export type PartialTransactionRecord = Partial<TransactionRecord>;

/**
 * Enhanced transaction interface with user accountability tracking
 * Extends transaction records with user attribution for audit trails
 * @interface AuditableTransaction
 * @extends TransactionRecord
 * @property {string} [createdBy] - ID of the user who created the transaction
 * @property {string} [updatedBy] - ID of the user who last updated the transaction
 * @property {string|null} [completedBy] - ID of the user who completed or finalized the transaction
 */

export interface AuditableTransaction extends TransactionRecord {
  createdBy?: string;
  updatedBy?: string;
  completedBy?: string | null;
}
