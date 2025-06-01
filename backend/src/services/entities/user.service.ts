/**
 * User service implementation
 * Handles business logic for user operations and authentication
 */

import { UserModel } from "@models";
import {
  AuthResponse,
  CreateUserRequestBody,
  DeleteUserRequestParams,
  GetUserRequestParams,
  GetUsersRequestParams,
  LoginRequest,
  PaginatedResponse,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  User,
} from "colori-platform-shared";
import jwt from "jsonwebtoken";

/**
 * Transform MongoDB document to User type
 */
function transformToUser(doc: any): User {
  return {
    id: doc._id?.toString() || doc.id,
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    role: doc.role,
    active: doc.active,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastLogin: doc.lastLogin || null,
    searchTerm: doc.searchTerm,
    backgroundImages: doc.backgroundImages || [],
  } as any as User;
}

/**
 * Service for managing user operations
 */
export class UserService {
  /**
   * Find all users with optional filtering and pagination
   */
  static async findAll(
    filterParams: GetUsersRequestParams
  ): Promise<PaginatedResponse<User>> {
    const { page = 1, limit = 10, search, role } = filterParams;

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
      const transformedUsers: User[] = users.map(transformToUser);

      return {
        data: transformedUsers,
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
  static async findById(params: GetUserRequestParams): Promise<User | null> {
    try {
      const user = await UserModel.findById(params.id)
        .select("-password")
        .lean();

      if (!user) {
        return null;
      }

      return transformToUser(user);
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Create a new user
   */
  static async create(data: CreateUserRequestBody): Promise<User> {
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

      const savedUser = await newUser.save();
      const userObj = savedUser.toObject();

      return transformToUser(userObj);
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
  static async update(
    params: UpdateUserRequestParams,
    data: UpdateUserRequestBody
  ): Promise<User> {
    try {
      // Build update object, excluding undefined values
      const updateData: any = {};

      if (data.name !== undefined) updateData.name = data.name;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.firstName !== undefined) updateData.firstName = data.firstName;
      if (data.lastName !== undefined) updateData.lastName = data.lastName;
      if (data.email !== undefined) updateData.email = data.email;
      if (data.role !== undefined) updateData.role = data.role;
      if (data.active !== undefined) updateData.active = data.active;

      // Update the user and return the updated document
      const updatedUser = await UserModel.findByIdAndUpdate(
        params.id,
        updateData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run schema validators
          select: "-password", // Exclude password field
        }
      ).lean();

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return transformToUser(updatedUser);
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
  static async delete(params: DeleteUserRequestParams): Promise<boolean> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(params.id);
      return deletedUser !== null;
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Authenticate a user with email and password
   */
  static async authenticate(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Find user by email and include password for verification
      const userDoc = await UserModel.findOne({
        email: credentials.email,
      }).select("+password");

      if (!userDoc) {
        throw new Error("Invalid email or password");
      }

      // Verify password using the comparePassword method
      const isPasswordValid = await userDoc.comparePassword(
        credentials.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Update last login
      userDoc.lastLogin = new Date().toISOString();
      await userDoc.save();

      const userObj = userDoc.toObject();
      const user = transformToUser(userObj);

      // Create and sign JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: (user as any).email,
          role: (user as any).role,
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
