/**
 * @fileoverview Image-related types used across the application
 */

/**
 * Visual representation information for entities
 * Used for products, categories, and other entities that need visual display elements
 * @interface Image
 * @property {string} src - URL or path to the image source
 * @property {string} [alt] - Alternative text for the image for accessibility
 * @property {boolean} [isPrimary] - Flag indicating if this is the primary image for the entity
 */
export interface Image {
  src: string;
  alt?: string;
  isPrimary?: boolean;
}
