import { OrderModel } from "@models";
import {
  CreateOrderResponse,
  DeleteOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  Order,
  OrderCreate,
  OrderStatus,
  OrderUpdate,
  UpdateOrderResponse,
} from "colori-platform-shared";

/**
 * Service class for handling order business logic
 * Manages order operations and data validation
 */
export class OrderService {
  /**
   * Retrieve orders with filtering and pagination
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Promise<GetOrdersResponse> - Paginated list of orders
   */
  static async getOrders(params: GetOrdersRequest): Promise<GetOrdersResponse> {
    const {
      page = 1,
      limit = 10,
      status,
      tableNumber,
      search,
      startDate,
      endDate,
    } = params;

    const offset = (page - 1) * limit;

    // Build filter conditions
    const filters: any = {};
    if (status) filters.status = status;
    if (tableNumber) filters.tableNumber = tableNumber;
    if (search) {
      filters.customerName = { $regex: search, $options: "i" };
    }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = new Date(startDate);
      if (endDate) filters.createdAt.$lte = new Date(endDate);
    }

    const [orders, total] = await Promise.all([
      OrderModel.find(filters).limit(limit).skip(offset).exec(),
      OrderModel.countDocuments(filters),
    ]);

    return {
      orders: orders.map((order) => JSON.parse(JSON.stringify(order)) as Order),
      total,
      page,
      limit,
    };
  }

  /**
   * Retrieve a specific order by ID
   *
   * @param id - Order identifier
   * @returns Promise<Order | null> - Order data or null if not found
   */
  static async getOrderById(id: string): Promise<Order | null> {
    const order = await OrderModel.findById(id).exec();
    return order ? (JSON.parse(JSON.stringify(order)) as Order) : null;
  }

  /**
   * Generate a sequential order number for today
   * Finds the highest order number for the current day and increments it
   * 
   * @returns Promise<number> - Next order number for today
   */
  static async generateOrderNumber(): Promise<number> {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find orders created today
    const todayOrders = await OrderModel.find({
      createdAt: { $gte: today }
    }).sort({ createdAt: -1 }).exec();
    
    // If no orders today, start with 1
    if (todayOrders.length === 0) {
      return 1;
    }
    
    // Find the highest reference number (which should be the last created order)
    // If reference exists and is a number, use it, otherwise count orders + 1
    const lastOrder = todayOrders[0];
    if (lastOrder.reference && /^\d+$/.test(lastOrder.reference)) {
      return parseInt(lastOrder.reference) + 1;
    }
    
    return todayOrders.length + 1;
  }

  /**
   * Create a new order
   *
   * @param orderData - Order creation data
   * @returns Promise<CreateOrderResponse> - Created order with ID
   * @throws Error if validation fails or creation fails
   */
  static async createOrder(
    orderData: OrderCreate
  ): Promise<CreateOrderResponse> {
    // Generate order number
    const orderNumber = await this.generateOrderNumber();
    
    // Set default values
    const orderToCreate = {
      customerName: orderData.customerName,
      tableNumber: orderData.tableNumber,
      products: orderData.products,
      status: orderData.status || OrderStatus.PENDING,
      subtotal: orderData.subtotal || 0,
      tax: orderData.tax || 0,
      total: orderData.total || 0,
      tip: orderData.tip || null,
      paymentMethod: orderData.paymentMethod || null,
      reference: orderNumber.toString(), // Set the order number as reference
      createdBy: orderData.createdBy,
      updatedBy: orderData.updatedBy,
      completedBy: orderData.completedBy,
    };

    // Calculate totals if not provided
    if (!orderData.subtotal || !orderData.total) {
      // This would typically involve product price calculations
      // For now, we'll use the provided values or defaults
    }

    const createdOrder = await OrderModel.create(orderToCreate);

    return {
      id: createdOrder._id.toString(),
      order: JSON.parse(JSON.stringify(createdOrder)) as Order,
    };
  }

  /**
   * Update an existing order
   *
   * @param id - Order identifier
   * @param updateData - Order update data
   * @returns Promise<UpdateOrderResponse> - Update result with order data
   */
  static async updateOrder(
    id: string,
    updateData: OrderUpdate
  ): Promise<UpdateOrderResponse> {
    const existingOrder = await OrderModel.findById(id);
    if (!existingOrder) {
      return { updated: false, order: null as any };
    }

    // Prepare update data with timestamp
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // Handle status completion
    if (
      updateData.status &&
      OrderService.isCompletedStatus(updateData.status)
    ) {
      dataToUpdate.completedAt = new Date().toISOString();
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    return {
      updated: true,
      order: updatedOrder
        ? (JSON.parse(JSON.stringify(updatedOrder)) as Order)
        : (null as any),
    };
  }

  /**
   * Delete an order (soft delete by setting active to false)
   *
   * @param id - Order identifier
   * @returns Promise<DeleteOrderResponse> - Deletion result
   */
  static async deleteOrder(id: string): Promise<DeleteOrderResponse> {
    const existingOrder = await OrderModel.findById(id);
    if (!existingOrder) {
      return { deleted: false };
    }

    await OrderModel.findByIdAndUpdate(id, {
      active: false,
      updatedAt: new Date().toISOString(),
    });

    return { deleted: true };
  }

  /**
   * Check if an order status represents a completed state
   *
   * @param status - Order status to check
   * @returns boolean - True if status is completed
   * @private
   */
  private static isCompletedStatus(status: OrderStatus): boolean {
    return [OrderStatus.COMPLETED, OrderStatus.CANCELLED].includes(status);
  }
}
