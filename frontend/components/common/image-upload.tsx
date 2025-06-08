/**
 * Image Upload Component
 * Handles multiple image uploads with drag & drop, preview, and validation
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Image } from "colori-platform-shared";
import { AlertCircle, ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

/**
 * Image upload component props
 */
interface ImageUploadProps {
  label?: string;
  description?: string;
  value?: Image[];
  onChange: (images: Image[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  disabled?: boolean;
  className?: string;
  onUpload?: (files: File[]) => Promise<Image[]>;
}

/**
 * Image upload component
 * @param props - Component props
 * @returns JSX element
 */
export function ImageUpload({
  label = "Imágenes",
  description = "Arrastra y suelta imágenes aquí o haz clic para seleccionar",
  value = [],
  onChange,
  maxFiles = 10,
  maxFileSize = 5,
  disabled = false,
  className,
  onUpload,
}: ImageUploadProps): React.JSX.Element {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * Handle file drop or selection
   */
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || !onUpload) return;

      // Check if adding these files would exceed the limit
      if (value.length + acceptedFiles.length > maxFiles) {
        setUploadError(`Máximo ${maxFiles} imágenes permitidas`);
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        const uploadedImages = await onUpload(acceptedFiles);

        // Adjust isPrimary logic: only the first image overall should be primary
        const adjustedUploadedImages = uploadedImages.map((img, index) => ({
          ...img,
          isPrimary: value.length === 0 && index === 0, // Only first image if no existing images
        }));

        onChange([...value, ...adjustedUploadedImages]);
      } catch (error: unknown) {
        setUploadError(
          (error as Error).message || "Error al subir las imágenes"
        );
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange, maxFiles, disabled, onUpload]
  );

  /**
   * Validate file before upload
   */
  const validator = useCallback(
    (file: File) => {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        return {
          code: "file-too-large",
          message: `El archivo debe ser menor a ${maxFileSize}MB`,
        };
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        return {
          code: "file-invalid-type",
          message: "Solo se permiten archivos de imagen",
        };
      }

      return null;
    },
    [maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      validator,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
      },
      maxFiles: maxFiles - value.length,
      disabled: disabled || isUploading,
    });

  /**
   * Remove an image from the list
   */
  const removeImage = (index: number) => {
    if (disabled) return;
    const removedImage = value[index];
    const newImages = value.filter((_, i) => i !== index);

    // If we removed the primary image and there are still images left,
    // make the first remaining image primary
    if (removedImage.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    onChange(newImages);
  };

  /**
   * Set an image as primary
   */
  const setPrimaryImage = (index: number) => {
    if (disabled) return;
    const newImages = value.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  /**
   * Update image alt text
   */
  const updateImageAlt = (index: number, alt: string) => {
    if (disabled) return;
    const newImages = value.map((img, i) =>
      i === index ? { ...img, alt } : img
    );
    onChange(newImages);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Label and Description */}
      <div>
        <Label className="text-base font-medium">{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Upload Area */}
      {value.length < maxFiles && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              {isDragActive ? (
                <p>Suelta las imágenes aquí...</p>
              ) : (
                <div>
                  <p className="font-medium">
                    Haz clic para seleccionar o arrastra imágenes
                  </p>
                  <p className="text-muted-foreground">
                    Máximo {maxFiles} archivos, {maxFileSize}MB cada uno
                  </p>
                </div>
              )}
            </div>
            {isUploading && (
              <p className="text-sm text-primary">Subiendo imágenes...</p>
            )}
          </div>
        </div>
      )}

      {/* Upload Errors */}
      {(uploadError || fileRejections.length > 0) && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Error de carga</span>
          </div>
          {uploadError && (
            <p className="text-sm text-destructive mt-1">{uploadError}</p>
          )}
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-destructive mt-1">
              <span className="font-medium">{file.name}:</span>{" "}
              {errors.map((e: { message: string }) => e.message).join(", ")}
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Imágenes ({value.length}/{maxFiles})
            </Label>
            {value.length > 1 && (
              <p className="text-xs text-muted-foreground">
                Haz clic en una imagen para marcarla como principal
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative group border rounded-lg overflow-hidden",
                  image.isPrimary && "ring-2 ring-primary"
                )}
              >
                {/* Image */}
                <div
                  className="aspect-square bg-muted flex items-center justify-center cursor-pointer"
                  onClick={() => setPrimaryImage(index)}
                >
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.alt || `Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>

                {/* Primary Badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}

                {/* Remove Button */}
                {!disabled && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}

                {/* Alt Text Input */}
                <div className="p-2 border-t">
                  <Input
                    placeholder="Texto alternativo"
                    value={image.alt || ""}
                    onChange={(e) => updateImageAlt(index, e.target.value)}
                    disabled={disabled}
                    className="text-xs h-7"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Text */}
      {value.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No hay imágenes seleccionadas. Las imágenes ayudan a mostrar mejor tu
          producto.
        </p>
      )}
    </div>
  );
}
