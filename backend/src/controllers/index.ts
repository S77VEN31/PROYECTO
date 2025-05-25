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

import {
  createPromotion,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
} from "./entities/promotion.controller";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  logout,
  updateUser,
} from "./entities/user.controller";

// Category controller exports
export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
};

// Product controller exports
export {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
};

// Promotion controller exports
export {
  createPromotion,
  deletePromotion,
  getPromotionById,
  getPromotions,
  updatePromotion,
};

// User controller exports
export {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  logout,
  updateUser,
};
