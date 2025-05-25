/**
 * @fileoverview Timestamp-related types used across the application
 */

/**
 * Basic timestamp information for all records in the database
 * @interface TimeStamps
 * @property {string} createdAt - ISO timestamp of when the record was created
 * @property {string} updatedAt - ISO timestamp of when the record was last updated
 */
export interface TimeStamps {
  createdAt: string;
  updatedAt: string;
}

/**
 * Utility type for creating fields that require a timestamp value
 * @type TimestampField
 */
export type TimestampField = string | Date;

/**
 * Interface for entities that track completion time
 * @interface CompletableTimestamp
 * @property {string|null} [completedAt] - ISO timestamp when the entity was completed or finalized
 */
export interface CompletableTimestamp {
  completedAt?: string | null;
}
