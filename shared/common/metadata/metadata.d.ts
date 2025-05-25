/**
 * @fileoverview Metadata-related types used across the application
 */

/**
 * Search engine optimization specific metadata
 * Properties designed for improving search engine visibility
 * @interface SeoMetadata
 * @property {string} [pageTitle] - Custom page title optimized for SEO
 * @property {string} [metaDescription] - Meta description for search engine results pages
 * @property {string[]} [keywords] - SEO keywords for improved search engine indexing
 */
export interface SeoMetadata {
  pageTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}
