/**
 * Category controller implementation
 * Handles CRUD operations for category entities
 */

import { CategoryService } from "@services";
import {
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
import { Request, Response } from "express";

/**
 * Get all categories with optional pagination and filtering
 */
export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const filterParams = req.query as GetCategoriesRequestParams;
    const result = await CategoryService.findAll(filterParams);

    const response: GetCategoriesResponse = {
      success: true,
      data: result,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetCategoriesResponse = {
      success: false,
      error: "Failed to retrieve categories",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Get a single category by ID
 */
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as GetCategoryRequestParams;
    const category = await CategoryService.findById(params);

    if (!category) {
      const response: GetCategoryResponse = {
        success: false,
        error: "Category not found",
      };
      return res.status(404).json(response);
    }

    const response: GetCategoryResponse = {
      success: true,
      data: category,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: GetCategoryResponse = {
      success: false,
      error: "Failed to retrieve category",
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

/**
 * Create a new category
 */
export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categoryData = req.body as CreateCategoryRequestBody;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const createData = {
      ...categoryData,
      createdBy: userId,
    };

    const newCategory = await CategoryService.create(createData);

    const response: CreateCategoryResponse = {
      success: true,
      id: newCategory.id,
      data: categoryData,
    };
    return res.status(201).json(response);
  } catch (error: any) {
    const response: CreateCategoryResponse = {
      success: false,
      error: "Failed to create category",
      message: error.message,
      id: "",
    };
    return res.status(500).json(response);
  }
};

/**
 * Update an existing category
 */
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as UpdateCategoryRequestParams;
    const updateData = req.body as UpdateCategoryRequestBody;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const existingCategory = await CategoryService.findById(params);

    if (!existingCategory) {
      const response: UpdateCategoryResponse = {
        success: false,
        error: "Category not found",
        updated: false,
      };
      return res.status(404).json(response);
    }

    const updateDataWithUser = {
      ...updateData,
      updatedBy: userId,
    };

    const updatedCategory = await CategoryService.update(
      params,
      updateDataWithUser
    );

    // Return the updated category data without the ID
    const { id: categoryId, ...categoryDataWithoutId } = updatedCategory;

    const response: UpdateCategoryResponse = {
      success: true,
      updated: true,
      data: categoryDataWithoutId,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: UpdateCategoryResponse = {
      success: false,
      error: "Failed to update category",
      message: error.message,
      updated: false,
    };
    return res.status(500).json(response);
  }
};

/**
 * Delete a category by ID
 */
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const params = req.params as unknown as DeleteCategoryRequestParams;

    const existingCategory = await CategoryService.findById(params);

    if (!existingCategory) {
      const response: DeleteCategoryResponse = {
        success: false,
        error: "Category not found",
        deleted: false,
      };
      return res.status(404).json(response);
    }

    await CategoryService.delete(params);

    const response: DeleteCategoryResponse = {
      success: true,
      deleted: true,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: DeleteCategoryResponse = {
      success: false,
      error: "Failed to delete category",
      message: error.message,
      deleted: false,
    };
    return res.status(500).json(response);
  }
};
