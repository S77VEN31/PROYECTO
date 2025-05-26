/**
 * User service implementation
 * Handles business logic for user operations and authentication
 */

import { UserModel } from "@models";
import {
  AuthResponse,
  PaginatedResponse,
  User,
  UserCreate,
  UserFilterOptions,
  UserUpdate,
} from "colori-platform-shared";
import jwt from "jsonwebtoken";

/**
 * Service for managing user operations
 */
export class UserService {
  /**
   * Find all users with optional filtering and pagination
   */
  static async findAll(
    options: UserFilterOptions
  ): Promise<PaginatedResponse<User>> {
    const { page = 1, limit = 10, search, role } = options;

    // TODO: Implement actual database interaction
    // Mock implementation for now
    const mockUsers: User[] = [];

    return {
      results: mockUsers,
      total: mockUsers.length,
      page,
      limit,
      pages: Math.ceil(mockUsers.length / limit),
    };
  }

  /**
   * Find a single user by ID
   */
  static async findById(id: string): Promise<User | null> {
    // TODO: Implement actual database interaction
    // Mock implementation for now
    return null;
  }

  /**
   * Create a new user
   */
  static async create(data: UserCreate): Promise<User> {
    {
      try {
        // Split name into firstName and lastName for the model
        const nameParts = data.name.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const newUser = new UserModel({
          name: data.name,
          description: `User profile for ${data.name}`,
          firstName,
          lastName,
          email: data.email,
          password: data.password,
          role: data.role,
          active: true,
        });

        const savedUser = (await newUser.save()) as User;

        // Convert to User format (excluding password)

        return {
          id: savedUser.id,
          name: savedUser.name,
          description: savedUser.description,
          slug: savedUser.slug,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
          active: savedUser.active,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
          lastLogin: savedUser.lastLogin || null,
        } as User;
      } catch (error: any) {
        if (error.code === 11000) {
          throw new Error("Email already exists");
        }
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
  }

  /**
   * Update an existing user
   */
  static async update(id: string, data: UserUpdate): Promise<User> {
    // TODO: Implement actual database interaction
    // Mock implementation for now
    return {
      id,
      firstName: data.firstName || "Updated",
      lastName: data.lastName || "User",
      email: data.email || "updated@example.com",
      role: data.role || "USER",
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: data.active ?? true,
    } as unknown as User;
  }

  /**
   * Delete a user by ID
   */
  static async delete(id: string): Promise<boolean> {
    // TODO: Implement actual database interaction
    // Mock implementation for now
    return true;
  }

  /**
   * Authenticate a user with email and password
   */
  static async authenticate(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      // Find user by email and include password for verification
      const userDoc = await UserModel.findOne({ email }).select("+password");

      if (!userDoc) {
        throw new Error("Invalid email or password");
      }

      // Verify password using the comparePassword method
      const isPasswordValid = await userDoc.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Update last login
      userDoc.lastLogin = new Date().toISOString();
      await userDoc.save();

      // Convert to User format (excluding password)

      const user: User = {
        id: userDoc._id.toString(),
        name: userDoc.name,
        description: userDoc.description,
        slug: userDoc.slug,
        firstName: userDoc.firstName!,
        lastName: userDoc.lastName!,
        email: userDoc.email!,
        role: userDoc.role!,
        active: userDoc.active!,
        createdAt: userDoc.createdAt,
        updatedAt: userDoc.updatedAt,
        lastLogin: userDoc.lastLogin,
      };

      // Create and sign JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      return { user, token };
    } catch (error: any) {
      throw new Error("Invalid email or password");
    }
  }
}
