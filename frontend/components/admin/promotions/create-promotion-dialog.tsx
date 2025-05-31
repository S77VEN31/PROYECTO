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
import { CreatePromotionRequest, Promotion, PromotionType } from "colori-platform-shared";
import { useState } from "react";

interface CreatePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPromotionCreated: (promotion: Promotion) => void;
}

/**
 * Dialog component for creating new promotions
 */
export function CreatePromotionDialog({
  open,
  onOpenChange,
  onPromotionCreated,
}: CreatePromotionDialogProps) {
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

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate discount fields for DISCOUNT type promotions
      if (formData.type === PromotionType.DISCOUNT) {
        if (!formData.discountValue && !formData.discountPercent) {
          setError("Para promociones de descuento, debe especificar al menos un valor de descuento (fijo o porcentual)");
          setIsLoading(false);
          return;
        }
      }

      // Validate dates
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate <= startDate) {
        setError("La fecha de fin debe ser posterior a la fecha de inicio");
        setIsLoading(false);
        return;
      }

      // Prepare promotion data
      const promotionData: CreatePromotionRequest = {
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

      const newPromotion = await PromotionApiService.createPromotion(promotionData);
      onPromotionCreated(newPromotion);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la promoción");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    setFormData({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Promoción</DialogTitle>
          <DialogDescription>
            Completa los datos para crear una nueva promoción
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Básica</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nombre de la Promoción *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Descuento de Fin de Semana"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe los detalles de la promoción"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Tipo de Promoción *</Label>
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
                <Label htmlFor="startDate">Fecha de Inicio *</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">Fecha de Fin *</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="code">Código Promocional</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="Ej: WEEKEND15"
              />
            </div>
          </div>

          {/* Discount Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Configuración de Descuento</h3>
            {formData.type === PromotionType.DISCOUNT && (
              <p className="text-sm text-muted-foreground">
                * Para promociones de descuento, debe especificar al menos un valor de descuento
              </p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountValue">
                  Descuento Fijo (€)
                  {formData.type === PromotionType.DISCOUNT && " *"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discountValue}
                  onChange={(e) => handleInputChange("discountValue", e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="discountPercent">
                  Descuento Porcentual (%)
                  {formData.type === PromotionType.DISCOUNT && " *"}
                </Label>
                <Input
                  id="discountPercent"
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
                <Label htmlFor="minimumPurchase">Compra Mínima (€)</Label>
                <Input
                  id="minimumPurchase"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minimumPurchase}
                  onChange={(e) => handleInputChange("minimumPurchase", e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <Label htmlFor="usageLimit">Límite de Uso</Label>
                <Input
                  id="usageLimit"
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
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleInputChange("active", checked)}
            />
            <Label htmlFor="active">Promoción activa</Label>
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
              {isLoading ? "Creando..." : "Crear Promoción"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 