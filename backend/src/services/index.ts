/**
 * Service exports
 * Re-exports all services for easier imports throughout the application
 *
 * @module services
 */

// Import entity service classes
import { CategoryService } from "./entities/category.service";
import { ProductService } from "./entities/product.service";
import { PromotionService } from "./entities/promotion.service";
import { UserService } from "./entities/user.service";

// Import transaction service classes
import { EventService } from "./transactions/event.service";
import { OrderService } from "./transactions/order.service";

// Export service classes
export {
    CategoryService, EventService, OrderService, ProductService,
    PromotionService,
    UserService
};

