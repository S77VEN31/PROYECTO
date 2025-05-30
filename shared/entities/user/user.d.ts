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

import { IdParam, PaginationParams } from "@shared/common";
import { User, UserCreate, UserUpdate } from "@shared/entities";

// GET /users
export interface GetUsersRequest extends PaginationParams {
  role?: string;
  search?: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// GET /users/:id
export interface GetUserRequest extends IdParam {}

export interface GetUserResponse {
  user: User;
}

// POST /users
export interface CreateUserRequest {
  user: UserCreate;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  user: User;
}

// PUT /users/:id
export interface UpdateUserRequest extends IdParam {
  user: UserUpdate;
}

export interface UpdateUserResponse {
  updated: boolean;
  user: User;
}

// DELETE /users/:id
export interface DeleteUserRequest extends IdParam {}

export interface DeleteUserResponse {
  deleted: boolean;
}

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

// Express compatible request parameter types
export type GetUserRequestParams = {
  id: string;
};

export type UpdateUserRequestParams = {
  id: string;
};

export type DeleteUserRequestParams = {
  id: string;
};
