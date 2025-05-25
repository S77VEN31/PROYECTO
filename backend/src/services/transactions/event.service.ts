import { EventModel } from "@models";
import {
  CreateEventResponse,
  DeleteEventResponse,
  Event,
  EventCreate,
  EventPriority,
  EventUpdate,
  GetEventsRequest,
  GetEventsResponse,
  UpdateEventResponse,
} from "colori-platform-shared";

/**
 * Service class for handling event business logic
 * Manages event operations and order state tracking
 */
export class EventService {
  /**
   * Retrieve events with filtering and pagination
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Promise<GetEventsResponse> - Paginated list of events
   */
  static async getEvents(params: GetEventsRequest): Promise<GetEventsResponse> {
    const {
      page = 1,
      limit = 10,
      orderId,
      status,
      source,
      startDate,
      endDate,
    } = params;

    const offset = (page - 1) * limit;

    // Build filter conditions
    const filters: any = {};
    if (orderId) filters.orderId = orderId;
    if (status) filters.status = status;
    if (source) filters.source = source;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = new Date(startDate);
      if (endDate) filters.createdAt.$lte = new Date(endDate);
    }

    const [events, total] = await Promise.all([
      EventModel.find(filters)
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 })
        .exec(),
      EventModel.countDocuments(filters),
    ]);

    return {
      events: events.map((event) => JSON.parse(JSON.stringify(event)) as Event),
      total,
      page,
      limit,
    };
  }

  /**
   * Retrieve a specific event by ID
   *
   * @param id - Event identifier
   * @returns Promise<Event | null> - Event data or null if not found
   */
  static async getEventById(id: string): Promise<Event | null> {
    const event = await EventModel.findById(id).exec();
    return event ? (JSON.parse(JSON.stringify(event)) as Event) : null;
  }

  /**
   * Create a new event
   *
   * @param eventData - Event creation data
   * @returns Promise<CreateEventResponse> - Created event with ID
   * @throws Error if validation fails or creation fails
   */
  static async createEvent(
    eventData: EventCreate
  ): Promise<CreateEventResponse> {
    // Set default values
    const eventToCreate = {
      status: eventData.status,
      source: eventData.source,
      orderId: eventData.orderId,
      previousStatus: eventData.previousStatus,
      userId: eventData.userId,
      reason: eventData.reason,
      priority: eventData.priority || EventPriority.NORMAL,
      completedBy: null,
      reference: eventData.reference,
    };

    const createdEvent = await EventModel.create(eventToCreate);

    return {
      id: createdEvent._id.toString(),
      event: JSON.parse(JSON.stringify(createdEvent)) as Event,
    };
  }

  /**
   * Update an existing event
   *
   * @param id - Event identifier
   * @param updateData - Event update data
   * @returns Promise<UpdateEventResponse> - Update result with event data
   */
  static async updateEvent(
    id: string,
    updateData: EventUpdate
  ): Promise<UpdateEventResponse> {
    const existingEvent = await EventModel.findById(id);
    if (!existingEvent) {
      return { updated: false, event: null as any };
    }

    // Prepare update data with timestamp
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    // Handle completion
    if (updateData.completedAt !== undefined) {
      dataToUpdate.completedAt = updateData.completedAt;
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    return {
      updated: true,
      event: updatedEvent
        ? (JSON.parse(JSON.stringify(updatedEvent)) as Event)
        : (null as any),
    };
  }

  /**
   * Delete an event (soft delete by setting active to false)
   *
   * @param id - Event identifier
   * @returns Promise<DeleteEventResponse> - Deletion result
   */
  static async deleteEvent(id: string): Promise<DeleteEventResponse> {
    const existingEvent = await EventModel.findById(id);
    if (!existingEvent) {
      return { deleted: false };
    }

    await EventModel.findByIdAndUpdate(id, {
      active: false,
      updatedAt: new Date().toISOString(),
    });

    return { deleted: true };
  }

  /**
   * Get events for a specific order
   *
   * @param orderId - Order identifier
   * @returns Promise<Event[]> - List of events for the order
   */
  static async getEventsByOrderId(orderId: string): Promise<Event[]> {
    const events = await EventModel.find({ orderId })
      .sort({ createdAt: -1 })
      .exec();
    return events.map((event) => JSON.parse(JSON.stringify(event)) as Event);
  }

  /**
   * Mark an event as completed
   *
   * @param id - Event identifier
   * @param completedBy - ID of user or service completing the event
   * @returns Promise<UpdateEventResponse> - Update result
   */
  static async completeEvent(
    id: string,
    completedBy: string
  ): Promise<UpdateEventResponse> {
    return await EventService.updateEvent(id, {
      completedAt: new Date().toISOString(),
      completedBy,
    });
  }
}
