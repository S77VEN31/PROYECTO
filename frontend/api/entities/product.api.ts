/**
 * Product API service
 * Handles all product-related API calls using shared types and schemas
 */

import { AxiosError } from 'axios';
import {
  CreateProductRequestBody,
  CreateProductResponse,
  DeleteProductRequestParams,
  DeleteProductResponse,
  GetProductRequestParams,
  GetProductResponse,
  GetProductsRequestParams,
  GetProductsResponse,
  Product,
  UpdateProductRequestBody,
  UpdateProductRequestParams,
  UpdateProductResponse,
} from "colori-platform-shared";
import apiClient from "../index";

/**
 * Product API service class
 */
export class ProductApiService {
  /**
   * Get all products with optional filtering
   * @param filterParams - Filter and pagination parameters
   * @returns Promise with paginated product list
   */
  static async getProducts(
    filterParams: GetProductsRequestParams = {}
  ): Promise<GetProductsResponse["data"]> {
    try {
      const response = await apiClient.get<GetProductsResponse>("/products", {
        params: filterParams,
      });

      // Handle the nested response structure from backend
      if (response.data.success && response.data.data) {
        // The backend returns { success: true, data: { data: [...], total, page, limit, pages } }
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch products");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error("Error fetching products:", axiosError);
      throw new Error(axiosError.message || "Failed to fetch products");
    }
  }

  /**
   * Get product by ID
   * @param params - Product request parameters
   * @returns Promise with product data
   */
  static async getProductById(
    params: GetProductRequestParams
  ): Promise<Product> {
    try {
      const response = await apiClient.get<GetProductResponse>(
        `/products/${params.id}`
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to fetch product");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch product");
    }
  }

  /**
   * Create new product
   * @param productData - Product creation data
   * @returns Promise with created product
   */
  static async createProduct(
    productData: CreateProductRequestBody
  ): Promise<Product> {
    try {
      const response = await apiClient.post<CreateProductResponse>(
        "/products",
        productData
      );

      if (response.data.success && response.data.id) {
        // Fetch the created product to return the complete Product object
        return await this.getProductById({ id: response.data.id });
      }

      throw new Error(response.data.error || "Failed to create product");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to create product");
    }
  }

  /**
   * Update existing product
   * @param params - Product request parameters
   * @param productData - Product update data
   * @returns Promise with updated product
   */
  static async updateProduct(
    params: UpdateProductRequestParams,
    productData: UpdateProductRequestBody
  ): Promise<Product> {
    try {
      console.log("=== API SERVICE UPDATE DEBUG ===");
      console.log("API params:", JSON.stringify(params, null, 2));
      console.log("API productData:", JSON.stringify(productData, null, 2));
      console.log("API productData keys:", Object.keys(productData));
      console.log("API productData has id?", "id" in productData);
      console.log("URL will be:", `/products/${params.id}`);

      // Log exactly what axios will send
      const axiosConfig = {
        method: "PUT",
        url: `/products/${params.id}`,
        data: productData,
      };
      console.log("Axios config:", JSON.stringify(axiosConfig, null, 2));

      const response = await apiClient.put<UpdateProductResponse>(
        `/products/${params.id}`,
        productData
      );

      console.log("API response status:", response.status);
      console.log("API response data:", JSON.stringify(response.data, null, 2));
      console.log("=== END API SERVICE UPDATE DEBUG ===");

      if (
        response.data.success &&
        response.data.updated &&
        response.data.data
      ) {
        // Return the updated product data with the ID added back
        return {
          id: params.id,
          ...response.data.data,
        } as Product;
      }

      throw new Error(response.data.error || "Failed to update product");
    } catch (error: unknown) {
      console.error("API Service error:", error);
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to update product");
    }
  }

  /**
   * Delete product by ID
   * @param params - Product request parameters
   * @returns Promise with deletion confirmation
   */
  static async deleteProduct(
    params: DeleteProductRequestParams
  ): Promise<boolean> {
    try {
      const response = await apiClient.delete<DeleteProductResponse>(
        `/products/${params.id}`
      );

      // Handle successful response - backend returns { success: true, deleted: true }
      if (response.data.success && response.data.deleted !== undefined) {
        return response.data.deleted;
      }

      // Handle HTTP 200/204 status codes (successful deletion)
      if (response.status === 200 || response.status === 204) {
        return true;
      }

      throw new Error(response.data.error || "Failed to delete product");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      // If it's a 404 error, the product might already be deleted
      if (axiosError.response?.status === 404) {
        console.warn(
          `Product with id ${params.id} not found, might already be deleted`
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

      throw new Error(axiosError.message || "Failed to delete product");
    }
  }
} 