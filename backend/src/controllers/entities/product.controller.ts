/**
 * Product controller implementation
 * Handles CRUD operations for product entities
 */

import { ProductService } from "@services";
import {
  CreateProductRequestBody,
  CreateProductResponse,
  DeleteProductRequestParams,
  DeleteProductResponse,
  GetProductRequestParams,
  GetProductResponse,
  GetProductsRequestParams,
  GetProductsResponse,
  UpdateProductRequestBody,
  UpdateProductRequestParams,
  UpdateProductResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all products with optional pagination and filtering
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const options = req.query as GetProductsRequestParams;
    const result = await ProductService.findAll(options);

    const response: GetProductsResponse = {
      success: true,
      data: result,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetProductsResponse = {
      success: false,
      error: "Failed to retrieve products",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params as unknown as GetProductRequestParams;
    const product = await ProductService.findById(id);

    if (!product) {
      const response: GetProductResponse = {
        success: false,
        error: "Product not found",
      };
      return res.status(404).json(response);
    }

    const response: GetProductResponse = {
      success: true,
      data: product,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetProductResponse = {
      success: false,
      error: "Failed to retrieve product",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Create a new product
 */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productData = req.body as CreateProductRequestBody;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const productDataWithUser = {
      ...productData,
      createdBy: userId,
    };

    const newProduct = await ProductService.create(productDataWithUser);

    const response: CreateProductResponse = {
      success: true,
      id: newProduct.id,
      data: productData,
    };
    return res.status(201).json(response);
  } catch (error: any) {
    const response: CreateProductResponse = {
      success: false,
      error: "Failed to create product",
      message: error.message,
      id: "",
    };
    return res.status(500).json(response);
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params as unknown as UpdateProductRequestParams;
    const updateData = req.body as UpdateProductRequestBody;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const existingProduct = await ProductService.findById(id);

    if (!existingProduct) {
      const response: UpdateProductResponse = {
        success: false,
        error: "Product not found",
        updated: false,
      };
      return res.status(404).json(response);
    }

    const updateDataWithUser = {
      ...updateData,
      updatedBy: userId,
    };

    await ProductService.update(id, updateDataWithUser);

    const response: UpdateProductResponse = {
      success: true,
      updated: true,
      data: updateData,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: UpdateProductResponse = {
      success: false,
      error: "Failed to update product",
      message: error.message,
      updated: false,
    };
    return res.status(500).json(response);
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params as unknown as DeleteProductRequestParams;

    const existingProduct = await ProductService.findById(id);

    if (!existingProduct) {
      const response: DeleteProductResponse = {
        success: false,
        error: "Product not found",
        deleted: false,
      };
      return res.status(404).json(response);
    }

    await ProductService.delete(id);

    const response: DeleteProductResponse = {
      success: true,
      deleted: true,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: DeleteProductResponse = {
      success: false,
      error: "Failed to delete product",
      message: error.message,
      deleted: false,
    };
    return res.status(500).json(response);
  }
};
