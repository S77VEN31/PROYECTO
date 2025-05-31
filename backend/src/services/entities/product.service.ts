import { ApiError } from "@/middlewares";
import { ProductModel } from "@models";
import {
  GetProductsRequest,
  GetProductsResponse,
  Product,
  ProductCreate,
  ProductUpdate,
} from "colori-platform-shared";

/**
 * Product service implementation
 * Handles business logic for product operations
 */
export class ProductService {
  /**
   * Find all products with optional filtering and pagination
   */
  static async findAll(
    options: GetProductsRequest
  ): Promise<GetProductsResponse> {
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
    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      ProductModel.find(filter).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter)
    ]);

    // Transform MongoDB documents to Product objects
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
      __v: undefined,
    })) as unknown as Product[];

    return {
      products: transformedProducts,
      total,
      page,
      limit,
    };
  }

  /**
   * Find a single product by ID
   */
  static async findById(id: string): Promise<Product | null> {
    try {
      const product = await ProductModel.findById(id).lean();
      if (!product) return null;
      
      // Transform MongoDB document to Product object
      return {
        ...product,
        id: product._id.toString(),
        _id: undefined,
        __v: undefined,
      } as unknown as Product;
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
      
      // Transform MongoDB document to Product object
      return {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
        __v: undefined,
      } as unknown as Product;
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

      // Update product fields
      Object.assign(product, data);
      await product.save();
      
      const productObj = product.toObject();
      
      // Transform MongoDB document to Product object
      return {
        ...productObj,
        id: productObj._id.toString(),
        _id: undefined,
        __v: undefined,
      } as unknown as Product;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Failed to update product: ${error.message}`);
    }
  }

  /**
   * Delete a product by ID
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      await ProductModel.deleteOne({ _id: id });
      return true;
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, `Failed to delete product: ${error.message}`);
    }
  }

  /**
   * Get a product by ID
   */
  async getProductById(productId: string): Promise<Product> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product.toJSON() as unknown as Product;
  }

  /**
   * Get all products with optional filters
   */
  async getProducts(filters: Partial<Product> = {}): Promise<Product[]> {
    const products = await ProductModel.find(filters);
    return products.map((product) => product.toJSON() as unknown as Product);
  }

  /**
   * Update a product
   */
  async updateProduct(
    productId: string,
    updateData: ProductUpdate
  ): Promise<Product> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Update product fields
    Object.assign(product, updateData);
    await product.save();

    return product.toJSON() as unknown as Product;
  }

  /**
   * Delete a product
   */
  async deleteProduct(productId: string): Promise<void> {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    await ProductModel.deleteOne({ _id: productId });
  }

  /**
   * Create a new product
   */
  async createProduct(productData: ProductCreate): Promise<Product> {
    // Check if product with name already exists
    const existingProduct = await ProductModel.findOne({
      name: productData.name,
    });
    if (existingProduct) {
      throw new ApiError(400, "Product with this name already exists");
    }

    // Create product in database
    const product = await ProductModel.create(productData);
    return product.toJSON() as unknown as Product;
  }
}
