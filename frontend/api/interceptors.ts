/**
 * API interceptors for handling authentication and errors
 */

import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AuthApiService } from "./entities/auth.api";
import apiClient from "./index";

// Flag to track if interceptors are already set up
let interceptorsSetup = false;

/**
 * Setup API interceptors for authentication handling
 */
export function setupApiInterceptors(): void {
  // Prevent duplicate interceptor registration
  if (interceptorsSetup) {
    return;
  }

  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = AuthApiService.getAuthToken();
      if (token && config.headers) {
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
        // Only force logout if we're not already on the login page
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          AuthApiService.forceLogout();
        }
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

  interceptorsSetup = true;
}

/**
 * Remove API interceptors
 */
export function removeApiInterceptors(): void {
  apiClient.interceptors.request.clear();
  apiClient.interceptors.response.clear();
  interceptorsSetup = false;
}
