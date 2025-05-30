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
  id: z.string().uuid(),
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

export const GetUserRequestSchema = z.object({
  id: z.string().uuid(),
});

export const CreateUserRequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional().default(UserRole.SERVER),
  description: z.string().min(1).optional(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(0).max(50).optional(),
});

export const UpdateUserRequestSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserRole).optional(),
  active: z.boolean().optional(),
});

export const DeleteUserRequestSchema = z.object({
  id: z.string().uuid(),
});

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
