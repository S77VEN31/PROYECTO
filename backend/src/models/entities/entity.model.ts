import { EntityMetadata } from "colori-platform-shared";
import mongoose, { Document } from "mongoose";

/**
 * Base document interface for mongoose documents
 * Extends Document and EntityMetadata with minimal adjustments for MongoDB
 * @interface IBaseDocument
 */
export interface IBaseDocument extends Document, Omit<EntityMetadata, "id"> {
  _id: mongoose.Types.ObjectId;
  // createdAt and updatedAt are already Date in shared types
}

/**
 * Common schema options for all entity schemas
 * Includes timestamp support and JSON transformation
 * @const baseSchemaOptions
 */
export const baseEntitySchemaOptions = {
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
 * Base fields common to all entity schemas
 * Defines standard fields that all entities should have
 * @const baseSchemaFields
 */
export const baseEntitySchemaFields = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
  slug: { type: String, unique: true },
  searchTerm: String,
  backgroundImages: [
    {
      src: String,
      alt: String,
      isPrimary: Boolean,
    },
  ],
};
