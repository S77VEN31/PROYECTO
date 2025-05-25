"use strict";
/**
 * Schemas for User entities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestSchema = exports.DeleteUserRequestSchema = exports.UpdateUserRequestSchema = exports.CreateUserRequestSchema = exports.GetUserRequestSchema = exports.UserUpdateSchema = exports.UserCreateSchema = exports.UserSchema = exports.UserBaseSchema = void 0;
const entities_1 = require("@shared/entities");
const enums_1 = require("@shared/enums");
const zod_1 = require("zod");
/**
 * Schema for core user profile information
 */
exports.UserBaseSchema = entities_1.EntityMetadataSchema.extend({
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    email: zod_1.z.string().email(),
    role: zod_1.z.nativeEnum(enums_1.UserRole),
    lastLogin: zod_1.z.string().datetime(),
    password: zod_1.z.string().min(6),
});
/**
 * Schema for complete user representation
 */
exports.UserSchema = exports.UserBaseSchema.omit({
    password: true,
}).extend({
    id: zod_1.z.string().uuid(),
});
/**
 * Schema for user creation
 */
exports.UserCreateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
    email: zod_1.z.string().email(),
    role: zod_1.z.nativeEnum(enums_1.UserRole).optional(),
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    password: zod_1.z.string().min(6),
});
/**
 * Schema for user updates
 */
exports.UserUpdateSchema = exports.UserBaseSchema.omit({
    id: true,
    password: true,
}).partial();
/**
 * User request validation schemas
 */
exports.GetUserRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.CreateUserRequestSchema = zod_1.z.object({
    user: zod_1.z.object({
        firstName: zod_1.z.string().min(1).max(50),
        lastName: zod_1.z.string().min(1).max(50),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
        role: zod_1.z.nativeEnum(enums_1.UserRole).optional(),
        active: zod_1.z.boolean().optional().default(true),
    }),
    password: zod_1.z.string().min(6),
});
exports.UpdateUserRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    user: zod_1.z.object({
        firstName: zod_1.z.string().min(1).max(50).optional(),
        lastName: zod_1.z.string().min(1).max(50).optional(),
        email: zod_1.z.string().email().optional(),
        role: zod_1.z.nativeEnum(enums_1.UserRole).optional(),
        active: zod_1.z.boolean().optional(),
    }),
});
exports.DeleteUserRequestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.LoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
//# sourceMappingURL=user.schema.js.map