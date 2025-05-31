/**
 * Category controller implementation
 * Handles CRUD operations for category entities
 */

import { CategoryService } from "@services";
import {
  ApiResponse,
  CreateCategoryRequest,
  CreateResponse,
  DeleteCategoryRequestParams,
  DeleteResponse,
  GetCategoryRequestParams,
  UpdateCategoryRequest,
  UpdateCategoryRequestParams,
  UpdateResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all categories with optional pagination and filtering
 */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
    };

    const result = await CategoryService.findAll(options);

    return res.status(200).json({
      success: true,
      categories: result.data,
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve categories",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single category by ID
 */
export const getCategoryById = async (
  req: Request<GetCategoryRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const category = await CategoryService.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: category,
    } as ApiResponse<typeof category>);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve category",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new category
 */
export const createCategory = async (
  req: Request<{}, any, CreateCategoryRequest>,
  res: Response
) => {
  try {
    const { category } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const categoryData = {
      ...category,
      createdBy: userId,
    };

    const newCategory = await CategoryService.create(categoryData);

    return res.status(201).json({
      success: true,
      id: newCategory.id,
      data: category,
    } as CreateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create category",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing category
 */
export const updateCategory = async (
  req: Request<UpdateCategoryRequestParams, any, UpdateCategoryRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const existingCategory = await CategoryService.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      } as ApiResponse);
    }

    const updateData = {
      ...category,
      updatedBy: userId,
    };

    await CategoryService.update(id, updateData);

    return res.status(200).json({
      success: true,
      updated: true,
      data: category,
    } as UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update category",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete a category by ID
 */
export const deleteCategory = async (
  req: Request<DeleteCategoryRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const existingCategory = await CategoryService.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      } as ApiResponse);
    }

    await CategoryService.delete(id);

    return res.status(200).json({
      success: true,
      deleted: true,
    } as DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete category",
      message: error.message,
    } as ApiResponse);
  }
};
