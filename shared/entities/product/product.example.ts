/**
 * @fileoverview Example usage of Product types
 * Demonstrates data modeling with product objects
 */

import {
  NutritionalInfo,
  Product,
  ProductCreate,
  ProductUpdate,
} from "@shared/entities";

/**
 * Example of a nutritional information model
 */
const nutritionalInfoModel: NutritionalInfo = {
  calories: 5,
  protein: 0.1,
  carbs: 1.5,
  fat: 0,
  allergens: [],
};

/**
 * Example of a product creation model
 */
const newProductModel: ProductCreate = {
  name: "Espresso",
  description: "Single shot of our signature espresso blend",
  price: 3.5,
  longDescription:
    "Our signature espresso is crafted from a blend of ethically sourced beans, roasted to perfection to bring out rich chocolate and caramel notes.",
  tags: ["coffee", "espresso", "hot"],
  nutritionalInfo: nutritionalInfoModel,
  preparationTime: 3,
};

/**
 * Example of a complete product model as stored in the database
 */
const productModel: Product = {
  id: "prod-001",
  slug: "espresso",
  price: 3.5,
  name: "Espresso",
  description: "Single shot of our signature espresso blend",
  longDescription:
    "Our signature espresso is crafted from a blend of ethically sourced beans, roasted to perfection to bring out rich chocolate and caramel notes.",
  tags: ["coffee", "espresso", "hot"],
  nutritionalInfo: nutritionalInfoModel,
  preparationTime: 3,
  active: true,
  createdAt: "2023-08-15T10:00:00Z",
  updatedAt: "2023-08-15T10:00:00Z",
  searchTerm: "espresso coffee shot hot",
};

/**
 * Example of a product update model
 */
const productUpdateModel: ProductUpdate = {
  price: 4.0,
};

/**
 * Example of a product with minimal properties
 */
const minimalProductModel: ProductCreate = {
  name: "Filtered Coffee",
  description: "House blend filtered coffee",
  price: 2.5,
};

export {
  minimalProductModel,
  newProductModel,
  nutritionalInfoModel,
  productModel,
  productUpdateModel,
};
