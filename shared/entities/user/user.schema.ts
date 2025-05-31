/**
 * Schemas for User entities
 */

import {
  EntityMetadataSchema,
  User,
  UserBase,
  UserCreate,
  UserUpdate,
} from "@shared/entities";
import { UserRole } from "@shared/enums";
import { z } from "zod";
import {
  CreateUserRequestBody,
  DeleteUserRequestParams,
  GetUserRequestParams,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
} from "./user.d";

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
export const UserUpdateSchema = UserBaseSchema.omit({
  id: true,
  password: true,
}).partial() satisfies z.ZodType<UserUpdate>;

/**
 * User request validation schemas
 */

// GET /users/:id - validate params
export const GetUserRequestParamsSchema = z.object({
  id: z.string().min(1),
}) satisfies z.ZodType<GetUserRequestParams>;

// POST /users - validate body (user data without nesting)
export const CreateUserRequestBodySchema =
  UserCreateSchema satisfies z.ZodType<CreateUserRequestBody>;

// PUT /users/:id - validate params
export const UpdateUserRequestParamsSchema = z.object({
  id: z.string().min(1),
}) satisfies z.ZodType<UpdateUserRequestParams>;

// PUT /users/:id - validate body (user data excluding password)
export const UpdateUserRequestBodySchema =
  UserUpdateSchema satisfies z.ZodType<UpdateUserRequestBody>;

// DELETE /users/:id - validate params
export const DeleteUserRequestParamsSchema = z.object({
  id: z.string().min(1),
}) satisfies z.ZodType<DeleteUserRequestParams>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
