/**
 * Priority levels for events in the system
 * @enum {number}
 */
export var EventPriority;
(function (EventPriority) {
    /**
     * Low priority events, can be processed with delays
     */
    EventPriority[EventPriority["LOW"] = 0] = "LOW";
    /**
     * Normal priority for standard operations
     */
    EventPriority[EventPriority["NORMAL"] = 1] = "NORMAL";
    /**
     * High priority for time-sensitive operations
     */
    EventPriority[EventPriority["HIGH"] = 2] = "HIGH";
    /**
     * Critical priority for urgent operations that need immediate attention
     */
    EventPriority[EventPriority["CRITICAL"] = 3] = "CRITICAL";
})(EventPriority || (EventPriority = {}));
//# sourceMappingURL=event-priority.enum.js.map