/**
 * Base transaction schemas for the application
 */
import { z } from "zod";
/**
 * Schema for core transaction properties
 */
export declare const TransactionRecordSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    id: z.ZodOptional<z.ZodString>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reference: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    active: boolean;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    reference?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
}>;
/**
 * Schema for auditable transaction with user tracking
 */
export declare const AuditableTransactionSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    active: boolean;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    completedBy?: string | undefined;
}>;
/**
 * Partial schema for flexible transaction creation
 */
export declare const PartialTransactionRecordSchema: z.ZodObject<{
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    completedAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    active: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    reference: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
}, {
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    completedAt?: string | null | undefined;
    id?: string | undefined;
    active?: boolean | undefined;
    reference?: string | undefined;
}>;
