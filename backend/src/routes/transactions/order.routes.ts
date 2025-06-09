import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getSalesReport,
  getSalesReportExport,
  updateOrder,
} from "@controllers";
import { Router } from "express";

/**
 * Router for order-related endpoints
 * Handles HTTP routing for order CRUD operations
 */
const router = Router();

/**
 * @route GET /orders
 * @description Get all orders with optional filtering and pagination
 * @access Public (should be protected in production)
 */
router.get("/", getOrders);

/**
 * @route GET /orders/reports/sales
 * @description Get sales report with filtering and statistics
 * @access Public (should be protected in production)
 */
router.get("/reports/sales", getSalesReport);

/**
 * @route GET /orders/reports/sales/export
 * @description Get sales report data for Excel export
 * @access Public (should be protected in production)
 */
router.get("/reports/sales/export", getSalesReportExport);

/**
 * @route GET /orders/:id
 * @description Get a specific order by ID
 * @access Public (should be protected in production)
 */
router.get("/:id", getOrderById);

/**
 * @route POST /orders
 * @description Create a new order
 * @access Public (should be protected in production)
 */
router.post("/", createOrder);

/**
 * @route PUT /orders/:id
 * @description Update an existing order
 * @access Public (should be protected in production)
 */
router.put("/:id", updateOrder);

/**
 * @route DELETE /orders/:id
 * @description Delete an order (soft delete)
 * @access Public (should be protected in production)
 */
router.delete("/:id", deleteOrder);

export default router;
