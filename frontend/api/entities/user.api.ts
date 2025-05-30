/**
 * User API service
 * Handles all user-related API calls using shared types
 */

import { AxiosError } from "axios";
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  PaginatedResponse,
  User,
  UserCreate,
  UserFilterOptions,
  UserUpdate,
} from "colori-platform-shared";
import apiClient from "../index";

/**
 * User API service class
 */
export class UserApiService {
  /**
   * Authenticate user with email and password
   * @param credentials - Login credentials
   * @returns Promise with authentication response
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse<User>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        token: string;
        user: User;
        message?: string;
      }>("/auth/login", credentials);

      if (response.data.success && response.data.token && response.data.user) {
        // Store token and user data in localStorage
        const { token, user } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));

        return { token, user };
      }

      throw new Error(response.data.message || "Login failed");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        success: boolean;
        message?: string;
        error?: string;
      }>;
      throw new Error(
        axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Login failed"
      );
    }
  }

  /**
   * Logout current user
   * @returns Promise with logout confirmation
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      // Always clear local storage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    }
  }

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
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);

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
      const response = await apiClient.post<ApiResponse<User>>(
        "/users",
        userData
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
      const response = await apiClient.put<ApiResponse<User>>(
        `/users/${id}`,
        userData
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
      const response = await apiClient.delete<
        ApiResponse<{ deleted: boolean }>
      >(`/users/${id}`);

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
   */
  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    try {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   * @returns Boolean indicating authentication status
   */
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    return !!(token && userData);
  }
}
