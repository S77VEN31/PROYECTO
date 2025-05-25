import { TransactionRecord } from "colori-platform-shared";
import mongoose, { Document } from "mongoose";

/**
 * Base document interface for mongoose transaction documents
 * Extends Document and TransactionRecord with MongoDB specific fields
 * @interface ITransactionDocument
 */
export interface ITransactionDocument
  extends Document,
    Omit<TransactionRecord, "id"> {
  _id: mongoose.Types.ObjectId;
}

/**
 * Common schema options for all transaction schemas
 * Reuses the base entity options with JSON transformation
 * @const baseSchemaOptions
 */
export const baseTransactionSchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (_: any, ret: any) {
      // Convert MongoDB _id to string id
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
};

/**
 * Base fields common to all transaction schemas
 * Based on TransactionRecord interface
 * @const transactionBaseSchemaFields
 */
export const baseTransactionSchemaFields = {
  reference: { type: String },
  active: { type: Boolean, default: true },
  completedAt: { type: Date, default: null },
  completedBy: { type: String, default: null },
};
