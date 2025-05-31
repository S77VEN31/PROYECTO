/**
 * Product API service
 * Handles all product-related API calls using shared types and schemas
 */

import { AxiosError } from 'axios';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequestParams,
  DeleteProductResponse,
  GetProductRequestParams,
  GetProductResponse,
  GetProductsRequest,
  GetProductsResponse,
  Product,
  UpdateProductRequest,
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
    filterParams: GetProductsRequest = {}
  ): Promise<GetProductsResponse> {
    try {
      const response = await apiClient.get<GetProductsResponse>("/products", {
        params: filterParams,
      });

      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.message || "Failed to fetch products"
      );
    }
  }

  /**
   * Get product by ID
   * @param params - Product request parameters
   * @returns Promise with product data
   */
  static async getProductById(params: GetProductRequestParams): Promise<Product> {
    try {
      const response = await apiClient.get<GetProductResponse>(
        `/products/${params.id}`
      );

      return response.data.product;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.message || "Failed to fetch product"
      );
    }
  }

  /**
   * Create new product
   * @param productData - Product creation data
   * @returns Promise with created product
   */
  static async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await apiClient.post<CreateProductResponse>(
        "/products",
        productData
      );

      if (response.data.product) {
        // Return the product directly from the response
        return response.data.product;
      }

      throw new Error("Failed to create product");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.message || "Failed to create product"
      );
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
    productData: UpdateProductRequest
  ): Promise<Product> {
    try {
      const response = await apiClient.put<UpdateProductResponse>(
        `/products/${params.id}`,
        productData
      );

      if (response.data.updated) {
        // For updates, we need to fetch the updated product since the response doesn't include it
        return await this.getProductById({ id: params.id });
      }

      throw new Error("Failed to update product");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.message || "Failed to update product"
      );
    }
  }

  /**
   * Delete product by ID
   * @param params - Product request parameters
   * @returns Promise with deletion confirmation
   */
  static async deleteProduct(params: DeleteProductRequestParams): Promise<boolean> {
    try {
      const response = await apiClient.delete<DeleteProductResponse>(
        `/products/${params.id}`
      );

      // Handle successful response - backend returns { deleted: true }
      if (response.data.deleted !== undefined) {
        return response.data.deleted;
      }

      // Handle HTTP 200/204 status codes (successful deletion)
      if (response.status === 200 || response.status === 204) {
        return true;
      }

      throw new Error("Failed to delete product");
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

      throw new Error(
        axiosError.message || "Failed to delete product"
      );
    }
  }
} 