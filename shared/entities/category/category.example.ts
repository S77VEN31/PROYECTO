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
  slug: "coffee-specialties",
  icon: "coffee-cup",
  displayOrder: 1,
  products: [],
  variant: CategoryVariant.COFFEE,
};

/**
 * Example of a complete category model as stored in the database
 */
const categoryModel: Category = {
  id: "cat-123456",
  name: "Coffee Specialties",
  description: "Premium coffee drinks and espresso-based beverages",
  slug: "coffee-specialties",
  icon: "coffee-cup",
  displayOrder: 1,
  products: ["prod-001", "prod-002", "prod-003"],
  variant: CategoryVariant.COFFEE,
  active: true,
  createdAt: "2023-08-15T10:30:00Z",
  updatedAt: "2023-08-15T10:30:00Z",
  searchTerm: "coffee espresso latte cappuccino",
};

/**
 * Example of a category update model
 */
const categoryUpdateModel: CategoryUpdate = {
  displayOrder: 2,
  backgroundImages: [
    {
      src: "/images/categories/coffee-banner.jpg",
      alt: "Coffee beans and equipment",
      isPrimary: true,
    },
  ],
};

/**
 * Example of a category with all optional properties
 */
const minimalCategoryModel: CategoryCreate = {
  name: "Seasonal Specials",
  description: "Limited time seasonal offerings",
  variant: CategoryVariant.ORANGE,
};

export {
  categoryModel,
  categoryUpdateModel,
  minimalCategoryModel,
  newCategoryModel,
};
