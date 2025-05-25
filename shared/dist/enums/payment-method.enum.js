"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
/**
 * Supported payment methods available in the system
 * @enum {string}
 */
var PaymentMethod;
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
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
//# sourceMappingURL=payment-method.enum.js.map