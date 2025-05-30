/**
 * Event sources in the system
 * @enum {string}
 */
export var EventSource;
(function (EventSource) {
    /**
     * Point-of-Sale system
     */
    EventSource["POS"] = "pos-system";
    /**
     * Payment processing gateway
     */
    EventSource["PAYMENT_GATEWAY"] = "payment-gateway";
    /**
     * Kitchen display system
     */
    EventSource["KITCHEN_DISPLAY"] = "kitchen-display";
    /**
     * Mobile application
     */
    EventSource["MOBILE_APP"] = "mobile-app";
    /**
     * Administrative portal
     */
    EventSource["ADMIN_PORTAL"] = "admin-portal";
    /**
     * Integration services with external systems
     */
    EventSource["INTEGRATION_SERVICE"] = "integration-service";
    /**
     * Core system components
     */
    EventSource["SYSTEM"] = "system";
})(EventSource || (EventSource = {}));
//# sourceMappingURL=event-source.enum.js.map