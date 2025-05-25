"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
/**
 * User role enumeration defining permission levels in the system
 * @enum {string}
 */
var UserRole;
(function (UserRole) {
    /**
     * System administrator with full access to all features
     */
    UserRole["ADMIN"] = "admin";
    /**
     * Store manager with access to operational data and reports
     */
    UserRole["MANAGER"] = "manager";
    /**
     * Kitchen staff responsible for order preparation
     */
    UserRole["CHEF"] = "chef";
    /**
     * Staff member serving customers and processing orders
     */
    UserRole["SERVER"] = "server";
    /**
     * Staff member handling payment transactions
     */
    UserRole["CASHIER"] = "cashier";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=user-roles.enum.js.map