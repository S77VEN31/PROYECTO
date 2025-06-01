/**
 * Type declarations for User entities
 */

import { Image } from "@shared/common";
import { ClientEntity, DatabaseEntity, EntityMetadata } from "@shared/entities";
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
 * Complete user representation for client-side (API responses, frontend)
 * @interface User
 * @extends ClientEntity<UserBase>
 * @property {string} id - Unique identifier for the user
 * @property {string} name - Name of the user
 * @property {string} description - Description of the user
 * @property {boolean} [active] - Whether the user is active
 * @property {string} slug - URL-friendly identifier
 * @property {string} [searchTerm] - Additional search keywords
 * @property {Image[]} [backgroundImages] - Background images for the user
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {UserRole} role - User's role/permission level
 * @property {string} lastLogin - ISO timestamp of the user's most recent login
 */
export declare interface User extends ClientEntity<Omit<UserBase, "password">> {
  // Explicit declaration of inherited properties for better type resolution
  // From EntityBase
  name: string;
  description: string;
  active?: boolean;
  // From EntityMetadata
  slug: string;
  searchTerm?: string;
  backgroundImages?: Image[];
  // From UserBase (excluding password)
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  lastLogin: string | null;
}

/**
 * User representation for database operations (backend)
 * @interface UserDocument
 * @extends DatabaseEntity<UserBase>
 * @property {string} _id - MongoDB ObjectId as string
 */
export declare interface UserDocument extends DatabaseEntity<UserBase> {}

/**
 * Input type for user creation operations
 * @type UserCreate
 */
export declare type UserCreate = {
  // Required fields from EntityBase
  name: string;
  description: string;
  // Required user-specific fields
  firstName: string;
  email: string;
  password: string;
  // Optional fields
  lastName?: string;
  role?: UserRole;
  lastLogin?: string | null;
  // Optional EntityBase fields
  active?: boolean;
  // Optional EntityMetadata fields
  slug?: string;
  searchTerm?: string;
  backgroundImages?: Image[];
};

/**
 * Input type for user profile update operations
 * @type UserUpdate
 */
export declare type UserUpdate = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  name: string;
  description: string;
  active: boolean;
  slug: string;
  searchTerm: string;
  backgroundImages: Image[];
}>;

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
export interface GetUsersRequestParams extends UserFilterParams {}

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
