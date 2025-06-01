/**
 * Delete Category Dialog Component
 * Modal dialog for confirming category deletion
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "colori-platform-shared";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

/**
 * Delete category dialog props
 */
interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onCategoryDeleted: (categoryId: string) => void;
}

/**
 * Delete category dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  onCategoryDeleted,
}: DeleteCategoryDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle category deletion
   */
  const handleDelete = async () => {
    if (!category) return;

    setIsLoading(true);
    try {
      await CategoryApiService.deleteCategory({ id: category.id });
      onCategoryDeleted(category.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting category:", error);
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

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Eliminar Categoría</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que quieres eliminar la categoría{" "}
            <span className="font-medium text-foreground">{category.name}</span>
            ?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Se perderán todos los datos asociados a esta categoría.
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
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
