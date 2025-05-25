import { EventService } from "@services";
import {
  ApiResponse,
  CreateEventRequest,
  CreateResponse,
  DeleteEventRequest,
  DeleteResponse,
  GetEventRequest,
  UpdateEventRequest,
  UpdateResponse,
} from "colori-platform-shared";
import { Request, Response } from "express";

/**
 * Event controller implementation
 * Handles CRUD operations for event transactions
 */

/**
 * Get all events with optional pagination and filtering
 *
 * @param req - Express request object with query parameters
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with events list
 */
export const getEvents = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      orderId,
      status,
      source,
      startDate,
      endDate,
    } = req.query;

    const options = {
      page: Number(page),
      limit: Number(limit),
      orderId: orderId as string,
      status: status as string,
      source: source as string,
      startDate: startDate as string,
      endDate: endDate as string,
    };

    const result = await EventService.getEvents(options);

    return res.status(200).json({
      success: true,
      events: result.events,
      total: result.total,
      page: result.page,
      limit: result.limit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve events",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Get a single event by ID
 *
 * @param req - Express request object with event ID parameter
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with event data
 */
export const getEventById = async (
  req: Request<GetEventRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const event = await EventService.getEventById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      data: event,
    } as ApiResponse<typeof event>);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve event",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Create a new event
 *
 * @param req - Express request object with event data
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with created event
 */
export const createEvent = async (
  req: Request<{}, any, CreateEventRequest>,
  res: Response
) => {
  try {
    const { event } = req.body;

    // Get user ID from authenticated request if available
    const creatorId = req.user?.id;

    const result = await EventService.createEvent({
      ...event,
      userId: creatorId,
    });

    return res.status(201).json({
      success: true,
      id: result.id,
      data: result.event,
    } as ApiResponse<typeof result.event> & CreateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to create event",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Update an existing event
 *
 * @param req - Express request object with event ID and update data
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with updated event
 */
export const updateEvent = async (
  req: Request<UpdateEventRequest, any, { event: any }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { event } = req.body;

    // Get user ID from authenticated request if available
    const updaterId = req.user?.id;

    const result = await EventService.updateEvent(id, {
      ...event,
      userId: updaterId,
    });

    if (!result.updated) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      updated: true,
      data: result.event,
    } as ApiResponse<typeof result.event> & UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to update event",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Delete an event by ID (soft delete)
 *
 * @param req - Express request object with event ID parameter
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with deletion result
 */
export const deleteEvent = async (
  req: Request<DeleteEventRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await EventService.deleteEvent(id);

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      deleted: true,
    } as ApiResponse & DeleteResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete event",
      message: error.message,
    } as ApiResponse);
  }
};

/**
 * Mark an event as completed
 *
 * @param req - Express request object with event ID parameter
 * @param res - Express response object
 * @returns Promise<Response> - JSON response with completion result
 */
export const completeEvent = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Get user ID from authenticated request if available
    const completerId = req.user?.id || "system";

    const result = await EventService.completeEvent(id, completerId);

    if (!result.updated) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      } as ApiResponse);
    }

    return res.status(200).json({
      success: true,
      updated: true,
      data: result.event,
    } as ApiResponse<typeof result.event> & UpdateResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to complete event",
      message: error.message,
    } as ApiResponse);
  }
};
