/**
 * Schemas for Order transactions
 */
import { OrderStatus, PaymentMethod } from "../../enums";
import { OrderCreate, OrderUpdate } from "../../transactions";
import { z } from "zod";
/**
 * Schema for individual menu item within an order
 */
export declare const OrderProductSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
    specialInstructions: z.ZodOptional<z.ZodString>;
    toppings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
    specialInstructions?: string | undefined;
    toppings?: string[] | undefined;
}, {
    productId: string;
    quantity: number;
    specialInstructions?: string | undefined;
    toppings?: string[] | undefined;
}>;
/**
 * Schema for product toppings
 */
export declare const OrderToppingSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    price: z.ZodNumber;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    active: boolean;
    price: number;
}, {
    id: string;
    name: string;
    price: number;
    active?: boolean | undefined;
}>;
/**
 * Schema for core order information
 */
export declare const OrderTransactionSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    id: z.ZodOptional<z.ZodString>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reference: z.ZodOptional<z.ZodString>;
} & {
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
    completedBy: z.ZodOptional<z.ZodString>;
} & {
    customerName: z.ZodString;
    tableNumber: z.ZodNumber;
    products: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
        specialInstructions: z.ZodOptional<z.ZodString>;
        toppings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }, {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }>, "many">;
    status: z.ZodNativeEnum<typeof OrderStatus>;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    products: {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }[];
    customerName: string;
    tableNumber: number;
    id?: string | undefined;
    completedAt?: string | null | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    products: {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }[];
    customerName: string;
    tableNumber: number;
    id?: string | undefined;
    active?: boolean | undefined;
    completedAt?: string | null | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}>;
/**
 * Schema for complete order representation
 */
export declare const OrderSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reference: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
    completedBy: z.ZodOptional<z.ZodString>;
    customerName: z.ZodString;
    tableNumber: z.ZodNumber;
    products: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
        specialInstructions: z.ZodOptional<z.ZodString>;
        toppings: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }, {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }>, "many">;
    status: z.ZodNativeEnum<typeof OrderStatus>;
    subtotal: z.ZodNumber;
    tax: z.ZodNumber;
    total: z.ZodNumber;
    tip: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    paymentMethod: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof PaymentMethod>>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    id: string;
    active: boolean;
    products: {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    customerName: string;
    tableNumber: number;
    tip?: number | null | undefined;
    paymentMethod?: PaymentMethod | null | undefined;
    completedAt?: string | null | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}, {
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    id: string;
    products: {
        productId: string;
        quantity: number;
        specialInstructions?: string | undefined;
        toppings?: string[] | undefined;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    customerName: string;
    tableNumber: number;
    active?: boolean | undefined;
    tip?: number | null | undefined;
    paymentMethod?: PaymentMethod | null | undefined;
    completedAt?: string | null | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}>;
/**
 * Schema for order creation
 */
export declare const OrderCreateSchema: z.ZodType<OrderCreate>;
/**
 * Schema for order updates
 */
export declare const OrderUpdateSchema: z.ZodType<OrderUpdate>;
//# sourceMappingURL=order.schema.d.ts.map