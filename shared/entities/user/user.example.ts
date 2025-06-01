/**
 * @fileoverview Example usage of User types
 * Demonstrates data modeling with user objects
 */

import { User, UserCreate, UserUpdate } from "@shared/entities";
import { UserRole } from "@shared/enums";

/**
 * Example of a user creation model
 */
const newUserModel: UserCreate = {
  name: "John Smith",
  description: "Café Manager",
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  password: "password",
  role: UserRole.MANAGER,
  active: true,
};

/**
 * Example of a complete user model as stored in the database
 */
const userModel = {
  id: "user-123456",
  // EntityBase fields
  name: "John Smith",
  description: "Café Manager",
  active: true,
  createdAt: "2023-07-01T10:00:00Z",
  updatedAt: "2023-08-15T08:30:00Z",
  // EntityMetadata fields
  slug: "john-smith",
  // UserBase specific fields (excluding password)
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  role: UserRole.MANAGER,
  lastLogin: "2023-08-15T08:30:00Z",
} as User;

/**
 * Example of a user update model
 */
const userUpdateModel: UserUpdate = {
  role: UserRole.ADMIN,
  // Note: lastLogin is not in UserUpdate type, it's typically set by the system
};

/**
 * Example of a user with different role
 */
const serverUserModel: UserCreate = {
  name: "Maria Garcia",
  description: "Senior Server",
  firstName: "Maria",
  lastName: "Garcia",
  email: "maria.garcia@example.com",
  role: UserRole.SERVER,
  active: true,
  password: "password",
};

export { newUserModel, serverUserModel, userModel, userUpdateModel };

