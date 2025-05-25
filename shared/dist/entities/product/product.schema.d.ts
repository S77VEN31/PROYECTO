/**
 * Schemas for Product entities
 */
import { z } from "zod";
/**
 * Schema for nutritional information
 */
export declare const NutritionalInfoSchema: z.ZodObject<{
    calories: z.ZodOptional<z.ZodNumber>;
    protein: z.ZodOptional<z.ZodNumber>;
    carbs: z.ZodOptional<z.ZodNumber>;
    fat: z.ZodOptional<z.ZodNumber>;
    allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    calories?: number | undefined;
    protein?: number | undefined;
    carbs?: number | undefined;
    fat?: number | undefined;
    allergens?: string[] | undefined;
}, {
    calories?: number | undefined;
    protein?: number | undefined;
    carbs?: number | undefined;
    fat?: number | undefined;
    allergens?: string[] | undefined;
}>;
/**
 * Schema for core product information
 */
export declare const ProductBaseSchema: z.ZodObject<{
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
    price: z.ZodNumber;
    longDescription: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    nutritionalInfo: z.ZodOptional<z.ZodObject<{
        calories: z.ZodOptional<z.ZodNumber>;
        protein: z.ZodOptional<z.ZodNumber>;
        carbs: z.ZodOptional<z.ZodNumber>;
        fat: z.ZodOptional<z.ZodNumber>;
        allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }>>;
    preparationTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    active: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    id?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    id?: string | undefined;
    active?: boolean | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}>;
/**
 * Schema for complete product representation
 */
export declare const ProductSchema: z.ZodObject<{
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
    price: z.ZodNumber;
    longDescription: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    nutritionalInfo: z.ZodOptional<z.ZodObject<{
        calories: z.ZodOptional<z.ZodNumber>;
        protein: z.ZodOptional<z.ZodNumber>;
        carbs: z.ZodOptional<z.ZodNumber>;
        fat: z.ZodOptional<z.ZodNumber>;
        allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }>>;
    preparationTime: z.ZodOptional<z.ZodNumber>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    active?: boolean | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}>;
/**
 * Schema for product creation
 */
export declare const ProductCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    longDescription: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    nutritionalInfo: z.ZodOptional<z.ZodObject<{
        calories: z.ZodOptional<z.ZodNumber>;
        protein: z.ZodOptional<z.ZodNumber>;
        carbs: z.ZodOptional<z.ZodNumber>;
        fat: z.ZodOptional<z.ZodNumber>;
        allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }>>;
    preparationTime: z.ZodOptional<z.ZodNumber>;
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
    price: number;
    description: string;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}, {
    name: string;
    price: number;
    description: string;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}>;
/**
 * Schema for product updates
 */
export declare const ProductUpdateSchema: z.ZodObject<{
    active: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
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
    longDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    nutritionalInfo: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        calories: z.ZodOptional<z.ZodNumber>;
        protein: z.ZodOptional<z.ZodNumber>;
        carbs: z.ZodOptional<z.ZodNumber>;
        fat: z.ZodOptional<z.ZodNumber>;
        allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }, {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    }>>>;
    preparationTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    longDescription?: string | undefined;
    tags?: string[] | undefined;
    nutritionalInfo?: {
        calories?: number | undefined;
        protein?: number | undefined;
        carbs?: number | undefined;
        fat?: number | undefined;
        allergens?: string[] | undefined;
    } | undefined;
    preparationTime?: number | undefined;
}>;
/**
 * Product request validation schemas
 */
export declare const GetProductRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreateProductRequestSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        longDescription: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        nutritionalInfo: z.ZodOptional<z.ZodObject<{
            calories: z.ZodOptional<z.ZodNumber>;
            protein: z.ZodOptional<z.ZodNumber>;
            carbs: z.ZodOptional<z.ZodNumber>;
            fat: z.ZodOptional<z.ZodNumber>;
            allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        }, {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        }>>;
        category: z.ZodOptional<z.ZodString>;
        preparationTime: z.ZodOptional<z.ZodNumber>;
        images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
        name: string;
        price: number;
        description: string;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    }, {
        name: string;
        price: number;
        description: string;
        active?: boolean | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    product: {
        active: boolean;
        name: string;
        price: number;
        description: string;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    };
}, {
    product: {
        name: string;
        price: number;
        description: string;
        active?: boolean | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    };
}>;
export declare const UpdateProductRequestSchema: z.ZodObject<{
    id: z.ZodString;
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        longDescription: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        nutritionalInfo: z.ZodOptional<z.ZodObject<{
            calories: z.ZodOptional<z.ZodNumber>;
            protein: z.ZodOptional<z.ZodNumber>;
            carbs: z.ZodOptional<z.ZodNumber>;
            fat: z.ZodOptional<z.ZodNumber>;
            allergens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        }, {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        }>>;
        category: z.ZodOptional<z.ZodString>;
        preparationTime: z.ZodOptional<z.ZodNumber>;
        images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        active: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        active?: boolean | undefined;
        name?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    }, {
        active?: boolean | undefined;
        name?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    product: {
        active?: boolean | undefined;
        name?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    };
}, {
    id: string;
    product: {
        active?: boolean | undefined;
        name?: string | undefined;
        price?: number | undefined;
        description?: string | undefined;
        category?: string | undefined;
        longDescription?: string | undefined;
        tags?: string[] | undefined;
        nutritionalInfo?: {
            calories?: number | undefined;
            protein?: number | undefined;
            carbs?: number | undefined;
            fat?: number | undefined;
            allergens?: string[] | undefined;
        } | undefined;
        preparationTime?: number | undefined;
        images?: string[] | undefined;
    };
}>;
export declare const DeleteProductRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
