/**
 * Main API client configuration
 * Provides a configured axios instance for all API calls
 */

import axios, { AxiosInstance } from "axios";

/**
 * Base API configuration
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
