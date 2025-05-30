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

    try {
      // Build query filters
      const query: any = {};

      // Add role filter if provided
      if (role) {
        query.role = role;
      }

      // Add search filter if provided (search in name, email, firstName, lastName)
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Execute queries
      const [users, total] = await Promise.all([
        UserModel.find(query)
          .select("-password") // Exclude password field
          .sort({ createdAt: -1 }) // Sort by newest first
          .skip(skip)
          .limit(limit)
          .lean(), // Use lean() for better performance
        UserModel.countDocuments(query),
      ]);

      // Transform MongoDB documents to User format
      const transformedUsers: User[] = users.map((user: any) => ({
        id: user._id.toString(),
        name: user.name,
        description: user.description,
        slug: user.slug,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin || null,
      }));

      return {
        results: transformedUsers,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  /**
   * Find a single user by ID
   */
  static async findById(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(id).select("-password").lean();

      if (!user) {
        return null;
      }

      // Transform MongoDB document to User format
      return {
        id: user._id.toString(),
        name: user.name,
        description: user.description,
        slug: user.slug,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        active: user.active,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin || null,
      } as User;
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Create a new user
   */
  static async create(data: UserCreate): Promise<User> {
    try {
      // Use provided firstName/lastName or extract from name as fallback
      let firstName = data.firstName;
      let lastName = data.lastName;
      
      if (!firstName) {
        const nameParts = data.name.trim().split(" ");
        firstName = nameParts[0] || "";
        lastName = lastName || nameParts.slice(1).join(" ") || "";
      }

      // Ensure we have at least a firstName
      if (!firstName) {
        throw new Error("First name is required");
      }

      const newUser = new UserModel({
        name: data.name,
        description: data.description || `User profile for ${data.name}`,
        firstName,
        lastName: lastName || "", // Default to empty string if not provided
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

  /**
   * Update an existing user
   */
  static async update(id: string, data: UserUpdate): Promise<User> {
    try {
      // Build update object, excluding undefined values
      const updateData: any = {};
      
      if (data.name !== undefined) updateData.name = data.name;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.firstName !== undefined) updateData.firstName = data.firstName;
      if (data.lastName !== undefined) updateData.lastName = data.lastName;
      if (data.email !== undefined) updateData.email = data.email;
      if (data.role !== undefined) updateData.role = data.role;
      if (data.active !== undefined) updateData.active = data.active;

      // Update the user and return the updated document
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        updateData,
        { 
          new: true, // Return the updated document
          runValidators: true, // Run schema validators
          select: "-password" // Exclude password field
        }
      ).lean();

      if (!updatedUser) {
        throw new Error("User not found");
      }

      // Transform MongoDB document to User format
      return {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        description: updatedUser.description,
        slug: updatedUser.slug,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        active: updatedUser.active,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        lastLogin: updatedUser.lastLogin || null,
      } as User;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Delete a user by ID
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return deletedUser !== null;
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
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
