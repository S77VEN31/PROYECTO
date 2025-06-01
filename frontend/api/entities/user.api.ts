/**
 * User API service
 * Handles all user-related API calls using shared types and schemas
 */

import { AxiosError } from 'axios';
import {
  ApiResponse,
  CreateUserRequestBody,
  CreateUserResponse,
  DeleteUserRequestParams,
  DeleteUserResponse,
  GetUserRequestParams,
  GetUserResponse,
  GetUsersRequestParams,
  GetUsersResponse,
  PaginatedResponse,
  UpdateUserRequestBody,
  UpdateUserRequestParams,
  UpdateUserResponse,
  User,
} from "colori-platform-shared";
import apiClient from "../index";
import { AuthApiService } from "./auth.api";

/**
 * User API service class
 */
export class UserApiService {
  /**
   * Get all users with optional filtering
   * @param filterParams - Filter and pagination parameters
   * @returns Promise with paginated user list
   */
  static async getUsers(
    filterParams: GetUsersRequestParams = {}
  ): Promise<PaginatedResponse<User>> {
    try {
      const response = await apiClient.get<GetUsersResponse>("/users", {
        params: filterParams,
      });

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
   * @param params - User request parameters
   * @returns Promise with user data
   */
  static async getUserById(params: GetUserRequestParams): Promise<User> {
    try {
      const response = await apiClient.get<GetUserResponse>(
        `/users/${params.id}`
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
  static async createUser(userData: CreateUserRequestBody): Promise<User> {
    try {
      const response = await apiClient.post<CreateUserResponse>(
        "/users",
        userData
      );

      if (response.data.success && response.data.id) {
        // Fetch the created user to return the complete User object
        return await this.getUserById({ id: response.data.id });
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
   * @param params - User request parameters
   * @param userData - User update data
   * @returns Promise with updated user
   */
  static async updateUser(
    params: UpdateUserRequestParams,
    userData: UpdateUserRequestBody
  ): Promise<User> {
    try {
      const response = await apiClient.put<UpdateUserResponse>(
        `/users/${params.id}`,
        userData
      );

      if (response.data.success && response.data.updated) {
        // Fetch the updated user to return the complete User object
        return await this.getUserById({ id: params.id });
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
   * @param params - User request parameters
   * @returns Promise with deletion confirmation
   */
  static async deleteUser(params: DeleteUserRequestParams): Promise<boolean> {
    try {
      const response = await apiClient.delete<DeleteUserResponse>(
        `/users/${params.id}`
      );

      // Handle successful response - backend returns { success: true, deleted: true }
      if (response.data.success && response.data.deleted !== undefined) {
        return response.data.deleted;
      }

      // Handle successful response with different format (e.g., just success: true)
      if (response.data.success) {
        return true;
      }

      // Handle HTTP 200/204 status codes (successful deletion)
      if (response.status === 200 || response.status === 204) {
        return true;
      }

      throw new Error(response.data.message || "Failed to delete user");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiResponse>;

      // If it's a 404 error, the user might already be deleted
      if (axiosError.response?.status === 404) {
        console.warn(
          `User with id ${params.id} not found, might already be deleted`
        );
        return true;
      }

      // If it's a 200 or 204 status but caught as error due to response format
      if (
        axiosError.response?.status === 200 ||
        axiosError.response?.status === 204
      ) {
        return true;
      }

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
