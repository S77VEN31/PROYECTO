/**
 * Schemas for Promotion entities
 */
import { PromotionType } from "@shared/enums";
import { z } from "zod";
/**
 * Schema for core promotion information
 */
export declare const PromotionBaseSchema: z.ZodObject<{
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
    type: z.ZodNativeEnum<typeof PromotionType>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    discountPercent: z.ZodOptional<z.ZodNumber>;
    minimumPurchase: z.ZodOptional<z.ZodNumber>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    applicableProducts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    applicableCategories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    active: boolean;
    createdAt: string;
    updatedAt: string;
    type: PromotionType;
    name: string;
    description: string;
    slug: string;
    startDate: string;
    endDate: string;
    id?: string | undefined;
    code?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    type: PromotionType;
    name: string;
    description: string;
    slug: string;
    startDate: string;
    endDate: string;
    id?: string | undefined;
    active?: boolean | undefined;
    code?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}>;
/**
 * Schema for complete promotion representation
 */
export declare const PromotionSchema: z.ZodObject<{
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
    type: z.ZodNativeEnum<typeof PromotionType>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    discountPercent: z.ZodOptional<z.ZodNumber>;
    minimumPurchase: z.ZodOptional<z.ZodNumber>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    applicableProducts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    applicableCategories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    type: PromotionType;
    name: string;
    description: string;
    slug: string;
    startDate: string;
    endDate: string;
    code?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    type: PromotionType;
    name: string;
    description: string;
    slug: string;
    startDate: string;
    endDate: string;
    active?: boolean | undefined;
    code?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}>;
/**
 * Schema for promotion creation
 */
export declare const PromotionCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    type: z.ZodNativeEnum<typeof PromotionType>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    discountPercent: z.ZodOptional<z.ZodNumber>;
    minimumPurchase: z.ZodOptional<z.ZodNumber>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    applicableProducts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    applicableCategories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
    type: PromotionType;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    code?: string | undefined;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}, {
    type: PromotionType;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    code?: string | undefined;
    slug?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}>;
/**
 * Schema for promotion updates
 */
export declare const PromotionUpdateSchema: z.ZodObject<{
    active: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    type: z.ZodOptional<z.ZodNativeEnum<typeof PromotionType>>;
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
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    discountValue: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    discountPercent: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    minimumPurchase: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    usageLimit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    applicableProducts: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    applicableCategories: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    code?: string | undefined;
    type?: PromotionType | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}, {
    active?: boolean | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    code?: string | undefined;
    type?: PromotionType | undefined;
    name?: string | undefined;
    description?: string | undefined;
    slug?: string | undefined;
    searchTerm?: string | undefined;
    backgroundImages?: {
        src: string;
        alt?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    discountValue?: number | undefined;
    discountPercent?: number | undefined;
    minimumPurchase?: number | undefined;
    usageLimit?: number | undefined;
    applicableProducts?: string[] | undefined;
    applicableCategories?: string[] | undefined;
}>;
/**
 * Promotion request validation schemas
 */
export declare const GetPromotionRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const CreatePromotionRequestSchema: z.ZodObject<{
    promotion: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        type: z.ZodNativeEnum<typeof PromotionType>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        discountValue: z.ZodOptional<z.ZodNumber>;
        discountPercent: z.ZodOptional<z.ZodNumber>;
        minimumPurchase: z.ZodOptional<z.ZodNumber>;
        usageLimit: z.ZodOptional<z.ZodNumber>;
        applicableProducts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        applicableCategories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        active: boolean;
        type: PromotionType;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        code?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    }, {
        type: PromotionType;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        active?: boolean | undefined;
        code?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    promotion: {
        active: boolean;
        type: PromotionType;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        code?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    };
}, {
    promotion: {
        type: PromotionType;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        active?: boolean | undefined;
        code?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    };
}>;
export declare const UpdatePromotionRequestSchema: z.ZodObject<{
    id: z.ZodString;
    promotion: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodNativeEnum<typeof PromotionType>>;
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        code: z.ZodOptional<z.ZodString>;
        discountValue: z.ZodOptional<z.ZodNumber>;
        discountPercent: z.ZodOptional<z.ZodNumber>;
        minimumPurchase: z.ZodOptional<z.ZodNumber>;
        usageLimit: z.ZodOptional<z.ZodNumber>;
        applicableProducts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        applicableCategories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        active: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        active?: boolean | undefined;
        code?: string | undefined;
        type?: PromotionType | undefined;
        name?: string | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    }, {
        active?: boolean | undefined;
        code?: string | undefined;
        type?: PromotionType | undefined;
        name?: string | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    promotion: {
        active?: boolean | undefined;
        code?: string | undefined;
        type?: PromotionType | undefined;
        name?: string | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    };
}, {
    id: string;
    promotion: {
        active?: boolean | undefined;
        code?: string | undefined;
        type?: PromotionType | undefined;
        name?: string | undefined;
        description?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        discountValue?: number | undefined;
        discountPercent?: number | undefined;
        minimumPurchase?: number | undefined;
        usageLimit?: number | undefined;
        applicableProducts?: string[] | undefined;
        applicableCategories?: string[] | undefined;
    };
}>;
export declare const DeletePromotionRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
