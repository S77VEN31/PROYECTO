/**
 * Controller exports
 * Re-exports all controllers for easier imports throughout the application
 *
 * @module controllers
 */

// Entity controllers
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "./entities/category.controller";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./entities/product.controller";

import { PromotionController } from "./entities/promotion.controller";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  logout,
  updateUser,
} from "./entities/user.controller";

// Transaction controllers
import {
  completeEvent,
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "./transactions/event.controller";

import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "./transactions/order.controller";


// Category controller exports
export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
};

// Product controller exports
  export {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct
  };

// Promotion controller exports
export { PromotionController };

// User controller exports
  export {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    login,
    logout,
    updateUser
  };

// Transaction controller exports
  export {
    // Event controllers
    completeEvent,
    createEvent,
    // Order controllers
    createOrder, deleteEvent, deleteOrder, getEventById,
    getEvents, getOrderById,
    getOrders, updateEvent, updateOrder
  };

