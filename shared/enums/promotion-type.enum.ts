/**
 * Promotional campaign classifications
 * @enum {string}
 */
export enum PromotionType {
  /**
   * Direct price reduction promotion
   */
  DISCOUNT = "discount",

  /**
   * Buy one, get one free promotion
   */
  BOGO = "bogo",

  /**
   * Product bundle with special pricing
   */
  BUNDLE = "bundle",

  /**
   * Free shipping promotion
   */
  FREE_SHIPPING = "free-shipping",

  /**
   * Complimentary item with qualifying purchase
   */
  GIFT_WITH_PURCHASE = "gift-with-purchase",

  /**
   * Limited-time seasonal promotion
   */
  SEASONAL = "seasonal",
}
