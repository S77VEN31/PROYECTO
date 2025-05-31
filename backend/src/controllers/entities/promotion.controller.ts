/**
 * Promotion controller
 * Handles HTTP requests for promotion operations
 */

import { Request, Response } from "express";
import { PromotionService } from "../../services/entities/promotion.service";
import {
  CreatePromotionRequest,
  CreatePromotionResponse,
  DeletePromotionRequestParams,
  DeletePromotionResponse,
  GetPromotionRequestParams,
  GetPromotionResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  UpdatePromotionRequest,
  UpdatePromotionRequestParams,
  UpdatePromotionResponse,
} from "colori-platform-shared";

/**
 * Promotion controller class
 */
export class PromotionController {
  /**
   * Get all promotions with optional filtering
   * @param req - Express request object
   * @param res - Express response object
   */
  static async getPromotions(
    req: Request<{}, GetPromotionsResponse, {}, GetPromotionsRequest>,
    res: Response<GetPromotionsResponse>
  ): Promise<void> {
    try {
      const filters = req.query;
      const result = await PromotionService.getPromotions(filters);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error getting promotions:", error);
      res.status(500).json({
        promotions: [],
        total: 0,
        page: 1,
        limit: 10,
      });
    }
  }

  /**
   * Get promotion by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  static async getPromotionById(
    req: Request<GetPromotionRequestParams, GetPromotionResponse>,
    res: Response<GetPromotionResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const promotion = await PromotionService.getPromotionById(id);
      
      if (!promotion) {
        res.status(404).json({
          promotion: null as any,
        });
        return;
      }

      res.status(200).json({
        promotion,
      });
    } catch (error) {
      console.error("Error getting promotion by ID:", error);
      res.status(500).json({
        promotion: null as any,
      });
    }
  }

  /**
   * Create new promotion
   * @param req - Express request object
   * @param res - Express response object
   */
  static async createPromotion(
    req: Request<{}, CreatePromotionResponse, CreatePromotionRequest>,
    res: Response<CreatePromotionResponse>
  ): Promise<void> {
    try {
      const promotionData = req.body.promotion;
      const newPromotion = await PromotionService.createPromotion(promotionData);
      
      res.status(201).json({
        id: newPromotion.id,
        promotion: newPromotion,
      });
    } catch (error) {
      console.error("Error creating promotion:", error);
      res.status(500).json({
        id: "",
        promotion: null as any,
      });
    }
  }

  /**
   * Update existing promotion
   * @param req - Express request object
   * @param res - Express response object
   */
  static async updatePromotion(
    req: Request<UpdatePromotionRequestParams, UpdatePromotionResponse, UpdatePromotionRequest>,
    res: Response<UpdatePromotionResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body.promotion;
      
      const updatedPromotion = await PromotionService.updatePromotion(id, updateData);
      
      if (!updatedPromotion) {
        res.status(404).json({
          updated: false,
          promotion: null as any,
        });
        return;
      }

      res.status(200).json({
        updated: true,
        promotion: updatedPromotion,
      });
    } catch (error) {
      console.error("Error updating promotion:", error);
      res.status(500).json({
        updated: false,
        promotion: null as any,
      });
    }
  }

  /**
   * Delete promotion by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  static async deletePromotion(
    req: Request<DeletePromotionRequestParams, DeletePromotionResponse>,
    res: Response<DeletePromotionResponse>
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await PromotionService.deletePromotion(id);
      
      if (!deleted) {
        res.status(404).json({
          deleted: false,
        });
        return;
      }

      res.status(200).json({
        deleted: true,
      });
    } catch (error) {
      console.error("Error deleting promotion:", error);
      res.status(500).json({
        deleted: false,
      });
    }
  }
}
