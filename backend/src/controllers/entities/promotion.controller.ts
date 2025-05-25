/**
 * Promotion controller implementation
 * Handles CRUD operations for promotion entities
 */

import { PromotionService } from "@services";
import {
  ApiResponse,
  CreatePromotionRequest,
  CreateResponse,
  DeletePromotionRequestParams,
  DeleteResponse,
  GetPromotionRequestParams,
  UpdatePromotionRequest,
  UpdatePromotionRequestParams,
  UpdateResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all promotions with optional pagination and filtering
 */
export const getPromotions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, active, type } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      search: search as string,
      active: active === "true",
      type: type as string,
    };

    const result = await PromotionService.findAll(options);

    return res.status(200).json({
      success: true,
      promotions: result.results,
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve promotions",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single promotion by ID
 */
export const getPromotionById = async (
  req: Request<GetPromotionRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const promotion = await PromotionService.findById(id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        error: "Promotion not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: promotion,
    } as ApiResponse<typeof promotion>);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve promotion",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new promotion
 */
export const createPromotion = async (
  req: Request<{}, any, CreatePromotionRequest>,
  res: Response
) => {
  try {
    const { promotion } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const newPromotion = await PromotionService.create({
      ...promotion,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      id: newPromotion.id,
      data: newPromotion,
    } as ApiResponse<typeof newPromotion> & CreateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create promotion",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing promotion
 */
export const updatePromotion = async (
  req: Request<UpdatePromotionRequestParams, any, UpdatePromotionRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { promotion } = req.body;

    // Get user ID from authenticated request
    const userId = req.user?.id;

    const existingPromotion = await PromotionService.findById(id);

    if (!existingPromotion) {
      return res.status(404).json({
        success: false,
        error: "Promotion not found",
      } as ApiResponse);
    }

    const updatedPromotion = await PromotionService.update(id, {
      ...promotion,
      updatedBy: userId,
    });

    return res.status(200).json({
      success: true,
      updated: true,
      data: updatedPromotion,
    } as ApiResponse<typeof updatedPromotion> & UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update promotion",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete a promotion by ID
 */
export const deletePromotion = async (
  req: Request<DeletePromotionRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const existingPromotion = await PromotionService.findById(id);

    if (!existingPromotion) {
      return res.status(404).json({
        success: false,
        error: "Promotion not found",
      } as ApiResponse);
    }

    await PromotionService.delete(id);

    return res.status(200).json({
      success: true,
      deleted: true,
    } as ApiResponse & DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete promotion",
      message: error.message,
    } as ApiResponse);
  }
};
