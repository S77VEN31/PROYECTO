/**
 * Promotion API service
 * Handles all promotion-related API calls using shared types and schemas
 */

import { AxiosError } from 'axios';
import {
  CreatePromotionRequestBody,
  CreatePromotionResponse,
  DeletePromotionRequestParams,
  DeletePromotionResponse,
  GetPromotionRequestParams,
  GetPromotionResponse,
  GetPromotionsRequestParams,
  GetPromotionsResponse,
  Promotion,
  UpdatePromotionRequestBody,
  UpdatePromotionRequestParams,
  UpdatePromotionResponse,
} from "colori-platform-shared";
import apiClient from "../index";

/**
 * Promotion API service class
 */
export class PromotionApiService {
  /**
   * Get all promotions with optional filtering
   * @param filterParams - Filter and pagination parameters
   * @returns Promise with paginated promotion list
   */
  static async getPromotions(
    filterParams: GetPromotionsRequestParams = {}
  ): Promise<GetPromotionsResponse["data"]> {
    try {
      const response = await apiClient.get<GetPromotionsResponse>(
        "/promotions",
        {
          params: filterParams,
        }
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch promotions");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch promotions");
    }
  }

  /**
   * Get promotion by ID
   * @param params - Promotion request parameters
   * @returns Promise with promotion data
   */
  static async getPromotionById(
    params: GetPromotionRequestParams
  ): Promise<Promotion> {
    try {
      const response = await apiClient.get<GetPromotionResponse>(
        `/promotions/${params.id}`
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch promotion");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch promotion");
    }
  }

  /**
   * Create new promotion
   * @param promotionData - Promotion creation data
   * @returns Promise with created promotion
   */
  static async createPromotion(
    promotionData: CreatePromotionRequestBody
  ): Promise<Promotion> {
    try {
      const response = await apiClient.post<CreatePromotionResponse>(
        "/promotions",
        promotionData
      );

      if (response.data.success && response.data.id) {
        // Fetch the created promotion to return the complete Promotion object
        return await this.getPromotionById({ id: response.data.id });
      }

      throw new Error(response.data.error || "Failed to create promotion");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to create promotion");
    }
  }

  /**
   * Update existing promotion
   * @param params - Promotion request parameters
   * @param promotionData - Promotion update data
   * @returns Promise with updated promotion
   */
  static async updatePromotion(
    params: UpdatePromotionRequestParams,
    promotionData: UpdatePromotionRequestBody
  ): Promise<Promotion> {
    try {
      const response = await apiClient.put<UpdatePromotionResponse>(
        `/promotions/${params.id}`,
        promotionData
      );

      if (response.data.success && response.data.updated) {
        // For updates, we need to fetch the updated promotion since the response doesn't include it
        return await this.getPromotionById({ id: params.id });
      }

      throw new Error(response.data.error || "Failed to update promotion");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to update promotion");
    }
  }

  /**
   * Delete promotion by ID
   * @param params - Promotion request parameters
   * @returns Promise with deletion confirmation
   */
  static async deletePromotion(
    params: DeletePromotionRequestParams
  ): Promise<boolean> {
    try {
      const response = await apiClient.delete<DeletePromotionResponse>(
        `/promotions/${params.id}`
      );

      // Handle successful response - backend returns { success: true, deleted: true }
      if (response.data.success && response.data.deleted !== undefined) {
        return response.data.deleted;
      }

      // Handle HTTP 200/204 status codes (successful deletion)
      if (response.status === 200 || response.status === 204) {
        return true;
      }

      throw new Error(response.data.error || "Failed to delete promotion");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // If it's a 404 error, the promotion might already be deleted
      if (axiosError.response?.status === 404) {
        console.warn(
          `Promotion with id ${params.id} not found, might already be deleted`
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

      throw new Error(axiosError.message || "Failed to delete promotion");
    }
  }
} 