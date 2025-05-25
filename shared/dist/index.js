"use strict";
/**
 * Main export file for the shared module
 * Re-exports all types, utilities, enums, and schemas from submodules
 *
 * @module shared
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Common utility types and schemas
 */
__exportStar(require("./common"), exports);
/**
 * Entity type definitions and schemas
 */
__exportStar(require("./entities"), exports);
/**
 * Enumeration types for the application
 */
__exportStar(require("./enums"), exports);
/**
 * Transaction-related types and schemas
 */
__exportStar(require("./transactions"), exports);
//# sourceMappingURL=index.js.map