"use strict";
/**
 * @fileoverview Example usage of Promotion types
 * Demonstrates data modeling with promotion objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.seasonalPromotionModel = exports.promotionUpdateModel = exports.promotionModel = exports.discountPromotionModel = exports.bogoPromotionModel = void 0;
const enums_1 = require("../../enums");
/**
 * Example of a discount promotion creation model
 */
const discountPromotionModel = {
    name: "Weekend Special",
    description: "15% off on all coffee drinks during the weekend",
    type: enums_1.PromotionType.DISCOUNT,
    startDate: "2023-08-18T00:00:00Z",
    endDate: "2023-08-20T23:59:59Z",
    code: "WEEKEND15",
    discountPercent: 15,
    applicableCategories: ["cat-coffee"],
};
exports.discountPromotionModel = discountPromotionModel;
/**
 * Example of a BOGO (Buy One Get One) promotion creation model
 */
const bogoPromotionModel = {
    name: "Buy One Get One Free",
    description: "Buy any espresso drink and get a second one free",
    type: enums_1.PromotionType.BOGO,
    startDate: "2023-08-15T00:00:00Z",
    endDate: "2023-08-22T23:59:59Z",
    applicableProducts: ["prod-001", "prod-002", "prod-003"],
    usageLimit: 100,
};
exports.bogoPromotionModel = bogoPromotionModel;
/**
 * Example of a complete promotion model as stored in the database
 */
const promotionModel = {
    id: "promo-12345",
    name: "Weekend Special",
    description: "15% off on all coffee drinks during the weekend",
    slug: "weekend-special",
    type: enums_1.PromotionType.DISCOUNT,
    startDate: "2023-08-18T00:00:00Z",
    endDate: "2023-08-20T23:59:59Z",
    code: "WEEKEND15",
    discountPercent: 15,
    minimumPurchase: 10,
    applicableCategories: ["cat-coffee"],
    active: true,
    createdAt: "2023-08-15T14:00:00Z",
    updatedAt: "2023-08-15T14:00:00Z",
};
exports.promotionModel = promotionModel;
/**
 * Example of a promotion update model
 */
const promotionUpdateModel = {
    endDate: "2023-08-25T23:59:59Z",
    discountPercent: 20,
};
exports.promotionUpdateModel = promotionUpdateModel;
/**
 * Example of a seasonal promotion model
 */
const seasonalPromotionModel = {
    name: "Summer Specials",
    description: "Limited time summer drinks with 10% discount",
    type: enums_1.PromotionType.SEASONAL,
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-08-31T23:59:59Z",
    discountPercent: 10,
};
exports.seasonalPromotionModel = seasonalPromotionModel;
//# sourceMappingURL=promotion.example.js.map