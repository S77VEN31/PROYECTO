/**
 * Category service implementation
 * Handles business logic for category operations
 */

import CategoryModel from "@/models/entities/category.model";
import {
  Category,
  CategoryVariant,
  CreateCategoryRequestBody,
  DeleteCategoryRequestParams,
  GetCategoriesRequestParams,
  GetCategoryRequestParams,
  PaginatedResponse,
  UpdateCategoryRequestBody,
  UpdateCategoryRequestParams,
} from "colori-platform-shared";

/**
 * Transform MongoDB document to Category type
 */
function transformToCategory(doc: any): Category {
  return {
    id: doc._id?.toString() || doc.id,
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    icon: doc.icon || "default-icon",
    displayOrder: doc.displayOrder || 0,
    products: doc.products || [],
    variant: doc.variant || CategoryVariant.DEFAULT,
    active: doc.active ?? true,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    searchTerm: doc.searchTerm || "",
    backgroundImages: doc.backgroundImages || [],
  } as any as Category;
}

/**
 * Service for managing category operations
 */
export class CategoryService {
  /**
   * Find all categories with optional pagination and search
   * @param filterParams - Pagination and search options
   * @returns Paginated list of categories
   */
  static async findAll(
    filterParams: GetCategoriesRequestParams
  ): Promise<PaginatedResponse<Category>> {
    const { page = 1, limit = 10, search, variant } = filterParams;

    try {
      // Build query filters
      const query: any = {};

      // Add variant filter if provided
      if (variant) {
        query.variant = variant;
      }

      // Add search filter if provided
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Execute queries
      const [categories, total] = await Promise.all([
        CategoryModel.find(query)
          .sort({ displayOrder: 1, name: 1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        CategoryModel.countDocuments(query),
      ]);

      // Transform MongoDB documents to Category format
      const transformedCategories: Category[] =
        categories.map(transformToCategory);

      return {
        data: transformedCategories,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  /**
   * Find a category by ID
   * @param params - Category ID parameters
   * @returns Category or null if not found
   */
  static async findById(
    params: GetCategoryRequestParams
  ): Promise<Category | null> {
    try {
      const category = await CategoryModel.findById(params.id).lean();

      if (!category) {
        return null;
      }

      return transformToCategory(category);
    } catch (error: any) {
      throw new Error(`Failed to fetch category: ${error.message}`);
    }
  }

  /**
   * Find a category by slug
   * @param slug - Category slug
   * @returns Category or null if not found
   */
  static async findBySlug(slug: string): Promise<Category | null> {
    try {
      const category = await CategoryModel.findOne({ slug }).lean();

      if (!category) {
        return null;
      }

      return transformToCategory(category);
    } catch (error: any) {
      throw new Error(`Failed to fetch category by slug: ${error.message}`);
    }
  }

  /**
   * Create a new category
   * @param data - Category creation data
   * @returns Newly created category
   */
  static async create(
    data: CreateCategoryRequestBody & { createdBy?: string }
  ): Promise<Category> {
    try {
      const newCategory = new CategoryModel({
        name: data.name,
        description: data.description,
        icon: data.icon || "default-icon",
        displayOrder: data.displayOrder || 0,
        products: data.products || [],
        variant: data.variant || CategoryVariant.DEFAULT,
        active: data.active !== undefined ? data.active : true,
        createdBy: data.createdBy,
      });

      const savedCategory = await newCategory.save();
      const categoryObj = savedCategory.toObject();

      return transformToCategory(categoryObj);
    } catch (error: any) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  /**
   * Update an existing category
   * @param params - Category ID parameters
   * @param data - Category update data
   * @returns Updated category
   */
  static async update(
    params: UpdateCategoryRequestParams,
    data: UpdateCategoryRequestBody & { updatedBy?: string }
  ): Promise<Category> {
    try {
      // Build update object, excluding undefined values
      const updateData: any = {};

      if (data.name !== undefined) updateData.name = data.name;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.icon !== undefined) updateData.icon = data.icon;
      if (data.displayOrder !== undefined)
        updateData.displayOrder = data.displayOrder;
      if (data.products !== undefined) updateData.products = data.products;
      if (data.variant !== undefined) updateData.variant = data.variant;
      if (data.active !== undefined) updateData.active = data.active;
      if (data.updatedBy !== undefined) updateData.updatedBy = data.updatedBy;

      // Update the category and return the updated document
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        params.id,
        updateData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run schema validators
        }
      ).lean();

      if (!updatedCategory) {
        throw new Error("Category not found");
      }

      return transformToCategory(updatedCategory);
    } catch (error: any) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  /**
   * Delete a category by ID
   * @param params - Category ID parameters
   * @returns True if deleted, false otherwise
   */
  static async delete(params: DeleteCategoryRequestParams): Promise<boolean> {
    try {
      const result = await CategoryModel.findByIdAndDelete(params.id);
      return !!result;
    } catch (error: any) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  /**
   * Check if a category exists
   * @param id - Category ID
   * @returns True if exists, false otherwise
   */
  static async exists(id: string): Promise<boolean> {
    try {
      const count = await CategoryModel.countDocuments({ _id: id });
      return count > 0;
    } catch (error: any) {
      throw new Error(`Failed to check category existence: ${error.message}`);
    }
  }
}
