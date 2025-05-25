"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionType = void 0;
/**
 * Promotional campaign classifications
 * @enum {string}
 */
var PromotionType;
(function (PromotionType) {
    /**
     * Direct price reduction promotion
     */
    PromotionType["DISCOUNT"] = "discount";
    /**
     * Buy one, get one free promotion
     */
    PromotionType["BOGO"] = "bogo";
    /**
     * Product bundle with special pricing
     */
    PromotionType["BUNDLE"] = "bundle";
    /**
     * Free shipping promotion
     */
    PromotionType["FREE_SHIPPING"] = "free-shipping";
    /**
     * Complimentary item with qualifying purchase
     */
    PromotionType["GIFT_WITH_PURCHASE"] = "gift-with-purchase";
    /**
     * Limited-time seasonal promotion
     */
    PromotionType["SEASONAL"] = "seasonal";
})(PromotionType || (exports.PromotionType = PromotionType = {}));
//# sourceMappingURL=promotion-type.enum.js.map