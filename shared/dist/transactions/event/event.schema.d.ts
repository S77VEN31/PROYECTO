/**
 * Schemas for Event transactions
 */
import { EventPriority, EventSource, OrderStatus } from "../../enums";
import { z } from "zod";
/**
 * Schema for event transaction
 */
export declare const EventTransactionSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    id: z.ZodOptional<z.ZodString>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reference: z.ZodOptional<z.ZodString>;
} & {
    status: z.ZodNativeEnum<typeof OrderStatus>;
    source: z.ZodNativeEnum<typeof EventSource>;
    orderId: z.ZodString;
    previousStatus: z.ZodOptional<z.ZodNativeEnum<typeof OrderStatus>>;
    userId: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof EventPriority>>>;
    completedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    source: EventSource;
    orderId: string;
    priority: EventPriority;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    reference?: string | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
}, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    source: EventSource;
    orderId: string;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}>;
/**
 * Schema for complete event
 */
export declare const EventSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reference: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<typeof OrderStatus>;
    source: z.ZodNativeEnum<typeof EventSource>;
    orderId: z.ZodString;
    previousStatus: z.ZodOptional<z.ZodNativeEnum<typeof OrderStatus>>;
    userId: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof EventPriority>>>;
    completedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    id: string;
    active: boolean;
    source: EventSource;
    orderId: string;
    priority: EventPriority;
    completedAt?: string | null | undefined;
    reference?: string | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
}, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    id: string;
    source: EventSource;
    orderId: string;
    completedAt?: string | null | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}>;
/**
 * Schema for event creation
 */
export declare const EventCreateSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof OrderStatus>;
    source: z.ZodNativeEnum<typeof EventSource>;
    orderId: z.ZodString;
    previousStatus: z.ZodOptional<z.ZodNativeEnum<typeof OrderStatus>>;
    userId: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNativeEnum<typeof EventPriority>>;
    reference: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    source: EventSource;
    orderId: string;
    reference?: string | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}, {
    status: OrderStatus;
    source: EventSource;
    orderId: string;
    reference?: string | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}>;
/**
 * Schema for event updates
 */
export declare const EventUpdateSchema: z.ZodObject<{
    previousStatus: z.ZodOptional<z.ZodNativeEnum<typeof OrderStatus>>;
    userId: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNativeEnum<typeof EventPriority>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    completedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    completedAt?: string | null | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}, {
    completedAt?: string | null | undefined;
    completedBy?: string | null | undefined;
    previousStatus?: OrderStatus | undefined;
    userId?: string | undefined;
    reason?: string | undefined;
    priority?: EventPriority | undefined;
}>;
