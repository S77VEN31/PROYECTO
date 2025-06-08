/**
 * Upload API Service
 * Handles file upload operations with the backend
 */

import { Image } from "colori-platform-shared";
import { AuthApiService } from "./entities/auth.api";

/**
 * Upload response interface
 */
interface UploadResponse {
  success: boolean;
  message: string;
  data?: Image[];
  errors?: string[];
}

/**
 * Upload API Service class
 */
export class UploadApiService {
  private static readonly BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  /**
   * Upload product images
   * @param files - Array of files to upload
   * @returns Promise<Image[]> - Array of uploaded images
   */
  static async uploadProductImages(files: File[]): Promise<Image[]> {
    try {
      const formData = new FormData();

      // Append each file to the form data
      files.forEach((file) => {
        formData.append("images", file);
      });

      // Get auth token for authorization header
      const token = AuthApiService.getAuthToken();
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${this.BASE_URL}/api/upload/products`, {
        method: "POST",
        body: formData,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error uploading images");
      }

      const data: UploadResponse = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.message || "Upload failed");
      }

      return data.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  }

  /**
   * Delete a product image
   * @param filename - The filename to delete
   * @returns Promise<boolean> - Success status
   */
  static async deleteProductImage(filename: string): Promise<boolean> {
    try {
      // Get auth token for authorization header
      const token = AuthApiService.getAuthToken();
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${this.BASE_URL}/api/upload/products/${filename}`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting image");
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }

  /**
   * Get upload configuration
   * @returns Promise<object> - Upload configuration
   */
  static async getUploadInfo(): Promise<{
    maxFileSize: string;
    allowedTypes: string[];
    maxFiles: number;
    uploadPath: string;
  }> {
    try {
      // Get auth token for authorization header
      const token = AuthApiService.getAuthToken();
      const headers: HeadersInit = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${this.BASE_URL}/api/upload/info`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Error fetching upload info");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching upload info:", error);
      // Return default values if API fails
      return {
        maxFileSize: "5MB",
        allowedTypes: ["JPEG", "PNG", "WebP", "GIF"],
        maxFiles: 10,
        uploadPath: "/api/upload/products",
      };
    }
  }

  /**
   * Validate file before upload
   * @param file - File to validate
   * @param maxSize - Maximum file size in MB
   * @returns Validation result
   */
  static validateFile(
    file: File,
    maxSize: number = 5
  ): {
    isValid: boolean;
    error?: string;
  } {
    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)",
      };
    }

    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `El archivo debe ser menor a ${maxSize}MB`,
      };
    }

    return { isValid: true };
  }

  /**
   * Format file size for display
   * @param bytes - File size in bytes
   * @returns Formatted file size string
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
