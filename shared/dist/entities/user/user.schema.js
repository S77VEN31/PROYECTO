/**
 * Schemas for User entities
 */
import { IdParamSchema, PaginationParamsSchema, SearchableParamsSchema, } from "../../common";
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
    lastLogin: z.string().datetime().nullable(),
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
export const UserUpdateSchema = z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(0).max(50).optional(),
    email: z.string().email().optional(),
    role: z.nativeEnum(UserRole).optional(),
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).optional(),
    active: z.boolean().optional(),
    lastLogin: z.string().datetime().nullable().optional(),
});
/**
 * User request validation schemas
 */
// GET /users - validate query parameters
export const GetUsersRequestSchema = SearchableParamsSchema.merge(PaginationParamsSchema).extend({
    role: z.string().optional(),
});
// GET /users/:id - validate params
export const GetUserRequestParamsSchema = IdParamSchema;
// POST /users - validate body (user data without nesting)
export const CreateUserRequestBodySchema = UserCreateSchema;
// PUT /users/:id - validate params
export const UpdateUserRequestParamsSchema = IdParamSchema;
// PUT /users/:id - validate body (user data excluding password)
export const UpdateUserRequestBodySchema = UserUpdateSchema;
// DELETE /users/:id - validate params
export const DeleteUserRequestParamsSchema = IdParamSchema;
export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
//# sourceMappingURL=user.schema.js.map