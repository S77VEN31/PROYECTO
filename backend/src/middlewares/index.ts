/**
 * Middleware exports
 * Re-exports all middlewares for easier imports throughout the application
 *
 * @module middlewares
 */

// Re-export all middlewares
export { authMiddleware, authorize } from "./auth/auth.middleware";

export {
  ApiError,
  createApiError,
  errorMiddleware,
} from "./error/error.middleware";

export {
  addPasswordCompareMethod,
  addPasswordHashMiddleware,
} from "./model/password.middleware";

export { addSlugGenerationMiddleware } from "./model/slug.middleware";

export { validate } from "./validation/validation.middleware";
