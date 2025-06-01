/**
 * Category API service
 * Handles all category-related API calls using shared types and schemas
 */

import { AxiosError } from "axios";
import {
  Category,
  CreateCategoryRequestBody,
  CreateCategoryResponse,
  DeleteCategoryRequestParams,
  DeleteCategoryResponse,
  GetCategoriesRequestParams,
  GetCategoriesResponse,
  GetCategoryRequestParams,
  GetCategoryResponse,
  UpdateCategoryRequestBody,
  UpdateCategoryRequestParams,
  UpdateCategoryResponse,
} from "colori-platform-shared";
import apiClient from "../index";

/**
 * Category API service class
 */
export class CategoryApiService {
  /**
   * Get all categories with optional filtering
   * @param filterParams - Filter and pagination parameters
   * @returns Promise with paginated category list
   */
  static async getCategories(
    filterParams: GetCategoriesRequestParams = {}
  ): Promise<GetCategoriesResponse["data"]> {
    try {
      const response = await apiClient.get<GetCategoriesResponse>(
        "/categories",
        {
          params: filterParams,
        }
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch categories");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch categories");
    }
  }

  /**
   * Get category by ID
   * @param params - Category request parameters
   * @returns Promise with category data
   */
  static async getCategoryById(
    params: GetCategoryRequestParams
  ): Promise<Category> {
    try {
      const response = await apiClient.get<GetCategoryResponse>(
        `/categories/${params.id}`
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch category");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch category");
    }
  }

  /**
   * Create new category
   * @param categoryData - Category creation data
   * @returns Promise with created category
   */
  static async createCategory(
    categoryData: CreateCategoryRequestBody
  ): Promise<Category> {
    try {
      const response = await apiClient.post<CreateCategoryResponse>(
        "/categories",
        categoryData
      );

      if (response.data.success && response.data.id) {
        // Fetch the created category to return the complete Category object
        return await this.getCategoryById({ id: response.data.id });
      }

      throw new Error(response.data.error || "Failed to create category");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to create category");
    }
  }

  /**
   * Update existing category
   * @param params - Category request parameters
   * @param categoryData - Category update data
   * @returns Promise with updated category
   */
  static async updateCategory(
    params: UpdateCategoryRequestParams,
    categoryData: UpdateCategoryRequestBody
  ): Promise<Category> {
    try {
      const response = await apiClient.put<UpdateCategoryResponse>(
        `/categories/${params.id}`,
        categoryData
      );

      if (
        response.data.success &&
        response.data.updated &&
        response.data.data
      ) {
        // Return the updated category data with the ID added back
        return {
          id: params.id,
          ...response.data.data,
        } as Category;
      }

      throw new Error(response.data.error || "Failed to update category");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to update category");
    }
  }

  /**
   * Delete category by ID
   * @param params - Category request parameters
   * @returns Promise with deletion confirmation
   */
  static async deleteCategory(
    params: DeleteCategoryRequestParams
  ): Promise<boolean> {
    try {
      const response = await apiClient.delete<DeleteCategoryResponse>(
        `/categories/${params.id}`
      );

      // Handle successful response - backend returns { success: true, deleted: true }
      if (response.data.success && response.data.deleted !== undefined) {
        return response.data.deleted;
      }

      // Handle HTTP 200/204 status codes (successful deletion)
      if (response.status === 200 || response.status === 204) {
        return true;
      }

      throw new Error(response.data.error || "Failed to delete category");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // If it's a 404 error, the category might already be deleted
      if (axiosError.response?.status === 404) {
        console.warn(
          `Category with id ${params.id} not found, might already be deleted`
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

      throw new Error(axiosError.message || "Failed to delete category");
    }
  }
}
