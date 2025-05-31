/**
 * Product controller implementation
 * Handles CRUD operations for product entities
 */

import { ProductService } from "@services";
import {
  ApiResponse,
  CreateProductRequest,
  CreateResponse,
  DeleteProductRequestParams,
  DeleteResponse,
  GetProductRequestParams,
  UpdateProductRequest,
  UpdateProductRequestParams,
  UpdateResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all products with optional pagination and filtering
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      tag,
      minPrice,
      maxPrice,
    } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      category: category as string,
      tag: tag as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const result = await ProductService.findAll(options);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve products",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (
  req: Request<GetProductRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const product = await ProductService.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      product: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve product",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new product
 */
export const createProduct = async (
  req: Request<{}, any, CreateProductRequest>,
  res: Response
) => {
  try {
    const { product } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const productData = {
      ...product,
      createdBy: userId,
    };

    const newProduct = await ProductService.create(productData);

    return res.status(201).json({
      id: newProduct.id,
      product: newProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create product",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  req: Request<UpdateProductRequestParams, any, UpdateProductRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const existingProduct = await ProductService.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      } as ApiResponse);
    }

    const updateData = {
      ...product,
      updatedBy: userId,
    };

    await ProductService.update(id, updateData);

    return res.status(200).json({
      success: true,
      updated: true,
      data: product,
    } as UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update product",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (
  req: Request<DeleteProductRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const existingProduct = await ProductService.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      } as ApiResponse);
    }

    await ProductService.delete(id);

    return res.status(200).json({
      success: true,
      deleted: true,
    } as DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete product",
      message: error.message,
    } as ApiResponse);
  }
};
