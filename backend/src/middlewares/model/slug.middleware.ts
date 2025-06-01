import { Schema } from "mongoose";

/**
 * Adds middleware to automatically generate a slug from the name field
 * Only generates slug if it's empty or undefined
 * @param schema - Mongoose schema to add the middleware to
 */
export function addSlugGenerationMiddleware<T>(schema: Schema<T>): void {
  schema.pre("save", function (this: any, next) {
    // Only generate slug if it's empty, undefined, or if name was modified and slug is empty
    if (this.slug && this.slug.trim() !== "") {
      return next();
    }

    // Generate slug from name
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    next();
  });
}
