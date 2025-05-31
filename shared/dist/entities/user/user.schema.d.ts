/**
 * Schemas for User entities
 */
import { UserRole } from "../../enums";
import { z } from "zod";
/**
 * Schema for core user profile information
 */
export declare const UserBaseSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodString;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
} & {
    slug: z.ZodString;
    searchTerm: z.ZodOptional<z.ZodString>;
    backgroundImages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        src: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }, {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
} & {
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    lastLogin: z.ZodNullable<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    active: boolean;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string | null;
    password: string;
    id?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string | null;
    password: string;
    id?: string | undefined;
    active?: boolean | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
/**
 * Schema for complete user representation
 */
export declare const UserSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    slug: z.ZodString;
    searchTerm: z.ZodOptional<z.ZodString>;
    backgroundImages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        src: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }, {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    lastLogin: z.ZodNullable<z.ZodString>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    description: string;
    active: boolean;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string | null;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    description: string;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string | null;
    active?: boolean | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
/**
 * Schema for user creation
 */
export declare const UserCreateSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    name: z.ZodString;
    description: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
    role?: UserRole | undefined;
}, {
    name: string;
    description: string;
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
    role?: UserRole | undefined;
}>;
/**
 * Schema for user updates
 */
export declare const UserUpdateSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodBoolean>;
    lastLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | null | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | null | undefined;
}>;
/**
 * User request validation schemas
 */
export declare const GetUsersRequestSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
} & {
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
} & {
    role: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role?: string | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}, {
    role?: string | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const GetUserRequestParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreateUserRequestBodySchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    name: z.ZodString;
    description: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
    role?: UserRole | undefined;
}, {
    name: string;
    description: string;
    firstName: string;
    email: string;
    password: string;
    lastName?: string | undefined;
    role?: UserRole | undefined;
}>;
export declare const UpdateUserRequestParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const UpdateUserRequestBodySchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodBoolean>;
    lastLogin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | null | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | null | undefined;
}>;
export declare const DeleteUserRequestParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const LoginRequestSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
//# sourceMappingURL=user.schema.d.ts.map