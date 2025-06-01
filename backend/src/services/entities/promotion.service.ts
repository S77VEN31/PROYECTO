/**
 * Promotion service
 * Handles business logic for promotion operations
 */

import { PromotionModel } from "@models";
import {
  GetPromotionsRequestParams,
  PaginatedResponse,
  Promotion,
  PromotionCreate,
  PromotionUpdate,
} from "colori-platform-shared";

/**
 * Transform MongoDB document to Promotion object
 */
function transformToPromotion(doc: any): Promotion {
  return {
    id: doc._id?.toString() || doc.id,
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    type: doc.type,
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
    createdAt:
      typeof doc.createdAt === "string"
        ? doc.createdAt
        : doc.createdAt.toISOString(),
    updatedAt:
      typeof doc.updatedAt === "string"
        ? doc.updatedAt
        : doc.updatedAt.toISOString(),
    searchTerm: doc.searchTerm,
    backgroundImages: doc.backgroundImages || [],
  } as any as Promotion;
}

/**
 * Service for managing promotion operations
 */
export class PromotionService {
  /**
   * Find all promotions with optional filtering and pagination
   */
  static async findAll(
    filterParams: GetPromotionsRequestParams = {}
  ): Promise<PaginatedResponse<Promotion>> {
    const { page = 1, limit = 10, search, active, type } = filterParams;

    try {
      // Build query filters
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

      // Execute queries
      const [promotions, total] = await Promise.all([
        PromotionModel.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        PromotionModel.countDocuments(query),
      ]);

      // Transform MongoDB documents to Promotion objects
      const transformedPromotions: Promotion[] =
        promotions.map(transformToPromotion);

      return {
        data: transformedPromotions,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
  }

  /**
   * Find a single promotion by ID
   */
  static async findById(id: string): Promise<Promotion | null> {
    try {
      const promotion = await PromotionModel.findById(id).lean();

      if (!promotion) {
        return null;
      }

      return transformToPromotion(promotion);
    } catch (error: any) {
      throw new Error(`Failed to fetch promotion: ${error.message}`);
    }
  }

  /**
   * Find a promotion by slug
   * @param slug - Promotion slug
   * @returns Promotion or null if not found
   */
  static async findBySlug(slug: string): Promise<Promotion | null> {
    try {
      const promotion = await PromotionModel.findOne({ slug }).lean();

      if (!promotion) {
        return null;
      }

      return transformToPromotion(promotion);
    } catch (error: any) {
      throw new Error(`Failed to fetch promotion by slug: ${error.message}`);
    }
  }

  /**
   * Create a new promotion
   */
  static async create(data: PromotionCreate): Promise<Promotion> {
    try {
      const newPromotion = new PromotionModel({
        ...data,
        active: data.active ?? true,
      });

      const savedPromotion = await newPromotion.save();
      const promotionObj = savedPromotion.toObject();

      return transformToPromotion(promotionObj);
    } catch (error: any) {
      throw new Error(`Failed to create promotion: ${error.message}`);
    }
  }

  /**
   * Update an existing promotion
   */
  static async update(
    id: string,
    data: PromotionUpdate
  ): Promise<Promotion | null> {
    try {
      const updatedPromotion = await PromotionModel.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      ).lean();

      if (!updatedPromotion) {
        return null;
      }

      return transformToPromotion(updatedPromotion);
    } catch (error: any) {
      throw new Error(`Failed to update promotion: ${error.message}`);
    }
  }

  /**
   * Delete a promotion by ID
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const deletedPromotion = await PromotionModel.findByIdAndDelete(id);
      return deletedPromotion !== null;
    } catch (error: any) {
      throw new Error(`Failed to delete promotion: ${error.message}`);
    }
  }
}
