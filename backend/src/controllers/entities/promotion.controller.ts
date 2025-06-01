/**
 * Promotion controller
 * Handles HTTP requests for promotion operations
 */

import {
  CreatePromotionRequestBody,
  CreatePromotionResponse,
  DeletePromotionRequestParams,
  DeletePromotionResponse,
  GetPromotionRequestParams,
  GetPromotionResponse,
  GetPromotionsRequestParams,
  GetPromotionsResponse,
  UpdatePromotionRequestBody,
  UpdatePromotionRequestParams,
  UpdatePromotionResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";
import { PromotionService } from "../../services/entities/promotion.service";

/**
 * Promotion controller class
 */
export class PromotionController {
  /**
   * Get all promotions with optional filtering
   */
  static async getPromotions(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query as GetPromotionsRequestParams;
      const result = await PromotionService.findAll(filters);

      const response: GetPromotionsResponse = {
        success: true,
        data: result,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting promotions:", error);
      const response: GetPromotionsResponse = {
        success: false,
        error: "Failed to retrieve promotions",
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get promotion by ID
   */
  static async getPromotionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as unknown as GetPromotionRequestParams;
      const promotion = await PromotionService.findById(id);

      if (!promotion) {
        const response: GetPromotionResponse = {
          success: false,
          error: "Promotion not found",
        };
        res.status(404).json(response);
        return;
      }

      const response: GetPromotionResponse = {
        success: true,
        data: promotion,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting promotion by ID:", error);
      const response: GetPromotionResponse = {
        success: false,
        error: "Failed to retrieve promotion",
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new promotion
   */
  static async createPromotion(req: Request, res: Response): Promise<void> {
    try {
      const promotionData = req.body as CreatePromotionRequestBody;
      const newPromotion = await PromotionService.create(promotionData);

      const response: CreatePromotionResponse = {
        success: true,
        id: newPromotion.id,
        data: promotionData,
      };
      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating promotion:", error);
      const response: CreatePromotionResponse = {
        success: false,
        error: "Failed to create promotion",
        id: "",
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update existing promotion
   */
  static async updatePromotion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as unknown as UpdatePromotionRequestParams;
      const updateData = req.body as UpdatePromotionRequestBody;

      const updatedPromotion = await PromotionService.update(id, updateData);

      if (!updatedPromotion) {
        const response: UpdatePromotionResponse = {
          success: false,
          error: "Promotion not found",
          updated: false,
        };
        res.status(404).json(response);
        return;
      }

      const response: UpdatePromotionResponse = {
        success: true,
        updated: true,
        data: updateData,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error updating promotion:", error);
      const response: UpdatePromotionResponse = {
        success: false,
        error: "Failed to update promotion",
        updated: false,
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete promotion by ID
   */
  static async deletePromotion(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params as unknown as DeletePromotionRequestParams;
      const deleted = await PromotionService.delete(id);

      if (!deleted) {
        const response: DeletePromotionResponse = {
          success: false,
          error: "Promotion not found",
          deleted: false,
        };
        res.status(404).json(response);
        return;
      }

      const response: DeletePromotionResponse = {
        success: true,
        deleted: true,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting promotion:", error);
      const response: DeletePromotionResponse = {
        success: false,
        error: "Failed to delete promotion",
        deleted: false,
      };
      res.status(500).json(response);
    }
  }
}
