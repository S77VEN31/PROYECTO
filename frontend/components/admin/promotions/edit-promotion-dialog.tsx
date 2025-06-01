"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { PromotionApiService } from "@/api/entities/promotion.api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Product,
  Promotion,
  PromotionCreate,
  PromotionType,
  PromotionUpdate,
  PromotionUpdateSchema,
  UpdatePromotionRequestBody,
} from "colori-platform-shared";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Edit promotion dialog props
 */
interface EditPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: Promotion | null;
  onPromotionUpdated: (promotion: Promotion) => void;
}

/**
 * Edit promotion dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function EditPromotionDialog({
  open,
  onOpenChange,
  promotion,
  onPromotionUpdated,
}: EditPromotionDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [categorySelectorOpen, setCategorySelectorOpen] = useState(false);

  const form = useForm<PromotionUpdate>({
    resolver: zodResolver(PromotionUpdateSchema),
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
      slug: "",
      searchTerm: "",
      active: true,
    },
  });

  // Load products when dialog opens
  useEffect(() => {
    if (open) {
      const loadProducts = async () => {
        try {
          setLoadingProducts(true);
          const response = await ProductApiService.getProducts({});
          setProducts(response?.data || []);
        } catch (error) {
          console.error("Error loading products:", error);
        } finally {
          setLoadingProducts(false);
        }
      };

      loadProducts();
    }
  }, [open]);

  // Load categories when dialog opens
  useEffect(() => {
    if (open) {
      const loadCategories = async () => {
        try {
          setLoadingCategories(true);
          const response = await CategoryApiService.getCategories({});
          setCategories(response?.data || []);
        } catch (error) {
          console.error("Error loading categories:", error);
        } finally {
          setLoadingCategories(false);
        }
      };

      loadCategories();
    }
  }, [open]);

  // Update form data when promotion changes
  useEffect(() => {
    if (promotion) {
      // Cast to PromotionCreate to access the properties we need for the form
      const promotionData = promotion as unknown as PromotionCreate;
      form.reset({
        name: promotionData.name || "",
        description: promotionData.description || "",
        type: promotionData.type,
        startDate: promotionData.startDate || "",
        endDate: promotionData.endDate || "",
        code: promotionData.code || "",
        discountValue: promotionData.discountValue || undefined,
        discountPercent: promotionData.discountPercent || undefined,
        minimumPurchase: promotionData.minimumPurchase || undefined,
        usageLimit: promotionData.usageLimit || undefined,
        applicableProducts: promotionData.applicableProducts || [],
        applicableCategories: promotionData.applicableCategories || [],
        slug: promotionData.slug || "",
        searchTerm: promotionData.searchTerm || "",
        active: promotionData.active !== undefined ? promotionData.active : true,
      });
    }
  }, [promotion, form]);

  /**
   * Handle form submission
   */
  const onSubmit = async (data: PromotionUpdate) => {
    if (!promotion) return;

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
      if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        if (endDate <= startDate) {
          form.setError("endDate", {
            message: "La fecha de fin debe ser posterior a la fecha de inicio",
          });
          setIsLoading(false);
          return;
        }
      }

      const updateData: UpdatePromotionRequestBody = data;

      const updatedPromotion = await PromotionApiService.updatePromotion(
        { id: promotion.id },
        updateData
      );
      onPromotionUpdated(updatedPromotion);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating promotion:", error);
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

  const selectedType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Promoción</DialogTitle>
          <DialogDescription>
            Modifica la información de la promoción &quot;
            {(promotion as unknown as PromotionCreate).name}
            &quot;.
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                        placeholder="URL amigable para la promoción"
                        {...field}
                        className="font-mono text-sm"
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Se usa para crear URLs amigables. Puedes editarlo
                      manualmente.
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
                    <FormLabel>
                      Términos de Búsqueda Adicionales (Opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: oferta, rebaja, especial"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      Palabras clave adicionales para mejorar la búsqueda de
                      esta promoción.
                    </div>
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
                    // For edit dialog, only enforce that endDate > startDate if startDate is provided
                    const minEndDate = startDateValue
                      ? new Date(startDateValue)
                      : undefined;

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
                        <FormLabel>Compra Mínima (€)</FormLabel>
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
                    <Popover
                      open={productSelectorOpen}
                      onOpenChange={setProductSelectorOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                            disabled={loadingProducts}
                          >
                            {field.value && field.value.length > 0
                              ? `${field.value.length} producto(s) seleccionado(s)`
                              : "Seleccionar productos"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar productos..." />
                          <CommandList>
                            <CommandEmpty>
                              {loadingProducts
                                ? "Cargando productos..."
                                : "No se encontraron productos."}
                            </CommandEmpty>
                            <CommandGroup>
                              {products.map((product) => {
                                const productWithProps = product as Product & {
                                  name: string;
                                  price: number;
                                };
                                const isSelected =
                                  field.value?.includes(product.id) || false;
                                return (
                                  <CommandItem
                                    key={product.id}
                                    onSelect={() => {
                                      const currentProducts = field.value || [];
                                      if (isSelected) {
                                        field.onChange(
                                          currentProducts.filter(
                                            (id) => id !== product.id
                                          )
                                        );
                                      } else {
                                        field.onChange([
                                          ...currentProducts,
                                          product.id,
                                        ]);
                                      }
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        isSelected ? "opacity-100" : "opacity-0"
                                      }`}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium">
                                        {productWithProps.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        €{productWithProps.price.toFixed(2)}
                                      </div>
                                    </div>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Selected Products Display */}
                    {field.value && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((productId) => {
                          const product = products.find(
                            (p) => p.id === productId
                          );
                          const productWithProps = product as Product & {
                            name: string;
                            price: number;
                          };
                          return (
                            <div
                              key={productId}
                              className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                            >
                              <span>{productWithProps?.name || productId}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
                                onClick={() => {
                                  const newProducts =
                                    field.value?.filter(
                                      (id) => id !== productId
                                    ) || [];
                                  field.onChange(newProducts);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                    <Popover
                      open={categorySelectorOpen}
                      onOpenChange={setCategorySelectorOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                            disabled={loadingCategories}
                          >
                            {field.value && field.value.length > 0
                              ? `${field.value.length} categoría(s) seleccionada(s)`
                              : "Seleccionar categorías"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Buscar categorías..." />
                          <CommandList>
                            <CommandEmpty>
                              {loadingCategories
                                ? "Cargando categorías..."
                                : "No se encontraron categorías."}
                            </CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => {
                                const categoryWithProps =
                                  category as Category & {
                                    name: string;
                                    icon: string;
                                    displayOrder: number;
                                  };
                                const isSelected =
                                  field.value?.includes(category.id) || false;
                                return (
                                  <CommandItem
                                    key={category.id}
                                    onSelect={() => {
                                      const currentCategories =
                                        field.value || [];
                                      if (isSelected) {
                                        field.onChange(
                                          currentCategories.filter(
                                            (id) => id !== category.id
                                          )
                                        );
                                      } else {
                                        field.onChange([
                                          ...currentCategories,
                                          category.id,
                                        ]);
                                      }
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        isSelected ? "opacity-100" : "opacity-0"
                                      }`}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium flex items-center gap-2">
                                        <span>{categoryWithProps.icon}</span>
                                        {categoryWithProps.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Orden: {categoryWithProps.displayOrder}
                                      </div>
                                    </div>
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Selected Categories Display */}
                    {field.value && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((categoryId) => {
                          const category = categories.find(
                            (c) => c.id === categoryId
                          );
                          const categoryWithProps = category as Category & {
                            name: string;
                            icon: string;
                          };
                          return (
                            <div
                              key={categoryId}
                              className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                            >
                              <span>
                                {categoryWithProps?.name || categoryId}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
                                onClick={() => {
                                  const newCategories =
                                    field.value?.filter(
                                      (id) => id !== categoryId
                                    ) || [];
                                  field.onChange(newCategories);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 