/**
 * Create Promotion Dialog Component
 * Modal dialog for creating new promotions
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { PromotionApiService } from "@/api/entities/promotion.api";
import {
  PaginatedSelector,
  SelectorItem,
} from "@/components/common/paginated-selector";
import { TagInput } from "@/components/common/tag-input";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
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
import { getPromotionTypeDisplayText } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  CreatePromotionRequestBody,
  Product,
  Promotion,
  PromotionCreate,
  PromotionCreateSchema,
  PromotionType,
} from "colori-platform-shared";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Create promotion dialog props
 */
interface CreatePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPromotionCreated: (promotion: Promotion) => void;
}

// Extend Product and Category to match SelectorItem interface
interface ProductSelectorItem extends Product, SelectorItem {}
interface CategorySelectorItem extends Category, SelectorItem {}

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

  const form = useForm<PromotionCreate>({
    resolver: zodResolver(PromotionCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      type: PromotionType.DISCOUNT,
      startDate: "",
      endDate: "",
      code: "",
      discountValue: undefined,
      discountPercent: undefined,
      minimumPurchase: undefined,
      usageLimit: undefined,
      applicableProducts: [],
      applicableCategories: [],
      active: true,
      slug: "",
      searchTerm: "",
    },
  });

  // Auto-generate slug from name
  const watchedName = form.watch("name");
  useEffect(() => {
    if (watchedName) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchedName, form]);

  /**
   * Fetch products for the paginated selector
   */
  const fetchProducts = async (params: {
    page: number;
    limit: number;
    search?: string;
  }) => {
    const response = await ProductApiService.getProducts(params);
    return response || { data: [], total: 0, page: 1, limit: 10, pages: 0 };
  };

  /**
   * Fetch categories for the paginated selector
   */
  const fetchCategories = async (params: {
    page: number;
    limit: number;
    search?: string;
  }) => {
    const response = await CategoryApiService.getCategories(params);
    return response || { data: [], total: 0, page: 1, limit: 10, pages: 0 };
  };

  /**
   * Handle form submission
   */
  const onSubmit = async (data: PromotionCreate) => {
    setIsLoading(true);
    try {
      // Validate discount fields for DISCOUNT type promotions
      if (data.type === PromotionType.DISCOUNT) {
        if (!data.discountValue && !data.discountPercent) {
          form.setError("discountValue", {
            message:
              "Para promociones de descuento, debe especificar al menos un valor de descuento",
          });
          setIsLoading(false);
          return;
        }
      }

      // Additional client-side validation for dates
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (endDate <= startDate) {
        form.setError("endDate", {
          message: "La fecha de fin debe ser posterior a la fecha de inicio",
        });
        setIsLoading(false);
        return;
      }

      const promotionData: CreatePromotionRequestBody = data;

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
                            {getPromotionTypeDisplayText(type)}
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

            {/* Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configuración</h3>

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Amigable (Slug)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Se genera automáticamente desde el nombre"
                        {...field}
                        className="font-mono text-sm"
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Se usa para crear URLs amigables. Se genera
                      automáticamente pero puedes editarlo.
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="searchTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TagInput
                        label="Términos de Búsqueda Adicionales"
                        placeholder="Escribe un término y presiona Enter..."
                        value={
                          field.value
                            ? field.value
                                .split(",")
                                .map((term) => term.trim())
                                .filter(Boolean)
                            : []
                        }
                        onChange={(tags: string[]) =>
                          field.onChange(tags.join(", "))
                        }
                        description="Ej: oferta, rebaja, especial, etc."
                        maxTags={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Inicio</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date: Date | undefined) =>
                            field.onChange(date?.toISOString())
                          }
                          placeholder="Selecciona fecha y hora de inicio"
                          minDate={new Date()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => {
                    const startDateValue = form.watch("startDate");
                    const minEndDate = startDateValue
                      ? new Date(startDateValue)
                      : new Date();

                    return (
                      <FormItem>
                        <FormLabel>Fecha de Fin</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={(date: Date | undefined) =>
                              field.onChange(date?.toISOString())
                            }
                            placeholder="Selecciona fecha y hora de fin"
                            minDate={minEndDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
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
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined
                              )
                            }
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
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minimumPurchase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compra Mínima (₡)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            placeholder="0"
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined
                              )
                            }
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
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Associations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Aplicabilidad</h3>

              {/* Productos Aplicables */}
              <FormField
                control={form.control}
                name="applicableProducts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productos Aplicables (Opcional)</FormLabel>
                    <div className="text-sm text-muted-foreground mb-3">
                      Selecciona los productos a los que se aplicará esta
                      promoción. Si no seleccionas ninguno, se aplicará a todos
                      los productos.
                    </div>
                    <FormControl>
                      <PaginatedSelector<ProductSelectorItem>
                        value={field.value || []}
                        onChange={field.onChange}
                        fetchItems={fetchProducts}
                        placeholder="Seleccionar productos"
                        searchPlaceholder="Buscar productos..."
                        emptyText="No se encontraron productos."
                        loadingText="Cargando productos..."
                        renderItem={(product) => (
                          <div className="flex-1">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              €{product.price.toFixed(2)}
                            </div>
                          </div>
                        )}
                        renderSelectedItem={(product, onRemove) => (
                          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">
                            <span>{product.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
                              onClick={onRemove}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        pageSize={10}
                        multiple={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categorías Aplicables */}
              <FormField
                control={form.control}
                name="applicableCategories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorías Aplicables (Opcional)</FormLabel>
                    <div className="text-sm text-muted-foreground mb-3">
                      Selecciona las categorías a las que se aplicará esta
                      promoción. Si no seleccionas ninguna, se aplicará a todas
                      las categorías.
                    </div>
                    <FormControl>
                      <PaginatedSelector<CategorySelectorItem>
                        value={field.value || []}
                        onChange={field.onChange}
                        fetchItems={fetchCategories}
                        placeholder="Seleccionar categorías"
                        searchPlaceholder="Buscar categorías..."
                        emptyText="No se encontraron categorías."
                        loadingText="Cargando categorías..."
                        renderItem={(category) => (
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              <span>{category.icon}</span>
                              {category.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Orden: {category.displayOrder}
                            </div>
                          </div>
                        )}
                        renderSelectedItem={(category, onRemove) => (
                          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">
                            <span>{category.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
                              onClick={onRemove}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        pageSize={10}
                        multiple={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status */}
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
