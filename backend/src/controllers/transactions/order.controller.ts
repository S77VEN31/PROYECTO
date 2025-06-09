import { OrderService } from "@services";
import {
  ApiResponse,
  CreateOrderRequest,
  CreateResponse,
  DeleteOrderRequest,
  DeleteResponse,
  GetOrderRequest,
  UpdateOrderRequest,
  UpdateResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Get all orders with optional pagination and filtering
 *
 * @param req - Express request object with query parameters
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with orders list
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      tableNumber,
      search,
      startDate,
      endDate,
    } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      tableNumber: tableNumber ? Number(tableNumber) : undefined,
      search: search as string,
      startDate: startDate as string,
      endDate: endDate as string,
    };

    const result = await OrderService.getOrders(options);

    return res.status(200).json({
      success: true,
      orders: result.orders,
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve orders",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single order by ID
 *
 * @param req - Express request object with order ID parameter
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with order data
 */
export const getOrderById = async (
  req: Request<GetOrderRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const order = await OrderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: order,
    } as ApiResponse<typeof order>);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve order",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new order
 *
 * @param req - Express request object with order data
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with created order
 */
export const createOrder = async (
  req: Request<{}, any, CreateOrderRequest>,
  res: Response
) => {
  try {
    const { order } = req.body;

    // Get user ID from authenticated request if available
    const creatorId = req.user?.id;

    const result = await OrderService.createOrder({
      ...order,
      createdBy: creatorId,
    });

    // Asegurar que el objeto Order tenga la propiedad reference
    const orderResponse = {
      ...result,
      order: {
        ...result.order,
        // Asegurar que reference existe, si no, usar id como fallback
        reference: result.order.reference || result.id.toString(),
      }
    };

    return res.status(201).json({
      success: true,
      id: orderResponse.id,
      order: orderResponse.order,
    } as ApiResponse<typeof orderResponse.order> & CreateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create order",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing order
 *
 * @param req - Express request object with order ID and update data
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with updated order
 */
export const updateOrder = async (
  req: Request<UpdateOrderRequest, any, { order: any }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { order } = req.body;

    // Get user ID from authenticated request if available
    const updaterId = req.user?.id;

    const result = await OrderService.updateOrder(id, {
      ...order,
      updatedBy: updaterId,
    });

    if (!result.updated) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      updated: true,
      data: result.order,
    } as ApiResponse<typeof result.order> & UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update order",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete an order by ID (soft delete)
 *
 * @param req - Express request object with order ID parameter
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with deletion result
 */
export const deleteOrder = async (
  req: Request<DeleteOrderRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await OrderService.deleteOrder(id);

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      deleted: true,
    } as ApiResponse & DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete order",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get sales report with filtering and statistics
 *
 * @param req - Express request object with query parameters
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with sales report data
 */
export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      tableNumber,
      search,
      startDate,
      endDate,
    } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      status: status as string,
      tableNumber: tableNumber ? Number(tableNumber) : undefined,
      search: search as string,
      startDate: startDate as string,
      endDate: endDate as string,
    };

    const result = await OrderService.getSalesReport(options);

    return res.status(200).json({
      success: true,
      orders: result.orders,
      total: result.total,
      page: result.page,
      limit: result.limit,
      statistics: result.statistics,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve sales report",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get sales report data for Excel export (all data, no pagination)
 *
 * @param req - Express request object with query parameters
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with all sales data
 */
export const getSalesReportExport = async (req: Request, res: Response) => {
  try {
    const {
      status,
      tableNumber,
      search,
      startDate,
      endDate,
    } = req.query;

    const options = {
      status: status as string,
      tableNumber: tableNumber ? Number(tableNumber) : undefined,
      search: search as string,
      startDate: startDate as string,
      endDate: endDate as string,
    };

    const result = await OrderService.getSalesReportForExport(options);

    return res.status(200).json({
      success: true,
      orders: result.orders,
      statistics: result.statistics,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve sales report for export",
      message: error.message,
    } as ApiResponse);
  }
};
