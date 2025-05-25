/**
 * Schemas for User entities
 */
import { UserRole } from "@shared/enums";
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
    lastLogin: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    active: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string;
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
    lastLogin: string;
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
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
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
    lastLogin: z.ZodString;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    slug: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    lastLogin: string;
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
    lastName: z.ZodString;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    name: z.ZodString;
    description: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole | undefined;
}, {
    name: string;
    description: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole | undefined;
}>;
/**
 * Schema for user updates
 */
export declare const UserUpdateSchema: z.ZodObject<{
    active: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    searchTerm: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    backgroundImages: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    lastLogin: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | undefined;
}, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: UserRole | undefined;
    lastLogin?: string | undefined;
}>;
/**
 * User request validation schemas
 */
export declare const GetUserRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreateUserRequestSchema: z.ZodObject<{
    user: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
        active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role?: UserRole | undefined;
    }, {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        active?: boolean | undefined;
        role?: UserRole | undefined;
    }>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    user: {
        active: boolean;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role?: UserRole | undefined;
    };
}, {
    password: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        active?: boolean | undefined;
        role?: UserRole | undefined;
    };
}>;
export declare const UpdateUserRequestSchema: z.ZodObject<{
    id: z.ZodString;
    user: z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
        active: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        active?: boolean | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        role?: UserRole | undefined;
    }, {
        active?: boolean | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        role?: UserRole | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    user: {
        active?: boolean | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        role?: UserRole | undefined;
    };
}, {
    id: string;
    user: {
        active?: boolean | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        email?: string | undefined;
        role?: UserRole | undefined;
    };
}>;
export declare const DeleteUserRequestSchema: z.ZodObject<{
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
