/**
 * Schemas for Category entities
 */
import { CategoryVariant } from "../../enums";
import { z } from "zod";
/**
 * Schema for core category information
 */
export declare const CategoryBaseSchema: z.ZodObject<{
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
    icon: z.ZodString;
    displayOrder: z.ZodNumber;
    products: z.ZodArray<z.ZodString, "many">;
    variant: z.ZodNativeEnum<typeof CategoryVariant>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    icon: string;
    displayOrder: number;
    products: string[];
    variant: CategoryVariant;
    id?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    slug: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    displayOrder: number;
    products: string[];
    variant: CategoryVariant;
    id?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    active?: boolean | undefined;
}>;
/**
 * Schema for complete category representation
 */
export declare const CategorySchema: z.ZodObject<{
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
    icon: z.ZodString;
    displayOrder: z.ZodNumber;
    products: z.ZodArray<z.ZodString, "many">;
    variant: z.ZodNativeEnum<typeof CategoryVariant>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    icon: string;
    displayOrder: number;
    products: string[];
    variant: CategoryVariant;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    id: string;
    slug: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    displayOrder: number;
    products: string[];
    variant: CategoryVariant;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    active?: boolean | undefined;
}>;
/**
 * Schema for category creation
 */
export declare const CategoryCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    displayOrder: z.ZodOptional<z.ZodNumber>;
    products: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    variant: z.ZodOptional<z.ZodNativeEnum<typeof CategoryVariant>>;
    slug: z.ZodOptional<z.ZodString>;
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
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    icon?: string | undefined;
    displayOrder?: number | undefined;
    products?: string[] | undefined;
    variant?: CategoryVariant | undefined;
}, {
    name: string;
    description: string;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    icon?: string | undefined;
    displayOrder?: number | undefined;
    products?: string[] | undefined;
    variant?: CategoryVariant | undefined;
}>;
/**
 * Schema for category updates
 */
export declare const CategoryUpdateSchema: z.ZodObject<{
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
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    displayOrder: z.ZodOptional<z.ZodNumber>;
    products: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    variant: z.ZodOptional<z.ZodNativeEnum<typeof CategoryVariant>>;
}, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    icon?: string | undefined;
    displayOrder?: number | undefined;
    products?: string[] | undefined;
    variant?: CategoryVariant | undefined;
}, {
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    name?: string | undefined;
    description?: string | undefined;
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    icon?: string | undefined;
    displayOrder?: number | undefined;
    products?: string[] | undefined;
    variant?: CategoryVariant | undefined;
}>;
/**
 * Category request validation schemas
 */
export declare const GetCategoryRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreateCategoryRequestSchema: z.ZodObject<{
    category: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        order: z.ZodOptional<z.ZodNumber>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        active: boolean;
        description?: string | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    }, {
        name: string;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    category: {
        name: string;
        active: boolean;
        description?: string | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    };
}, {
    category: {
        name: string;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    };
}>;
export declare const UpdateCategoryRequestSchema: z.ZodObject<{
    id: z.ZodString;
    category: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
        active: z.ZodOptional<z.ZodBoolean>;
        order: z.ZodOptional<z.ZodNumber>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    }, {
        name?: string | undefined;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    category: {
        name?: string | undefined;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    };
}, {
    id: string;
    category: {
        name?: string | undefined;
        description?: string | undefined;
        active?: boolean | undefined;
        image?: string | undefined;
        order?: number | undefined;
        metadata?: Record<string, string> | undefined;
    };
}>;
export declare const DeleteCategoryRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
