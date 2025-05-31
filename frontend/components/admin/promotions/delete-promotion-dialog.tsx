"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Promotion } from "colori-platform-shared";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

/**
 * Delete promotion dialog props
 */
interface DeletePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  onPromotionDeleted: (promotionId: string) => void;
}

/**
 * Delete promotion dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function DeletePromotionDialog({
  open,
  onOpenChange,
  promotion,
  onPromotionDeleted,
}: DeletePromotionDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle promotion deletion
   */
  const handleDelete = async () => {
    if (!promotion) return;

    setIsLoading(true);
    try {
      await PromotionApiService.deletePromotion({ id: promotion.id });
      onPromotionDeleted(promotion.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting promotion:", error);
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

  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Eliminar Promoción</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que quieres eliminar la promoción{" "}
            <span className="font-medium text-foreground">
              {promotion.name}
            </span>
            ?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Se perderán todos los datos asociados a esta promoción, incluyendo
            códigos promocionales y configuraciones de descuento.
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
            {isLoading ? "Eliminando..." : "Eliminar Promoción"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 