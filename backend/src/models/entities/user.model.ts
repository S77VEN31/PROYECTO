import {
  addPasswordCompareMethod,
  addPasswordHashMiddleware,
} from "@middlewares";
import {
  IBaseDocument,
  baseEntitySchemaFields,
  baseEntitySchemaOptions,
} from "@models";
import { UserCreate, UserRole } from "colori-platform-shared";
import mongoose, { Schema } from "mongoose";

/**
 * User document interface that extends IBaseDocument with UserCreate fields
 * Omits conflicting fields and adds authentication methods
 * @interface UserDocument
 */
interface UserDocument
  extends IBaseDocument,
    Omit<UserCreate, keyof IBaseDocument> {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * Schema for user model using UserCreate type from shared repository
 * @const userSchema
 */
const userSchema = new Schema<UserDocument>(
  {
    ...baseEntitySchemaFields,
    // Required fields from UserCreate
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    // Optional fields from UserCreate with defaults
    lastName: { type: String, default: "" },
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
 * Indexes for better query performance
 */
userSchema.index({ name: 1 });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ active: 1 });
userSchema.index({ role: 1 });
userSchema.index({ slug: 1 }, { unique: true });

/**
 * Add middleware for password hashing, slug generation, and password comparison
 */
addPasswordHashMiddleware(userSchema as any);
addPasswordCompareMethod(userSchema as any);

/**
 * Mongoose model for users
 * @const UserModel
 */
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
export type { UserDocument };

