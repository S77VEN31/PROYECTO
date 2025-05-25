"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPriority = void 0;
/**
 * Priority levels for events in the system
 * @enum {number}
 */
var EventPriority;
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
})(EventPriority || (exports.EventPriority = EventPriority = {}));
//# sourceMappingURL=event-priority.enum.js.map