/**
 * API Service for Order operations
 */

import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  Order,
  OrderCreate,
  OrderStatus,
  OrderUpdate,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "colori-platform-shared";
import apiClient from "../index";

export class OrderApiService {
  /**
   * Get a list of orders with optional filters
   * @param params Query parameters
   * @returns Promise with order data
   */
  static async getOrders(
    params: Partial<GetOrdersRequest>
  ): Promise<GetOrdersResponse | null> {
    try {
      const response = await apiClient.get("/orders", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return null;
    }
  }

  /**
   * Get a specific order by ID
   * @param id Order ID
   * @returns Promise with order data
   */
  static async getOrderById(id: string): Promise<Order | null> {
    try {
      const response = await apiClient.get<GetOrderResponse>(
        `/orders/${id}`
      );
      return response.data.order;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return null;
    }
  }

  /**
   * Create a new order
   * @param orderData Order data to create
   * @returns Promise with created order
   */
  static async createOrder(
    orderData: OrderCreate
  ): Promise<CreateOrderResponse | null> {
    try {
      const payload: CreateOrderRequest = {
        order: orderData,
      };

      const response = await apiClient.post<CreateOrderResponse>(
        "/orders",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  }

  /**
   * Update an existing order
   * @param id Order ID
   * @param updateData Order data to update
   * @returns Promise with updated order
   */
  static async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<Order | null> {
    try {
      const updateData: OrderUpdate = { status };
      const payload: UpdateOrderRequest = {
        id,
        order: updateData,
      };

      const response = await apiClient.put<UpdateOrderResponse>(
        `/orders/${id}`,
        payload
      );
      return response.data.order;
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      return null;
    }
  }

  /**
   * Cancel an order
   * @param id Order ID
   * @returns Promise with cancelled order
   */
  static async cancelOrder(id: string): Promise<Order | null> {
    return this.updateOrderStatus(id, OrderStatus.CANCELLED);
  }

  /**
   * Generate order from cart items
   * @param customerName Customer name
   * @param tableNumber Table number
   * @param cartItems Array of cart items
   * @param totalAmount Total order amount
   * @returns Promise with created order
   */
  static async createOrderFromCart(
    customerName: string,
    tableNumber: number,
    cartItems: Array<{
      productId: string;
      quantity: number;
      specialInstructions?: string;
    }>,
    subtotal: number,
    tax: number,
    total: number
  ): Promise<CreateOrderResponse | null> {
    try {
      // Map cart items to order products
      const products = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
      }));

      // Create order data
      const orderData: OrderCreate = {
        customerName,
        tableNumber,
        products,
        status: OrderStatus.PENDING,
        subtotal,
        tax,
        total,
      };

      // Create the order
      return await this.createOrder(orderData);
    } catch (error) {
      console.error("Error creating order from cart:", error);
      return null;
    }
  }
} 