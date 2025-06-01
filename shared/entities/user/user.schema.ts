/**
 * Schemas for User entities
 */

import {
  IdParamSchema,
  PaginationParamsSchema,
  SearchableParamsSchema,
} from "@shared/common";
import {
  CreateUserRequestBody,
  DeleteUserRequestParams,
  EntityMetadataSchema,
  GetUserRequestParams,
  GetUsersRequestParams,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  User,
  UserBase,
  UserCreate,
  UserUpdate,
} from "@shared/entities";
import { UserRole } from "@shared/enums";
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
}) satisfies z.ZodType<UserBase>;

/**
 * Schema for complete user representation
 */
export const UserSchema = UserBaseSchema.omit({
  password: true,
}).extend({
  id: z.string().min(1),
}) satisfies z.ZodType<User>;

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
}) satisfies z.ZodType<UserCreate>;

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
}) satisfies z.ZodType<UserUpdate>;

/**
 * User request validation schemas
 */

// GET /users - validate query parameters
export const GetUsersRequestParamsSchema = SearchableParamsSchema.merge(
  PaginationParamsSchema
).extend({
  role: z.string().optional(),
}) satisfies z.ZodType<GetUsersRequestParams>;

// GET /users/:id - validate params
export const GetUserRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<GetUserRequestParams>;

// POST /users - validate body (user data without nesting)
export const CreateUserRequestBodySchema =
  UserCreateSchema satisfies z.ZodType<CreateUserRequestBody>;

// PUT /users/:id - validate params
export const UpdateUserRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<UpdateUserRequestParams>;

// PUT /users/:id - validate body (user data excluding password)
export const UpdateUserRequestBodySchema =
  UserUpdateSchema satisfies z.ZodType<UpdateUserRequestBody>;

// DELETE /users/:id - validate params
export const DeleteUserRequestParamsSchema =
  IdParamSchema satisfies z.ZodType<DeleteUserRequestParams>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
