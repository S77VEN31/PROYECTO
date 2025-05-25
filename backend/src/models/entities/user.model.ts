import {
  addPasswordCompareMethod,
  addPasswordHashMiddleware,
  addSlugGenerationMiddleware,
} from "@middlewares";
import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { UserCreate, UserRole } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

/**
 * Specific type that merges IBaseDocument with UserCreate without conflicts
 * Takes only the fields from UserCreate that are not in IBaseDocument
 * Adds the comparePassword method for password verification
 * @typedef {Object} UserDocument
 */
type UserDocument = Omit<UserCreate, keyof IBaseDocument> & {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

/**
 * Schema for user model with base fields and user-specific fields
 * @const userSchema
 */
const userSchema = new Schema<UserDocument>(
  {
    ...baseEntitySchemaFields,
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.SERVER,
    },
    lastLogin: { type: String, default: null },
  },
  baseEntitySchemaOptions
);

/**
 * Add middleware for password hashing, slug generation, and password comparison
 */
addPasswordHashMiddleware(userSchema);
addSlugGenerationMiddleware(userSchema);
addPasswordCompareMethod(userSchema);

/**
 * Mongoose model for users
 * @const UserModel
 */
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
