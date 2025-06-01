/**
 * Type declarations for Promotion entities
 */

import { Image } from "@shared/common";
import { ClientEntity, DatabaseEntity, EntityMetadata } from "@shared/entities";
import { PromotionType } from "@shared/enums";

/**
 * Core promotion information with discount rules
 * @interface PromotionBase
 * @extends EntityMetadata
 * @property {PromotionType} type - Type of promotional campaign
 * @property {string} startDate - ISO date when the promotion becomes active
 * @property {string} endDate - ISO date when the promotion expires
 * @property {string} [code] - Optional promotional code for customer redemption
 * @property {number} [discountValue] - Fixed discount amount in currency units
 * @property {number} [discountPercent] - Percentage discount to apply
 * @property {number} [minimumPurchase] - Minimum order total required to qualify
 * @property {number} [usageLimit] - Maximum number of times promotion can be used
 * @property {string[]} [applicableProducts] - IDs of products eligible for promotion
 * @property {string[]} [applicableCategories] - IDs of categories eligible for promotion
 */
export declare interface PromotionBase extends EntityMetadata {
  type: PromotionType;
  startDate: string;
  endDate: string;
  code?: string;
  discountValue?: number;
  discountPercent?: number;
  minimumPurchase?: number;
  usageLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

/**
 * Complete promotion representation for client-side (API responses, frontend)
 * @interface Promotion
 * @extends ClientEntity<PromotionBase>
 * @property {string} id - Unique identifier for the promotion
 * @property {string} name - Name of the promotion
 * @property {string} description - Description of the promotion
 * @property {boolean} [active] - Whether the promotion is active
 * @property {string} slug - URL-friendly identifier
 * @property {string} [searchTerm] - Additional search keywords
 * @property {Image[]} [backgroundImages] - Background images for the promotion
 * @property {PromotionType} type - Type of promotion
 * @property {string} startDate - Start date of the promotion
 * @property {string} endDate - End date of the promotion
 * @property {string} [code] - Promotional code
 * @property {number} [discountValue] - Fixed discount amount
 * @property {number} [discountPercent] - Percentage discount
 * @property {number} [minimumPurchase] - Minimum purchase requirement
 * @property {number} [usageLimit] - Usage limit
 * @property {string[]} [applicableProducts] - Applicable product IDs
 * @property {string[]} [applicableCategories] - Applicable category IDs
 */
export declare interface Promotion extends ClientEntity<PromotionBase> {
  // Explicit declaration of inherited properties for better type resolution
  // From EntityBase
  name: string;
  description: string;
  active?: boolean;
  // From EntityMetadata
  slug: string;
  searchTerm?: string;
  backgroundImages?: Image[];
  // From PromotionBase
  type: PromotionType;
  startDate: string;
  endDate: string;
  code?: string;
  discountValue?: number;
  discountPercent?: number;
  minimumPurchase?: number;
  usageLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
}

/**
 * Promotion representation for database operations (backend)
 * @interface PromotionDocument
 * @extends DatabaseEntity<PromotionBase>
 * @property {string} _id - MongoDB ObjectId as string
 */
export declare interface PromotionDocument
  extends DatabaseEntity<PromotionBase> {}

/**
 * Input type for promotion creation operations
 * @type PromotionCreate
 */
export declare type PromotionCreate = {
  // Required fields from EntityBase
  name: string;
  description: string;
  // Required promotion-specific fields
  type: PromotionType;
  startDate: string;
  endDate: string;
  // Optional promotion-specific fields
  code?: string;
  discountValue?: number;
  discountPercent?: number;
  minimumPurchase?: number;
  usageLimit?: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
  // Optional EntityBase fields
  active?: boolean;
  // Optional EntityMetadata fields
  slug?: string;
  searchTerm?: string;
  backgroundImages?: Image[];
};

/**
 * Input type for promotion update operations
 * @type PromotionUpdate
 */
export declare type PromotionUpdate = Partial<{
  name: string;
  description: string;
  type: PromotionType;
  startDate: string;
  endDate: string;
  code: string;
  discountValue: number;
  discountPercent: number;
  minimumPurchase: number;
  usageLimit: number;
  applicableProducts: string[];
  applicableCategories: string[];
  slug: string;
  searchTerm: string;
  active: boolean;
}>;

/**
 * @fileoverview Promotion API request and response type definitions
 */

import {
  ApiResponse,
  CreateResponse,
  DeleteResponse,
  GetResponse,
  IdParam,
  PaginatedResponse,
  PaginationParams,
  SearchableParams,
  UpdateResponse,
} from "@shared/common";

/**
 * Promotion filter parameters
 * @interface PromotionFilterParams
 * @extends PaginationParams
 * @extends SearchableParams
 * @property {boolean} [active] - Filter by active status
 * @property {string} [type] - Filter by promotion type
 */
export interface PromotionFilterParams
  extends PaginationParams,
    SearchableParams {
  active?: boolean;
  type?: string;
}

// GET /promotions
export interface GetPromotionsRequestParams extends PromotionFilterParams {}

export interface GetPromotionsResponse
  extends ApiResponse<PaginatedResponse<Promotion>> {}

// GET /promotions/:id - params only
export interface GetPromotionRequestParams extends IdParam {}

export interface GetPromotionResponse extends GetResponse<Promotion> {}

// POST /promotions - body only (promotion data without nesting)
export interface CreatePromotionRequestBody extends PromotionCreate {}

export interface CreatePromotionResponse
  extends CreateResponse<PromotionCreate> {}

// PUT /promotions/:id - params + body
export interface UpdatePromotionRequestParams extends IdParam {}

export interface UpdatePromotionRequestBody extends PromotionUpdate {}

export interface UpdatePromotionResponse
  extends UpdateResponse<PromotionUpdate> {}

// DELETE /promotions/:id - params only
export interface DeletePromotionRequestParams extends IdParam {}

export interface DeletePromotionResponse extends DeleteResponse<Promotion> {}

