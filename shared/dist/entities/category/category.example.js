"use strict";
/**
 * @fileoverview Example usage of Category types
 * Demonstrates data modeling with category objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCategoryModel = exports.minimalCategoryModel = exports.categoryUpdateModel = exports.categoryModel = void 0;
const enums_1 = require("../../enums");
/**
 * Example of a category creation model
 */
const newCategoryModel = {
    name: "Coffee Specialties",
    description: "Premium coffee drinks and espresso-based beverages",
    slug: "coffee-specialties",
    icon: "coffee-cup",
    displayOrder: 1,
    products: [],
    variant: enums_1.CategoryVariant.COFFEE,
};
exports.newCategoryModel = newCategoryModel;
/**
 * Example of a complete category model as stored in the database
 */
const categoryModel = {
    id: "cat-123456",
    name: "Coffee Specialties",
    description: "Premium coffee drinks and espresso-based beverages",
    slug: "coffee-specialties",
    icon: "coffee-cup",
    displayOrder: 1,
    products: ["prod-001", "prod-002", "prod-003"],
    variant: enums_1.CategoryVariant.COFFEE,
    active: true,
    createdAt: "2023-08-15T10:30:00Z",
    updatedAt: "2023-08-15T10:30:00Z",
    searchTerm: "coffee espresso latte cappuccino",
};
exports.categoryModel = categoryModel;
/**
 * Example of a category update model
 */
const categoryUpdateModel = {
    displayOrder: 2,
    backgroundImages: [
        {
            src: "/images/categories/coffee-banner.jpg",
            alt: "Coffee beans and equipment",
            isPrimary: true,
        },
    ],
};
exports.categoryUpdateModel = categoryUpdateModel;
/**
 * Example of a category with all optional properties
 */
const minimalCategoryModel = {
    name: "Seasonal Specials",
    description: "Limited time seasonal offerings",
    variant: enums_1.CategoryVariant.ORANGE,
};
exports.minimalCategoryModel = minimalCategoryModel;
//# sourceMappingURL=category.example.js.map