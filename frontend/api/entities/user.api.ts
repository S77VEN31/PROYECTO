/**
 * User API service
 * Handles all user-related API calls using shared types and schemas
 */

import { AxiosError } from 'axios';
import {
  ApiResponse,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
  PaginatedResponse,
  User,
  UserCreate,
  UserCreateSchema,
  UserFilterOptions,
  UserUpdate,
  UserUpdateSchema,
} from "colori-platform-shared";
import apiClient from "../index";
import { AuthApiService } from "./auth.api";

/**
 * User API service class
 */
export class UserApiService {
  /**
   * Get all users with optional filtering
   * @param options - Filter and pagination options
   * @returns Promise with paginated user list
   */
  static async getUsers(
    options: UserFilterOptions = {}
  ): Promise<PaginatedResponse<User>> {
    try {
      const response = await apiClient.get<
        ApiResponse<PaginatedResponse<User>>
      >("/users", { params: options });

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || "Failed to fetch users");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to fetch users"
      );
    }
  }

  /**
   * Get user by ID
   * @param id - User ID
   * @returns Promise with user data
   */
  static async getUserById(id: string): Promise<User> {
    try {
      // Validate input using shared schema
      const validatedParams = GetUserRequestSchema.parse({ id });

      const response = await apiClient.get<ApiResponse<User>>(
        `/users/${validatedParams.id}`
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || "User not found");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to fetch user"
      );
    }
  }

  /**
   * Create new user
   * @param userData - User creation data
   * @returns Promise with created user
   */
  static async createUser(userData: UserCreate): Promise<User> {
    try {
      // Validate input using shared schema
      const validatedData = UserCreateSchema.parse(userData);

      const response = await apiClient.post<ApiResponse<User>>(
        "/users",
        validatedData
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || "Failed to create user");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to create user"
      );
    }
  }

  /**
   * Update existing user
   * @param id - User ID
   * @param userData - User update data
   * @returns Promise with updated user
   */
  static async updateUser(id: string, userData: UserUpdate): Promise<User> {
    try {
      // Validate input using shared schemas
      const validatedParams = GetUserRequestSchema.parse({ id });
      const validatedData = UserUpdateSchema.parse(userData);

      const response = await apiClient.put<ApiResponse<User>>(
        `/users/${validatedParams.id}`,
        validatedData
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.message || "Failed to update user");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to update user"
      );
    }
  }

  /**
   * Delete user by ID
   * @param id - User ID
   * @returns Promise with deletion confirmation
   */
  static async deleteUser(id: string): Promise<boolean> {
    try {
      // Validate input using shared schema
      const validatedParams = DeleteUserRequestSchema.parse({ id });

      const response = await apiClient.delete<
        ApiResponse<{ deleted: boolean }>
      >(`/users/${validatedParams.id}`);

      if (response.data.success && response.data.data) {
        return response.data.data.deleted;
      }

      throw new Error(response.data.message || "Failed to delete user");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to delete user"
      );
    }
  }

  /**
   * Get current user from localStorage
   * @returns User data or null if not logged in
   * @deprecated Use AuthApiService.getCurrentUser() instead
   */
  static getCurrentUser(): User | null {
    return AuthApiService.getCurrentUser();
  }

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   * @deprecated Use AuthApiService.isAuthenticated() instead
   */
  static isAuthenticated(): boolean {
    return AuthApiService.isAuthenticated();
  }
}
