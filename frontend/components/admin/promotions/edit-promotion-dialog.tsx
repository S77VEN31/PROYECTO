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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Promotion, PromotionType, UpdatePromotionRequest } from "colori-platform-shared";
import { useEffect, useState } from "react";

interface EditPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  onPromotionUpdated: (promotion: Promotion) => void;
}

/**
 * Dialog component for editing existing promotions
 */
export function EditPromotionDialog({
  open,
  onOpenChange,
  promotion,
  onPromotionUpdated,
}: EditPromotionDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: PromotionType.DISCOUNT,
    startDate: "",
    endDate: "",
    code: "",
    discountValue: "",
    discountPercent: "",
    minimumPurchase: "",
    usageLimit: "",
    active: true,
  });

  // Update form data when promotion changes
  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.name || "",
        description: promotion.description || "",
        type: promotion.type,
        startDate: promotion.startDate ? new Date(promotion.startDate).toISOString().slice(0, 16) : "",
        endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().slice(0, 16) : "",
        code: promotion.code || "",
        discountValue: promotion.discountValue?.toString() || "",
        discountPercent: promotion.discountPercent?.toString() || "",
        minimumPurchase: promotion.minimumPurchase?.toString() || "",
        usageLimit: promotion.usageLimit?.toString() || "",
        active: promotion.active ?? true,
      });
    }
  }, [promotion]);

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promotion) return;

    setIsLoading(true);
    setError(null);

    try {
      // Prepare promotion update data
      const updateData: UpdatePromotionRequest = {
        id: promotion.id,
        promotion: {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
          code: formData.code || undefined,
          discountValue: formData.discountValue ? parseFloat(formData.discountValue) : undefined,
          discountPercent: formData.discountPercent ? parseFloat(formData.discountPercent) : undefined,
          minimumPurchase: formData.minimumPurchase ? parseFloat(formData.minimumPurchase) : undefined,
          usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
          active: formData.active,
        },
      };

      const updatedPromotion = await PromotionApiService.updatePromotion(
        { id: promotion.id },
        updateData
      );
      onPromotionUpdated(updatedPromotion);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar la promoción");
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
   * Handle input changes
   */
  const handleInputChange = (field: string, value: string | boolean | PromotionType) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Promoción</DialogTitle>
          <DialogDescription>
            Modifica los datos de la promoción "{promotion.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="edit-name">Nombre de la Promoción *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Descuento de Fin de Semana"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descripción *</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe los detalles de la promoción"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-type">Tipo de Promoción *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value as PromotionType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PromotionType.DISCOUNT}>Descuento</SelectItem>
                    <SelectItem value={PromotionType.BOGO}>Compra 1 Lleva 2</SelectItem>
                    <SelectItem value={PromotionType.BUNDLE}>Paquete</SelectItem>
                    <SelectItem value={PromotionType.FREE_SHIPPING}>Envío Gratis</SelectItem>
                    <SelectItem value={PromotionType.GIFT_WITH_PURCHASE}>Regalo con Compra</SelectItem>
                    <SelectItem value={PromotionType.SEASONAL}>Estacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dates and Code */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Fechas y Código</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startDate">Fecha de Inicio *</Label>
                <Input
                  id="edit-startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-endDate">Fecha de Fin *</Label>
                <Input
                  id="edit-endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-code">Código Promocional</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="Ej: WEEKEND15"
              />
            </div>
          </div>

          {/* Discount Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuración de Descuento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-discountValue">Descuento Fijo (€)</Label>
                <Input
                  id="edit-discountValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discountValue}
                  onChange={(e) => handleInputChange("discountValue", e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="edit-discountPercent">Descuento Porcentual (%)</Label>
                <Input
                  id="edit-discountPercent"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountPercent}
                  onChange={(e) => handleInputChange("discountPercent", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-minimumPurchase">Compra Mínima (€)</Label>
                <Input
                  id="edit-minimumPurchase"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minimumPurchase}
                  onChange={(e) => handleInputChange("minimumPurchase", e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="edit-usageLimit">Límite de Uso</Label>
                <Input
                  id="edit-usageLimit"
                  type="number"
                  min="1"
                  value={formData.usageLimit}
                  onChange={(e) => handleInputChange("usageLimit", e.target.value)}
                  placeholder="Sin límite"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-active"
              checked={formData.active}
              onCheckedChange={(checked) => handleInputChange("active", checked)}
            />
            <Label htmlFor="edit-active">Promoción activa</Label>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar Promoción"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 