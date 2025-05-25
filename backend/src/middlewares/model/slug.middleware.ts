import { Schema } from "mongoose";

/**
 * Adds middleware to automatically generate a slug from the name field
 * @param schema - Mongoose schema to add the middleware to
 */
export function addSlugGenerationMiddleware<T>(schema: Schema<T>): void {
  schema.pre("save", function (this: any, next) {
    if (!this.isModified("name") && this.slug) return next();

    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    next();
  });
}
