/**
 * Category service implementation
 * Handles business logic for category operations
 */

import CategoryModel from "@/models/entities/category.model";
import {
  Category,
  CategoryCreate,
  CategoryFilterOptions,
  CategoryUpdate,
  PaginatedResponse,
} from "colori-platform-shared";

/**
 * Service interface for category operations
 */
export class CategoryService {
  /**
   * Find all categories with optional pagination and search
   * @param options - Pagination and search options
   * @returns Paginated list of categories
   */
  static async findAll(
    options: CategoryFilterOptions
  ): Promise<PaginatedResponse<Category>> {
    const { page = 1, limit = 10, search } = options;

    // Build query
    let query = CategoryModel.find();

    // Apply search filter if provided
    if (search) {
      query = query.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    }

    // Count total documents for pagination
    const total = await CategoryModel.countDocuments(query.getFilter());

    // Apply pagination
    const skip = (page - 1) * limit;
    const results = await query
      .sort({ displayOrder: 1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate total pages
    const pages = Math.ceil(total / limit);

    return {
      results: results as unknown as Category[],
      total,
      page,
      limit,
      pages,
    };
  }

  /**
   * Find a category by ID
   * @param id - Category ID
   * @returns Category or null if not found
   */
  static async findById(id: string): Promise<Category | null> {
    const category = await CategoryModel.findById(id).lean();
    return category as unknown as Category;
  }

  /**
   * Find a category by slug
   * @param slug - Category slug
   * @returns Category or null if not found
   */
  static async findBySlug(slug: string): Promise<Category | null> {
    const category = await CategoryModel.findOne({ slug }).lean();
    return category as unknown as Category;
  }

  /**
   * Create a new category
   * @param data - Category creation data
   * @returns Newly created category
   */
  static async create(
    data: CategoryCreate & { createdBy?: string }
  ): Promise<Category> {
    const newCategory = new CategoryModel(data);
    await newCategory.save();
    return newCategory.toObject() as unknown as Category;
  }

  /**
   * Update an existing category
   * @param id - Category ID
   * @param data - Category update data
   * @returns Updated category
   */
  static async update(
    id: string,
    data: CategoryUpdate & { updatedBy?: string }
  ): Promise<Category | null> {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();

    return updatedCategory as unknown as Category;
  }

  /**
   * Delete a category by ID
   * @param id - Category ID
   * @returns True if deleted, false otherwise
   */
  static async delete(id: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(id);
    return !!result;
  }

  /**
   * Check if a category exists
   * @param id - Category ID
   * @returns True if exists, false otherwise
   */
  static async exists(id: string): Promise<boolean> {
    const count = await CategoryModel.countDocuments({ _id: id });
    return count > 0;
  }
}
