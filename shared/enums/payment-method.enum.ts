/**
 * Supported payment methods available in the system
 * @enum {string}
 */
export enum PaymentMethod {
  /**
   * Cash payment
   */
  CASH = "cash",

  /**
   * Card payment (credit or debit)
   */
  CARD = "card",

  /**
   * SINPE Móvil (Costa Rica mobile payment system)
   */
  SINPE_MOVIL = "sinpe-movil",
}
