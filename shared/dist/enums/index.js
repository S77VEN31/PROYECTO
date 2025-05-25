"use strict";
/**
 * Enumeration types for the application
 *
 * @module shared/enums
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.PromotionType = exports.PaymentMethod = exports.OrderStatus = exports.EventSource = exports.EventPriority = exports.CategoryVariant = void 0;
// Import category variant enum
const category_variant_enum_1 = require("./category-variant.enum");
Object.defineProperty(exports, "CategoryVariant", { enumerable: true, get: function () { return category_variant_enum_1.CategoryVariant; } });
// Import event enums
const event_priority_enum_1 = require("./event-priority.enum");
Object.defineProperty(exports, "EventPriority", { enumerable: true, get: function () { return event_priority_enum_1.EventPriority; } });
const event_source_enum_1 = require("./event-source.enum");
Object.defineProperty(exports, "EventSource", { enumerable: true, get: function () { return event_source_enum_1.EventSource; } });
// Import order status enum
const order_status_enum_1 = require("./order-status.enum");
Object.defineProperty(exports, "OrderStatus", { enumerable: true, get: function () { return order_status_enum_1.OrderStatus; } });
// Import payment method enum
const payment_method_enum_1 = require("./payment-method.enum");
Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return payment_method_enum_1.PaymentMethod; } });
// Import promotion type enum
const promotion_type_enum_1 = require("./promotion-type.enum");
Object.defineProperty(exports, "PromotionType", { enumerable: true, get: function () { return promotion_type_enum_1.PromotionType; } });
// Import user roles enum
const user_roles_enum_1 = require("./user-roles.enum");
Object.defineProperty(exports, "UserRole", { enumerable: true, get: function () { return user_roles_enum_1.UserRole; } });
//# sourceMappingURL=index.js.map