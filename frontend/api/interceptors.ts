/**
 * API interceptors for handling authentication and errors
 */

import { AxiosError, AxiosResponse } from "axios";
import { AuthApiService } from "./entities/auth.api";
import apiClient from "./index";

/**
 * Setup API interceptors for authentication handling
 */
export function setupApiInterceptors(): void {
  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    (config) => {
      const token = AuthApiService.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle auth errors
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      // Handle authentication errors
      if (error.response?.status === 401) {
        // Token expired or invalid - force logout
        AuthApiService.forceLogout();
      }

      // Handle forbidden access
      if (error.response?.status === 403) {
        console.warn("Access forbidden - insufficient permissions");
      }

      // Handle server errors
      if (error.response?.status && error.response.status >= 500) {
        console.error("Server error:", error.response.status);
      }

      return Promise.reject(error);
    }
  );
}

/**
 * Remove API interceptors
 */
export function removeApiInterceptors(): void {
  apiClient.interceptors.request.clear();
  apiClient.interceptors.response.clear();
}
