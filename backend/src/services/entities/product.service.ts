import { ApiError } from "@/middlewares";
import CategoryModel from "@/models/entities/category.model";
import { ProductModel, PromotionModel } from "@models";
import {
  GetProductsRequestParams,
  PaginatedResponse,
  Product,
  ProductCreate,
  ProductUpdate,
} from "colori-platform-shared";

/**
 * Transform MongoDB document to Product type
 */
function transformToProduct(doc: any): Product {
  return {
    id: doc._id?.toString() || doc.id,
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    price: doc.price,
    longDescription: doc.longDescription,
    tags: doc.tags || [],
    nutritionalInfo: doc.nutritionalInfo,
    preparationTime: doc.preparationTime,
    active: doc.active ?? true,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    searchTerm: doc.searchTerm,
    backgroundImages: doc.backgroundImages || [],
  } as any as Product;
}

/**
 * Product service implementation
 * Handles business logic for product operations
 */
export class ProductService {
  /**
   * Find all products with optional filtering and pagination
   */
  static async findAll(
    options: GetProductsRequestParams
  ): Promise<PaginatedResponse<Product>> {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      tag,
      minPrice,
      maxPrice,
    } = options;

    // Build filter query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Handle category filtering by finding products in category's product list
    if (category) {
      try {
        // Find the category and get its product IDs
        const categoryDoc = await CategoryModel.findById(category).lean();
        if (
          categoryDoc &&
          categoryDoc.products &&
          categoryDoc.products.length > 0
        ) {
          // Filter products by IDs that are in the category's product list
          query._id = { $in: categoryDoc.products };
        } else {
          // If category doesn't exist or has no products, return empty result
          return {
            data: [],
            total: 0,
            page,
            limit,
            pages: 0,
          };
        }
      } catch (error) {
        // If category ID is invalid, return empty result
        return {
          data: [],
          total: 0,
          page,
          limit,
          pages: 0,
        };
      }
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(query),
    ]);

    // Transform MongoDB documents to Product objects
    const transformedProducts = products.map(transformToProduct);

    return {
      data: transformedProducts,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a single product by ID
   */
  static async findById(id: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findById(id).lean();
      if (!product) return null;

      return transformToProduct(product);
    } catch (error) {
      return null;
    }
  }

  /**
   * Create a new product
   */
  static async create(
    data: ProductCreate & { createdBy?: string }
  ): Promise<Product> {
    try {
      // Check if product with name already exists
      const existingProduct = await ProductModel.findOne({
        name: data.name,
      });
      if (existingProduct) {
        throw new ApiError(400, "Product with this name already exists");
      }

      // Create product in database
      const product = await ProductModel.create(data);
      const productObj = product.toObject();

      return transformToProduct(productObj);
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Failed to create product: ${error.message}`);
    }
  }

  /**
   * Update an existing product
   */
  static async update(
    id: string,
    data: ProductUpdate & { updatedBy?: string }
  ): Promise<Product> {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      // Handle nutritionalInfo separately to ensure proper merging
      if (data.nutritionalInfo) {
        // Always update nutritionalInfo, even if some fields are undefined
        product.nutritionalInfo = {
          calories:
            data.nutritionalInfo.calories ??
            (product.nutritionalInfo?.calories || undefined),
          protein:
            data.nutritionalInfo.protein ??
            (product.nutritionalInfo?.protein || undefined),
          carbs:
            data.nutritionalInfo.carbs ??
            (product.nutritionalInfo?.carbs || undefined),
          fat:
            data.nutritionalInfo.fat ??
            (product.nutritionalInfo?.fat || undefined),
          allergens:
            data.nutritionalInfo.allergens ??
            (product.nutritionalInfo?.allergens || undefined),
        };

        // Remove nutritionalInfo from data to avoid double assignment
        const { nutritionalInfo, ...restData } = data;
        Object.assign(product, restData);
      } else {
        // Update product fields normally if no nutritionalInfo
        Object.assign(product, data);
      }

      await product.save();

      const productObj = product.toObject();

      return transformToProduct(productObj);
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Failed to update product: ${error.message}`);
    }
  }

  /**
   * Remove product references from categories and promotions (public utility method)
   * @param productId - Product ID to remove from references
   * @returns Promise<void>
   * @throws ApiError if cleanup fails
   */
  static async cleanupProductReferences(productId: string): Promise<void> {
    try {
      await this.removeProductReferences(productId);
    } catch (error: any) {
      throw new ApiError(
        500,
        `Failed to cleanup product references: ${error.message}`
      );
    }
  }

  /**
   * Remove product references from categories and promotions
   * @param productId - Product ID to remove from references
   * @param session - Optional MongoDB session for transaction support
   * @returns Promise<void>
   * @private
   */
  private static async removeProductReferences(
    productId: string,
    session?: any
  ): Promise<void> {
    const updateOptions = session ? { session } : {};

    // Remove product ID from all categories that reference it
    await CategoryModel.updateMany(
      { products: productId },
      { $pull: { products: productId } },
      updateOptions
    );

    // Remove product ID from all promotions that reference it
    await PromotionModel.updateMany(
      { applicableProducts: productId },
      { $pull: { applicableProducts: productId } },
      updateOptions
    );
  }

  /**
   * Delete a product by ID and remove its references from categories and promotions
   * @param id - Product ID to delete
   * @returns Promise<boolean> - True if deletion was successful
   * @throws ApiError if product not found or deletion fails
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      // Start a transaction to ensure data consistency
      const session = await ProductModel.startSession();

      try {
        await session.withTransaction(async () => {
          // Delete the product
          await ProductModel.deleteOne({ _id: id }).session(session);

          // Remove product references from categories and promotions
          await this.removeProductReferences(id, session);
        });

        return true;
      } finally {
        await session.endSession();
      }
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Failed to delete product: ${error.message}`);
    }
  }
}
