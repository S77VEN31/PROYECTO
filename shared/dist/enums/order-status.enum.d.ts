/**
 * Order processing stages in the system
 * @enum {string}
 */
export declare enum OrderStatus {
    /**
     * Order has been created but processing has not started
     */
    PENDING = "pending",
    /**
     * Order is currently being prepared
     */
    IN_PROGRESS = "in-progress",
    /**
     * Order has been fulfilled and delivered
     */
    COMPLETED = "completed",
    /**
     * Order has been terminated before completion
     */
    CANCELLED = "cancelled"
}
