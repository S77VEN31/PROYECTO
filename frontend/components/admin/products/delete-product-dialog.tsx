/**
 * Delete Product Dialog Component
 * Confirmation dialog for deleting products
 */

"use client";

import { ProductApiService } from "@/api/entities/product.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "colori-platform-shared";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

/**
 * Delete product dialog props
 */
interface DeleteProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductDeleted: (productId: string) => void;
}

/**
 * Delete product dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function DeleteProductDialog({
  product,
  open,
  onOpenChange,
  onProductDeleted,
}: DeleteProductDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle product deletion
   */
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await ProductApiService.deleteProduct({ id: product.id as string });
      onProductDeleted(product.id as string);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      // You could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Eliminar Producto</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que quieres eliminar el producto{" "}
            <span className="font-medium text-foreground">
              {product.name}
            </span>?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Se perderán todos los datos asociados a este producto, incluyendo 
            información nutricional y etiquetas.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 