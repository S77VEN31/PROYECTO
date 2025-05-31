/**
 * Schemas for User entities
 */
import { EntityMetadataSchema, } from "../../entities";
import { UserRole } from "../../enums";
import { z } from "zod";
/**
 * Schema for core user profile information
 */
export const UserBaseSchema = EntityMetadataSchema.extend({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().email(),
    role: z.nativeEnum(UserRole),
    lastLogin: z.string().datetime(),
    password: z.string().min(6),
});
/**
 * Schema for complete user representation
 */
export const UserSchema = UserBaseSchema.omit({
    password: true,
}).extend({
    id: z.string().min(1),
});
/**
 * Schema for user creation
 */
export const UserCreateSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(0).max(50).optional(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole).optional(),
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    password: z.string().min(6),
});
/**
 * Schema for user updates
 */
export const UserUpdateSchema = UserBaseSchema.omit({
    id: true,
    password: true,
}).partial();
/**
 * User request validation schemas
 */
// GET /users/:id - validate params
export const GetUserRequestParamsSchema = z.object({
    id: z.string().min(1),
});
// POST /users - validate body (user data without nesting)
export const CreateUserRequestBodySchema = UserCreateSchema;
// PUT /users/:id - validate params
export const UpdateUserRequestParamsSchema = z.object({
    id: z.string().min(1),
});
// PUT /users/:id - validate body (user data excluding password)
export const UpdateUserRequestBodySchema = UserUpdateSchema;
// DELETE /users/:id - validate params
export const DeleteUserRequestParamsSchema = z.object({
    id: z.string().min(1),
});
export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
//# sourceMappingURL=user.schema.js.map