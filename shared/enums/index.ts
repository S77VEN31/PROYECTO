/**
 * Enumeration types for the application
 *
 * @module shared/enums
 */

// Import category variant enum
import { CategoryVariant } from "./category-variant.enum";
// Import event enums
import { EventPriority } from "./event-priority.enum";
import { EventSource } from "./event-source.enum";
// Import order status enum
import { OrderStatus } from "./order-status.enum";
// Import payment method enum
import { PaymentMethod } from "./payment-method.enum";
// Import promotion type enum
import { PromotionType } from "./promotion-type.enum";
// Import user roles enum
import { UserRole } from "./user-roles.enum";

// Re-export all enums
export {
  // Category
  CategoryVariant,
  // Events
  EventPriority,
  EventSource,
  // Orders
  OrderStatus,
  // Payments
  PaymentMethod,
  // Promotions
  PromotionType,
  // Users
  UserRole,
};
