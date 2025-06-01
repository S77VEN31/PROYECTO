/**
 * @fileoverview Base entity types for the application
 * Defines the foundational types and interfaces for all domain entities in the system
 */

import { Image, SeoMetadata, TimeStamps } from "@shared/common";

/**
 * Core properties shared across all entity types in the system
 * This is the foundation for all domain objects and business entities
 * Database-agnostic - no specific ID implementation
 * @interface EntityBase
 * @extends TimeStamps
 * @property {string} name - Display name of the entity
 * @property {string} description - Detailed description of the entity
 * @property {boolean} [active] - Flag indicating if the entity is currently active in the system
 */
export interface EntityBase extends TimeStamps {
  name: string;
  description: string;
  active?: boolean;
}

/**
 * Extended metadata properties for rich entity information
 * Enhances entities with data needed for display, search, and navigation
 * @interface EntityMetadata
 * @extends EntityBase
 * @property {string} slug - URL-friendly identifier for the entity
 * @property {string} [searchTerm] - Additional keywords for enhancing searchability
 * @property {Image[]} [backgroundImages] - Array of background images for the entity
 */
export interface EntityMetadata extends EntityBase {
  slug: string;
  searchTerm?: string;
  backgroundImages?: Image[];
}

/**
 * Complete metadata set combining business and SEO properties
 * Used for entities that require maximum metadata support
 * @interface FullMetadata
 * @extends EntityMetadata
 * @extends SeoMetadata
 */
export interface FullMetadata extends EntityMetadata, SeoMetadata {}

/**
 * Utility type for creating entities with partial metadata
 * Makes all metadata fields optional to simplify entity creation
 * @type PartialMetadata
 */
export type PartialMetadata = Partial<EntityMetadata>;

/**
 * Client-side entity with string ID (for frontend/API responses)
 * @interface ClientEntity
 * @template T - The entity type to extend with client ID
 */
export interface ClientEntity<T> extends T {
  id: string;
}

/**
 * Database entity with MongoDB ObjectId (for backend/database operations)
 * @interface DatabaseEntity
 * @template T - The entity type to extend with database ID
 */
export interface DatabaseEntity<T> extends T {
  _id: string; // MongoDB ObjectId as string for serialization
}
