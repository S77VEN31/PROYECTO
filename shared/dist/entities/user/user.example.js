"use strict";
/**
 * @fileoverview Example usage of User types
 * Demonstrates data modeling with user objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateModel = exports.userModel = exports.serverUserModel = exports.newUserModel = void 0;
const enums_1 = require("@shared/enums");
/**
 * Example of a user creation model
 */
const newUserModel = {
    name: "John Smith",
    description: "Café Manager",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    password: "password",
    role: enums_1.UserRole.MANAGER,
    active: true,
};
exports.newUserModel = newUserModel;
/**
 * Example of a complete user model as stored in the database
 */
const userModel = {
    id: "user-123456",
    name: "John Smith",
    description: "Café Manager",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    role: enums_1.UserRole.MANAGER,
    lastLogin: "2023-08-15T08:30:00Z",
    slug: "john-smith",
    active: true,
    createdAt: "2023-07-01T10:00:00Z",
    updatedAt: "2023-08-15T08:30:00Z",
};
exports.userModel = userModel;
/**
 * Example of a user update model
 */
const userUpdateModel = {
    role: enums_1.UserRole.ADMIN,
    lastLogin: "2023-08-16T09:45:00Z",
};
exports.userUpdateModel = userUpdateModel;
/**
 * Example of a user with different role
 */
const serverUserModel = {
    name: "Maria Garcia",
    description: "Senior Server",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    role: enums_1.UserRole.SERVER,
    active: true,
    password: "password",
};
exports.serverUserModel = serverUserModel;
//# sourceMappingURL=user.example.js.map