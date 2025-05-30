/**
 * Authentication API service
 * Handles all authentication-related API calls using shared types and schemas
 */

import { AxiosError } from "axios";
import {
  AuthResponse,
  LoginRequest,
  LoginRequestSchema,
  User,
} from "colori-platform-shared";
import apiClient from "../index";

/**
 * Authentication API service class
 */
export class AuthApiService {
  /**
   * Authenticate user with email and password
   * @param credentials - Login credentials
   * @returns Promise with authentication response
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse<User>> {
    try {
      // Validate input using shared schema
      const validatedCredentials = LoginRequestSchema.parse(credentials);

      const response = await apiClient.post<{
        success: boolean;
        token: string;
        user: User;
        message?: string;
      }>("/auth/login", validatedCredentials);

      if (response.data.success && response.data.token && response.data.user) {
        // Store token and user data in localStorage
        const { token, user } = response.data;
        this.setAuthData(token, user);

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
      this.clearAuthData();
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

  /**
   * Get authentication token from localStorage
   * @returns Authentication token or null if not found
   */
  static getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  /**
   * Set authentication data in localStorage
   * @param token - Authentication token
   * @param user - User data
   */
  static setAuthData(token: string, user: User): void {
    if (typeof window === "undefined") return;

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));
  }

  /**
   * Clear authentication data from localStorage
   * Centralized method for logout functionality
   */
  static clearAuthData(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    // Dispatch custom event for centralized logout handling
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  /**
   * Force logout - clears auth data and triggers logout event
   * Used for centralized logout from anywhere in the application
   */
  static forceLogout(): void {
    this.clearAuthData();

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  /**
   * Refresh authentication token
   * @returns Promise with new authentication response
   */
  static async refreshToken(): Promise<AuthResponse<User> | null> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        token: string;
        user: User;
        message?: string;
      }>("/auth/refresh");

      if (response.data.success && response.data.token && response.data.user) {
        const { token, user } = response.data;
        this.setAuthData(token, user);
        return { token, user };
      }

      return null;
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.forceLogout();
      return null;
    }
  }
}
