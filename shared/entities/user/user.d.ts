/**
 * Type declarations for User entities
 */

import { EntityBase, EntityMetadata } from "@shared/entities";
import { UserRole } from "@shared/enums";

/**
 * Core user profile information with authentication details
 * @interface UserBase
 * @extends EntityMetadata
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address, used for login
 * @property {UserRole} role - User's role/permission level in the system
 * @property {string} lastLogin - ISO timestamp of the user's most recent login
 */
export declare interface UserBase extends EntityMetadata {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  lastLogin: string | null;
  password: string;
}

/**
 * Complete user representation with unique identifier
 * @interface User
 * @extends UserBase
 * @property {string} id - Unique identifier for the user
 */
export declare interface User
  extends Omit<UserBase, "password">,
    Pick<EntityBase, "id"> {}

/**
 * Input type for user creation operations
 * @type UserCreate
 */
export declare type UserCreate = Omit<Partial<User>, "id"> &
  Pick<EntityBase, "name" | "description"> & {
    password: string;
    firstName: string;
    lastName?: string;
    email: string;
    role?: UserRole;
  };

/**
 * Input type for user profile update operations
 * @type UserUpdate
 */
export declare type UserUpdate = Omit<Partial<User>, "id">;

/**
 * @fileoverview User API request and response type definitions
 */

import {
  ApiResponse,
  CreateResponse,
  DeleteResponse,
  GetResponse,
  IdParam,
  PaginatedResponse,
  PaginationParams,
  SearchableParams,
  UpdateResponse,
} from "@shared/common";

/**
 * User filter parameters
 * @interface UserFilterParams
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {string} [role] - Filter by user role
 */
export interface UserFilterParams extends PaginationParams, SearchableParams {
  role?: string;
}

// GET /users
export interface GetUsersRequest extends UserFilterParams {}

export interface GetUsersResponse
  extends ApiResponse<PaginatedResponse<User>> {}

// GET /users/:id - params only
export interface GetUserRequestParams extends IdParam {}

export interface GetUserResponse extends GetResponse<User> {}

// POST /users - body only (user data without nesting)
export interface CreateUserRequestBody extends UserCreate {}

export interface CreateUserResponse extends CreateResponse<UserCreate> {}

// PUT /users/:id - params + body (user data excluding password)
export interface UpdateUserRequestParams extends IdParam {}

export interface UpdateUserRequestBody extends UserUpdate {}

export interface UpdateUserResponse extends UpdateResponse<UserUpdate> {}

// DELETE /users/:id - params only
export interface DeleteUserRequestParams extends IdParam {}

export interface DeleteUserResponse extends DeleteResponse<User> {}

// Authentication related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LogoutResponse {
  success: boolean;
}

// Express compatible request parameter types (keeping for backward compatibility)
export type GetUserRequestParams = IdParam;

export type UpdateUserRequestParams = IdParam;

export type DeleteUserRequestParams = IdParam;
