/**
 * Type declarations for Promotion entities
 */

import { EntityBase, EntityMetadata } from "@shared/entities";
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
 * Complete promotion representation with unique identifier
 * @interface Promotion
 * @extends PromotionBase
 * @property {string} id - Unique identifier for the promotion
 */
export declare interface Promotion extends PromotionBase {
  id: string;
}

/**
 * Input type for promotion creation operations
 * @type PromotionCreate
 */
export declare type PromotionCreate = Omit<Partial<Promotion>, "id"> &
  Pick<EntityBase, "name" | "description">;

/**
 * Input type for promotion update operations
 * @type PromotionUpdate
 */
export declare type PromotionUpdate = Omit<Partial<Promotion>, "id">;

/**
 * @fileoverview Promotion API request and response type definitions
 */

import { IdParam, PaginationParams } from "@shared/common";
import { Promotion, PromotionCreate, PromotionUpdate } from "@shared/entities";

// GET /promotions
export interface GetPromotionsRequest extends PaginationParams {
  active?: boolean;
  search?: string;
  type?: string;
}

export interface GetPromotionsResponse {
  promotions: Promotion[];
  total: number;
  page: number;
  limit: number;
}

// GET /promotions/:id
export interface GetPromotionRequest extends IdParam {}

export interface GetPromotionResponse {
  promotion: Promotion;
}

// POST /promotions
export interface CreatePromotionRequest {
  promotion: PromotionCreate;
}

export interface CreatePromotionResponse {
  id: string;
  promotion: Promotion;
}

// PUT /promotions/:id
export interface UpdatePromotionRequest extends IdParam {
  promotion: PromotionUpdate;
}

export interface UpdatePromotionResponse {
  updated: boolean;
  promotion: Promotion;
}

// DELETE /promotions/:id
export interface DeletePromotionRequest extends IdParam {}

export interface DeletePromotionResponse {
  deleted: boolean;
}

// Request type extensions for Express
declare global {
  namespace Express {
    interface Request<P = any, ResBody = any, ReqBody = any> {
      params: P;
    }
  }
}

// Express compatible request types
export type GetPromotionRequestParams = {
  id: string;
};

export type UpdatePromotionRequestParams = {
  id: string;
};

export type DeletePromotionRequestParams = {
  id: string;
};
