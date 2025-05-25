/**
 * Event sources in the system
 * @enum {string}
 */
export enum EventSource {
  /**
   * Point-of-Sale system
   */
  POS = "pos-system",

  /**
   * Payment processing gateway
   */
  PAYMENT_GATEWAY = "payment-gateway",

  /**
   * Kitchen display system
   */
  KITCHEN_DISPLAY = "kitchen-display",

  /**
   * Mobile application
   */
  MOBILE_APP = "mobile-app",

  /**
   * Administrative portal
   */
  ADMIN_PORTAL = "admin-portal",

  /**
   * Integration services with external systems
   */
  INTEGRATION_SERVICE = "integration-service",

  /**
   * Core system components
   */
  SYSTEM = "system",
}
