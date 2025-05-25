import {
  completeEvent,
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "@controllers";
import { Router } from "express";

/**
 * Router for event-related endpoints
 * Handles HTTP routing for event CRUD operations
 */
const router = Router();

/**
 * @route GET /events
 * @description Get all events with optional filtering and pagination
 * @access Public (should be protected in production)
 */
router.get("/", getEvents);

/**
 * @route GET /events/:id
 * @description Get a specific event by ID
 * @access Public (should be protected in production)
 */
router.get("/:id", getEventById);

/**
 * @route POST /events
 * @description Create a new event
 * @access Public (should be protected in production)
 */
router.post("/", createEvent);

/**
 * @route PUT /events/:id
 * @description Update an existing event
 * @access Public (should be protected in production)
 */
router.put("/:id", updateEvent);

/**
 * @route DELETE /events/:id
 * @description Delete an event (soft delete)
 * @access Public (should be protected in production)
 */
router.delete("/:id", deleteEvent);

/**
 * @route PUT /events/:id/complete
 * @description Mark an event as completed
 * @access Public (should be protected in production)
 */
router.put("/:id/complete", completeEvent);

export default router;
