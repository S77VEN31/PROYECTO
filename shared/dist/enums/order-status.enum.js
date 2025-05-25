"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
/**
 * Order processing stages in the system
 * @enum {string}
 */
var OrderStatus;
(function (OrderStatus) {
    /**
     * Order has been created but processing has not started
     */
    OrderStatus["PENDING"] = "pending";
    /**
     * Order is currently being prepared
     */
    OrderStatus["IN_PROGRESS"] = "in-progress";
    /**
     * Order has been fulfilled and delivered
     */
    OrderStatus["COMPLETED"] = "completed";
    /**
     * Order has been terminated before completion
     */
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=order-status.enum.js.map