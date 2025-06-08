/**
 * Upload Routes
 * Handles file upload endpoints and static file serving
 */

import { authMiddleware } from "@middlewares";
import express, { Request, Response } from "express";
import {
  FileUploadService,
  productImageUpload,
} from "../services/file-upload.service";

const router = express.Router();

/**
 * Upload product images endpoint
 * POST /api/upload/products
 */
router.post(
  "/products",
  authMiddleware,
  productImageUpload.array("images", 10) as any,
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      // Validate each file
      const validationErrors: string[] = [];
      files.forEach((file, index) => {
        const validation = FileUploadService.validateImageFile(file);
        if (!validation.isValid) {
          validationErrors.push(`File ${index + 1}: ${validation.error}`);
        }
      });

      if (validationErrors.length > 0) {
        // Delete uploaded files if validation fails
        files.forEach((file) => {
          FileUploadService.deleteFile(file.filename, "products");
        });

        return res.status(400).json({
          success: false,
          message: "File validation failed",
          errors: validationErrors,
        });
      }

      // Convert files to Image objects
      const images = FileUploadService.filesToImages(files, "products");

      res.status(200).json({
        success: true,
        message: `${files.length} image(s) uploaded successfully`,
        data: images,
      });
    } catch (error: any) {
      console.error("Error uploading files:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during file upload",
        error: error.message,
      });
    }
  }
);

/**
 * Delete product image endpoint
 * DELETE /api/upload/products/:filename
 */
router.delete(
  "/products/:filename",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { filename } = req.params;

      if (!filename) {
        return res.status(400).json({
          success: false,
          message: "Filename is required",
        });
      }

      // Validate filename to prevent path traversal
      if (
        filename.includes("..") ||
        filename.includes("/") ||
        filename.includes("\\")
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid filename",
        });
      }

      const deleted = await FileUploadService.deleteFile(filename, "products");

      if (deleted) {
        res.status(200).json({
          success: true,
          message: "Image deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
    } catch (error: any) {
      console.error("Error deleting file:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during file deletion",
        error: error.message,
      });
    }
  }
);

/**
 * Get upload info endpoint
 * GET /api/upload/info
 */
router.get("/info", authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      maxFileSize: "5MB",
      allowedTypes: ["JPEG", "PNG", "WebP", "GIF"],
      maxFiles: 10,
      uploadPath: "/api/upload/products",
    },
  });
});

export default router;
