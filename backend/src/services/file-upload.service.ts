/**
 * File Upload Service
 * Handles file upload operations with validation and storage configuration
 */

import { Image } from "colori-platform-shared";
import fs from "fs";
import multer from "multer";
import path from "path";

/**
 * Allowed image MIME types
 */
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

/**
 * Maximum file size (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Upload directory configuration
 */
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const PRODUCTS_DIR = path.join(UPLOAD_DIR, "products");
const PROMOTIONS_DIR = path.join(UPLOAD_DIR, "promotions");

/**
 * Ensure upload directories exist
 */
function ensureUploadDirectories(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(PROMOTIONS_DIR)) {
    fs.mkdirSync(PROMOTIONS_DIR, { recursive: true });
  }
}

/**
 * Generate unique filename
 */
function generateUniqueFilename(originalname: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = path.extname(originalname);
  return `${timestamp}-${random}${extension}`;
}

/**
 * Multer storage configuration for products
 */
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDirectories();
    cb(null, PRODUCTS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  },
});

/**
 * Multer storage configuration for promotions
 */
const promotionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDirectories();
    cb(null, PROMOTIONS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  },
});

/**
 * File filter for images
 */
const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (JPEG, PNG, WebP, GIF)"));
  }
};

/**
 * Multer configuration for product images
 */
export const productImageUpload = multer({
  storage: productStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10, // Maximum 10 files per upload
  },
});

/**
 * Multer configuration for promotion images
 */
export const promotionImageUpload = multer({
  storage: promotionStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 10, // Maximum 10 files per upload
  },
});

/**
 * File Upload Service class
 */
export class FileUploadService {
  /**
   * Get the public URL for an uploaded file
   * @param filename - The filename of the uploaded file
   * @param category - The category of the file (e.g., 'products')
   * @returns The public URL
   */
  static getFileUrl(filename: string, category: string = "products"): string {
    const baseUrl = process.env.BASE_URL || "http://localhost:3001";
    return `${baseUrl}/uploads/${category}/${filename}`;
  }

  /**
   * Convert uploaded files to Image objects
   * @param files - Array of uploaded files
   * @param category - The category of the files
   * @returns Array of Image objects
   */
  static filesToImages(
    files: Express.Multer.File[],
    category: string = "products"
  ): Image[] {
    return files.map((file, index) => ({
      src: this.getFileUrl(file.filename, category),
      alt: `Image ${index + 1}`,
      isPrimary: index === 0, // First image is primary by default
    }));
  }

  /**
   * Delete a file from the filesystem
   * @param filename - The filename to delete
   * @param category - The category of the file
   * @returns Promise<boolean> - Success status
   */
  static async deleteFile(
    filename: string,
    category: string = "products"
  ): Promise<boolean> {
    try {
      const filePath = path.join(UPLOAD_DIR, category, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  /**
   * Delete multiple files
   * @param images - Array of Image objects
   * @param category - The category of the files
   * @returns Promise<boolean> - Success status
   */
  static async deleteImages(
    images: Image[],
    category: string = "products"
  ): Promise<boolean> {
    try {
      const deletePromises = images.map((image) => {
        const filename = path.basename(image.src);
        return this.deleteFile(filename, category);
      });

      const results = await Promise.all(deletePromises);
      return results.every((result) => result);
    } catch (error) {
      console.error("Error deleting images:", error);
      return false;
    }
  }

  /**
   * Validate image file
   * @param file - The file to validate
   * @returns Validation result
   */
  static validateImageFile(file: Express.Multer.File): {
    isValid: boolean;
    error?: string;
  } {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return {
        isValid: false,
        error: "Only image files are allowed (JPEG, PNG, WebP, GIF)",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: "File size must be less than 5MB",
      };
    }

    return { isValid: true };
  }

  /**
   * Get file extension from filename
   * @param filename - The filename
   * @returns The file extension
   */
  static getFileExtension(filename: string): string {
    return path.extname(filename).toLowerCase();
  }

  /**
   * Check if file is an image
   * @param filename - The filename
   * @returns Boolean indicating if file is an image
   */
  static isImageFile(filename: string): boolean {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const extension = this.getFileExtension(filename);
    return imageExtensions.includes(extension);
  }
}
