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
import axios from "axios";

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
      console.log("Realizando petición a /orders con parámetros:", params);
      const response = await apiClient.get("/orders", {
        params,
      });
      console.log("Respuesta del servidor:", response.status, response.data);
      return response.data;
    } catch (error) {
      console.error("Error detallado al obtener órdenes:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error de Axios:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      }
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
   * @param orderData Order data
   * @returns Promise with created order
   */
  static async createOrder(
    orderData: OrderCreate
  ): Promise<CreateOrderResponse | null> {
    try {
      const response = await apiClient.post<CreateOrderResponse>("/orders", {
        order: orderData,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  }

  /**
   * Update an existing order
   * @param id Order ID
   * @param orderData Updated order data
   * @returns Promise with updated order
   */
  static async updateOrder(
    id: string,
    orderData: OrderUpdate
  ): Promise<UpdateOrderResponse | null> {
    try {
      const response = await apiClient.put<UpdateOrderResponse>(
        `/orders/${id}`,
        {
          order: orderData,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      return null;
    }
  }

  /**
   * Delete an order
   * @param id Order ID
   * @returns Promise with delete status
   */
  static async deleteOrder(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/orders/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      return false;
    }
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
      const response = await this.createOrder(orderData);
      
      // Agregar log para depuración
      console.log("Respuesta de createOrder:", JSON.stringify(response, null, 2));
      
      return response;
    } catch (error) {
      console.error("Error creating order from cart:", error);
      return null;
    }
  }

  /**
   * Get sales report with filtering and statistics
   * @param params Query parameters
   * @returns Promise with sales report data
   */
  static async getSalesReport(params: {
    page?: number;
    limit?: number;
    status?: string;
    tableNumber?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    statistics: {
      totalSales: number;
      totalRevenue: number;
      averageOrderValue: number;
      totalTips: number;
      totalTax: number;
      ordersByStatus: Record<string, number>;
      ordersByPaymentMethod: Record<string, number>;
      dailySales: Array<{ date: string; orders: number; revenue: number }>;
    };
  } | null> {
    try {
      const response = await apiClient.get("/orders/reports/sales", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching sales report:", error);
      return null;
    }
  }

  /**
   * Get sales report data for Excel export (all data, no pagination)
   * @param params Query parameters
   * @returns Promise with all sales data
   */
  static async getSalesReportForExport(params: {
    status?: string;
    tableNumber?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    orders: Order[];
    statistics: {
      totalSales: number;
      totalRevenue: number;
      averageOrderValue: number;
      totalTips: number;
      totalTax: number;
      ordersByStatus: Record<string, number>;
      ordersByPaymentMethod: Record<string, number>;
      dailySales: Array<{ date: string; orders: number; revenue: number }>;
    };
  } | null> {
    try {
      const response = await apiClient.get("/orders/reports/sales/export", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching sales report for export:", error);
      return null;
    }
  }
} 