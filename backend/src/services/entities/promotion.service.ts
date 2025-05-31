/**
 * Promotion service
 * Handles business logic for promotion operations
 */

import PromotionModel, { IPromotionDocument } from "../../models/entities/promotion.model";
import {
  GetPromotionsRequest,
  GetPromotionsResponse,
  Promotion,
  PromotionCreate,
  PromotionUpdate,
} from "colori-platform-shared";
import { Types } from "mongoose";

/**
 * Interface for MongoDB lean document
 */
interface IPromotionLeanDocument {
  _id: Types.ObjectId;
  name: string;
  description: string;
  slug: string;
  type: string;
  startDate: string;
  endDate: string;
  code?: string;
  discountValue?: number;
  discountPercent?: number;
  minimumPurchase?: number;
  usageLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transform MongoDB document to Promotion object
 */
function transformDocumentToPromotion(doc: IPromotionLeanDocument): Promotion {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    type: doc.type as any,
    startDate: doc.startDate,
    endDate: doc.endDate,
    code: doc.code,
    discountValue: doc.discountValue,
    discountPercent: doc.discountPercent,
    minimumPurchase: doc.minimumPurchase,
    usageLimit: doc.usageLimit,
    applicableProducts: doc.applicableProducts,
    applicableCategories: doc.applicableCategories,
    active: doc.active,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

/**
 * Promotion service class
 */
export class PromotionService {
  /**
   * Get all promotions with optional filtering
   * @param filters - Filter and pagination parameters
   * @returns Promise with paginated promotion list
   */
  static async getPromotions(filters: GetPromotionsRequest = {}): Promise<GetPromotionsResponse> {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        active,
        type,
      } = filters;

      // Build MongoDB query
      const query: any = {};

      // Add search filter
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
        ];
      }

      // Add active filter
      if (active !== undefined) {
        query.active = active;
      }

      // Add type filter
      if (type) {
        query.type = type;
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Execute query with pagination
      const [promotions, total] = await Promise.all([
        PromotionModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean<IPromotionLeanDocument[]>(),
        PromotionModel.countDocuments(query),
      ]);

      // Transform MongoDB documents to Promotion objects
      const transformedPromotions: Promotion[] = promotions.map(transformDocumentToPromotion);

      return {
        promotions: transformedPromotions,
        total,
        page,
        limit,
      };
    } catch (error) {
      console.error("Error in PromotionService.getPromotions:", error);
      throw new Error("Failed to fetch promotions");
    }
  }

  /**
   * Get promotion by ID
   * @param id - Promotion ID
   * @returns Promise with promotion data or null
   */
  static async getPromotionById(id: string): Promise<Promotion | null> {
    try {
      const doc = await PromotionModel.findById(id).lean<IPromotionLeanDocument>();
      
      if (!doc) {
        return null;
      }

      return transformDocumentToPromotion(doc);
    } catch (error) {
      console.error("Error in PromotionService.getPromotionById:", error);
      throw new Error("Failed to fetch promotion");
    }
  }

  /**
   * Create new promotion
   * @param promotionData - Promotion creation data
   * @returns Promise with created promotion
   */
  static async createPromotion(promotionData: PromotionCreate): Promise<Promotion> {
    try {
      // Generate slug from name if not provided
      const slug = promotionData.slug || this.generateSlug(promotionData.name);

      const doc = await PromotionModel.create({
        ...promotionData,
        slug,
        active: promotionData.active ?? true,
      });

      return transformDocumentToPromotion(doc.toObject() as IPromotionLeanDocument);
    } catch (error) {
      console.error("Error in PromotionService.createPromotion:", error);
      throw new Error("Failed to create promotion");
    }
  }

  /**
   * Update existing promotion
   * @param id - Promotion ID
   * @param updateData - Promotion update data
   * @returns Promise with updated promotion or null
   */
  static async updatePromotion(id: string, updateData: PromotionUpdate): Promise<Promotion | null> {
    try {
      const doc = await PromotionModel.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, lean: true }
      ).lean<IPromotionLeanDocument>();

      if (!doc) {
        return null;
      }

      return transformDocumentToPromotion(doc);
    } catch (error) {
      console.error("Error in PromotionService.updatePromotion:", error);
      throw new Error("Failed to update promotion");
    }
  }

  /**
   * Delete promotion by ID
   * @param id - Promotion ID
   * @returns Promise with deletion success status
   */
  static async deletePromotion(id: string): Promise<boolean> {
    try {
      const result = await PromotionModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error("Error in PromotionService.deletePromotion:", error);
      throw new Error("Failed to delete promotion");
    }
  }

  /**
   * Generate slug from name
   * @param name - Promotion name
   * @returns Generated slug
   */
  private static generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
}
