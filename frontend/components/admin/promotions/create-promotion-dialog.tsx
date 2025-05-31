/**
 * Create Promotion Dialog Component
 * Modal dialog for creating new promotions
 */

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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
    CreatePromotionRequest,
    Promotion,
    PromotionType,
} from "colori-platform-shared";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Simple form data type
interface CreatePromotionFormData {
  name: string;
  description: string;
  type: PromotionType;
  startDate: string;
  endDate: string;
  code?: string;
  discountValue?: string;
  discountPercent?: string;
  minimumPurchase?: string;
  usageLimit?: string;
  active: boolean;
}

/**
 * Create promotion dialog props
 */
interface CreatePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPromotionCreated: (promotion: Promotion) => void;
}

/**
 * Create promotion dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function CreatePromotionDialog({
  open,
  onOpenChange,
  onPromotionCreated,
}: CreatePromotionDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreatePromotionFormData>({
    defaultValues: {
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
    },
  });

  /**
   * Handle form submission
   */
  const onSubmit = async (data: CreatePromotionFormData) => {
    setIsLoading(true);
    try {
      // Convert string values to numbers
      const discountValue = data.discountValue
        ? parseFloat(data.discountValue)
        : undefined;
      const discountPercent = data.discountPercent
        ? parseFloat(data.discountPercent)
        : undefined;
      const minimumPurchase = data.minimumPurchase
        ? parseFloat(data.minimumPurchase)
        : undefined;
      const usageLimit = data.usageLimit
        ? parseInt(data.usageLimit)
        : undefined;

      // Validate discount fields for DISCOUNT type promotions
      if (data.type === PromotionType.DISCOUNT) {
        if (!discountValue && !discountPercent) {
          form.setError("discountValue", {
            message:
              "Para promociones de descuento, debe especificar al menos un valor de descuento",
          });
          setIsLoading(false);
          return;
        }
      }

      // Validate dates
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (endDate <= startDate) {
        form.setError("endDate", {
          message: "La fecha de fin debe ser posterior a la fecha de inicio",
        });
        setIsLoading(false);
        return;
      }

      const promotionData: CreatePromotionRequest = {
        promotion: {
          name: data.name,
          description: data.description,
          type: data.type,
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString(),
          code: data.code || undefined,
          discountValue: discountValue,
          discountPercent: discountPercent,
          minimumPurchase: minimumPurchase,
          usageLimit: usageLimit,
          active: data.active,
        },
      };

      const newPromotion = await PromotionApiService.createPromotion(
        promotionData
      );
      onPromotionCreated(newPromotion);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating promotion:", error);
      // You could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  /**
   * Get promotion type label
   */
  const getPromotionTypeLabel = (type: PromotionType): string => {
    const typeLabels: Record<PromotionType, string> = {
      [PromotionType.DISCOUNT]: "Descuento",
      [PromotionType.BOGO]: "Compra 1 Lleva 2",
      [PromotionType.BUNDLE]: "Paquete",
      [PromotionType.FREE_SHIPPING]: "Envío Gratis",
      [PromotionType.GIFT_WITH_PURCHASE]: "Regalo con Compra",
      [PromotionType.SEASONAL]: "Estacional",
    };
    return typeLabels[type] || type;
  };

  const selectedType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Promoción</DialogTitle>
          <DialogDescription>
            Completa la información para crear una nueva promoción.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Básica</h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Promoción</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Descuento de Fin de Semana"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe los detalles de la promoción"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Promoción</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(PromotionType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {getPromotionTypeLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Promocional (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: DESCUENTO20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Período de Validez</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Inicio</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Fin</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Discount Configuration */}
            {selectedType === PromotionType.DISCOUNT && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Configuración de Descuento
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descuento Fijo (€)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descuento Porcentual (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Additional Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configuración Adicional</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minimumPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compra Mínima (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Límite de Uso</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Sin límite"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Promoción Activa
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        La promoción estará disponible para los clientes
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Promoción"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
