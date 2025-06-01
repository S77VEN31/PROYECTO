/**
 * Create Promotion Dialog Component
 * Modal dialog for creating new promotions
 */

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
  CreatePromotionRequestBody,
  Product,
  Promotion,
  PromotionCreate,
  PromotionCreateSchema,
  PromotionType,
} from "colori-platform-shared";
import { Check, ChevronsUpDown, X } from "lucide-react";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categorySelectorOpen, setCategorySelectorOpen] = useState(false);

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
                      <Popover
                        open={productSelectorOpen}
                        onOpenChange={setProductSelectorOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={productSelectorOpen}
                            className="w-full justify-between h-auto min-h-[40px] p-2"
                          >
                            <div className="flex flex-wrap gap-1 flex-1">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((productId) => {
                                  const product = products.find(
                                    (p) => p.id === productId
                                  );
                                  const productWithProps =
                                    product as Product & {
                                      name: string;
                                      price: number;
                                    };
                                  return productWithProps ? (
                                    <div
                                      key={productId}
                                      className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                    >
                                      {productWithProps.name}
                                      <X
                                        className="h-3 w-3 cursor-pointer hover:opacity-70"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          field.onChange(
                                            field.value?.filter(
                                              (id) => id !== productId
                                            ) || []
                                          );
                                        }}
                                      />
                                    </div>
                                  ) : null;
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Seleccionar productos...
                                </span>
                              )}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Buscar productos..." />
                            <CommandEmpty>
                              {loadingProducts
                                ? "Cargando productos..."
                                : "No se encontraron productos."}
                            </CommandEmpty>
                            <CommandList>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {products.map((product) => {
                                  const productWithProps =
                                    product as Product & {
                                      name: string;
                                      price: number;
                                    };
                                  const isSelected =
                                    field.value?.includes(product.id) || false;
                                  return (
                                    <CommandItem
                                      key={product.id}
                                      value={`${productWithProps.name} ${productWithProps.price}`}
                                      onSelect={() => {
                                        const currentProducts =
                                          field.value || [];
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
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0"
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
                      <Popover
                        open={categorySelectorOpen}
                        onOpenChange={setCategorySelectorOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={categorySelectorOpen}
                            className="w-full justify-between h-auto min-h-[40px] p-2"
                          >
                            <div className="flex flex-wrap gap-1 flex-1">
                              {field.value && field.value.length > 0 ? (
                                field.value.map((categoryId) => {
                                  const category = categories.find(
                                    (c) => c.id === categoryId
                                  );
                                  const categoryWithProps =
                                    category as Category & {
                                      name: string;
                                      icon: string;
                                    };
                                  return categoryWithProps ? (
                                    <div
                                      key={categoryId}
                                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                    >
                                      {categoryWithProps.name}
                                      <X
                                        className="h-3 w-3 cursor-pointer hover:opacity-70"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          field.onChange(
                                            field.value?.filter(
                                              (id) => id !== categoryId
                                            ) || []
                                          );
                                        }}
                                      />
                                    </div>
                                  ) : null;
                                })
                              ) : (
                                <span className="text-muted-foreground">
                                  Seleccionar categorías...
                                </span>
                              )}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Buscar categorías..." />
                            <CommandEmpty>
                              {loadingCategories
                                ? "Cargando categorías..."
                                : "No se encontraron categorías."}
                            </CommandEmpty>
                            <CommandList>
                              <CommandGroup className="max-h-64 overflow-auto">
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
                                      value={`${categoryWithProps.name} ${categoryWithProps.icon}`}
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
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                      <div className="flex-1">
                                        <div className="font-medium flex items-center gap-2">
                                          <span>{categoryWithProps.icon}</span>
                                          {categoryWithProps.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          Orden:{" "}
                                          {categoryWithProps.displayOrder}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
