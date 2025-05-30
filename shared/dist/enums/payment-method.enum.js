/**
 * Supported payment methods available in the system
 * @enum {string}
 */
export var PaymentMethod;
(function (PaymentMethod) {
    /**
     * Cash payment
     */
    PaymentMethod["CASH"] = "cash";
    /**
     * Credit card payment
     */
    PaymentMethod["CREDIT_CARD"] = "credit-card";
    /**
     * Debit card payment
     */
    PaymentMethod["DEBIT_CARD"] = "debit-card";
    /**
     * Mobile payment methods (Apple Pay, Google Pay, etc.)
     */
    PaymentMethod["MOBILE_PAYMENT"] = "mobile-payment";
})(PaymentMethod || (PaymentMethod = {}));
//# sourceMappingURL=payment-method.enum.js.map