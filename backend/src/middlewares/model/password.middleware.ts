import bcrypt from "bcryptjs";
import { Schema } from "mongoose";

/**
 * Adds middleware to automatically hash password before saving
 * @param schema - Mongoose schema to add the middleware to
 * @param passwordField - The field name containing the password (default: "password")
 */
export function addPasswordHashMiddleware<T>(
  schema: Schema<T>,
  passwordField: string = "password"
): void {
  schema.pre("save", async function (this: any, next) {
    if (!this.isModified(passwordField)) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      this[passwordField] = await bcrypt.hash(this[passwordField], salt);
      next();
    } catch (error: any) {
      next(error);
    }
  });
}

/**
 * Adds method to compare password with hashed password
 * @param schema - Mongoose schema to add the method to
 * @param methodName - The name of the method to add (default: "comparePassword")
 * @param passwordField - The field name containing the password (default: "password")
 */
export function addPasswordCompareMethod<T>(
  schema: Schema<T>,
  methodName: string = "comparePassword",
  passwordField: string = "password"
): void {
  schema.methods[methodName] = async function (
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this[passwordField]);
  };
}
