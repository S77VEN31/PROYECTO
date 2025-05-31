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
import { Badge } from "@/components/ui/badge";
import { Promotion } from "colori-platform-shared";
import { AlertTriangle, Calendar, Percent } from "lucide-react";
import { useState } from "react";

interface DeletePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  onPromotionDeleted: (promotionId: string) => void;
}

/**
 * Dialog component for deleting promotions
 */
export function DeletePromotionDialog({
  open,
  onOpenChange,
  promotion,
  onPromotionDeleted,
}: DeletePromotionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle promotion deletion
   */
  const handleDelete = async () => {
    if (!promotion) return;

    setIsLoading(true);
    setError(null);

    try {
      const success = await PromotionApiService.deletePromotion({ id: promotion.id });
      
      if (success) {
        onPromotionDeleted(promotion.id);
        onOpenChange(false);
      } else {
        setError("No se pudo eliminar la promoción");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar la promoción");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    setError(null);
    onOpenChange(false);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Get promotion type label
   */
  const getPromotionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      discount: "Descuento",
      bogo: "Compra 1 Lleva 2",
      bundle: "Paquete",
      "free-shipping": "Envío Gratis",
      "gift-with-purchase": "Regalo con Compra",
      seasonal: "Estacional",
    };
    return typeLabels[type] || type;
  };

  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-left">Eliminar Promoción</DialogTitle>
              <DialogDescription className="text-left">
                Esta acción no se puede deshacer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Promotion Information */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">{promotion.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {promotion.description}
                </p>
              </div>
              <Badge variant={promotion.active ? "default" : "secondary"}>
                {promotion.active ? "Activa" : "Inactiva"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium">{getPromotionTypeLabel(promotion.type)}</span>
                </div>
                
                {promotion.code && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Código:</span>
                    <Badge variant="outline" className="text-xs">
                      {promotion.code}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {(promotion.discountValue || promotion.discountPercent) && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Descuento:</span>
                    <span className="font-medium">
                      {promotion.discountValue 
                        ? `€${promotion.discountValue.toFixed(2)}`
                        : `${promotion.discountPercent}%`
                      }
                    </span>
                  </div>
                )}

                {promotion.minimumPurchase && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Mín. compra:</span>
                    <span className="font-medium">€{promotion.minimumPurchase.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Período:</span>
              </div>
              <div className="text-sm space-y-1 ml-6">
                <div>
                  <span className="text-muted-foreground">Inicio:</span>{" "}
                  <span className="font-medium">{formatDate(promotion.startDate)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fin:</span>{" "}
                  <span className="font-medium">{formatDate(promotion.endDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-800">
                  ¿Estás seguro de que quieres eliminar esta promoción?
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Se perderán todos los datos de la promoción</li>
                  <li>• Los códigos promocionales dejarán de funcionar</li>
                  <li>• Esta acción no se puede deshacer</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
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