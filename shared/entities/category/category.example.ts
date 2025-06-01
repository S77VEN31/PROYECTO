/**
 * @fileoverview Example usage of Category types
 * Demonstrates data modeling with category objects
 */

import { Category, CategoryCreate, CategoryUpdate } from "@shared/entities";
import { CategoryVariant } from "@shared/enums";

/**
 * Example of a category creation model
 */
const newCategoryModel: CategoryCreate = {
  name: "Coffee Specialties",
  description: "Premium coffee drinks and espresso-based beverages",
  icon: "coffee-cup",
  displayOrder: 1,
  products: [],
  variant: CategoryVariant.COFFEE,
  active: true,
};

/**
 * Example of a complete category model as stored in the database
 * Using explicit type to avoid inheritance issues
 */
const categoryModel = {
  id: "cat-123456",
  // EntityBase fields
  name: "Coffee Specialties",
  description: "Premium coffee drinks and espresso-based beverages",
  active: true,
  createdAt: "2023-08-15T10:30:00Z",
  updatedAt: "2023-08-15T10:30:00Z",
  // EntityMetadata fields
  slug: "coffee-specialties",
  searchTerm: "coffee espresso latte cappuccino",
  // CategoryBase specific fields
  icon: "coffee-cup",
  displayOrder: 1,
  products: ["prod-001", "prod-002", "prod-003"],
  variant: CategoryVariant.COFFEE,
} as Category;

/**
 * Example of a category update model
 */
const categoryUpdateModel: CategoryUpdate = {
  displayOrder: 2,
  variant: CategoryVariant.ORANGE,
};

/**
 * Example of a category with different variant
 */
const dessertCategoryModel: CategoryCreate = {
  name: "Desserts & Pastries",
  description: "Sweet treats and baked goods",
  icon: "cake",
  displayOrder: 3,
  products: [],
  variant: CategoryVariant.ORANGE,
  active: true,
};

/**
 * Example of a minimal category creation model
 */
const minimalCategoryModel: CategoryCreate = {
  name: "Seasonal Specials",
  description: "Limited time seasonal offerings",
  icon: "seasonal",
  variant: CategoryVariant.COFFEE,
};

export {
  categoryModel,
  categoryUpdateModel,
  dessertCategoryModel,
  minimalCategoryModel,
  newCategoryModel,
};

