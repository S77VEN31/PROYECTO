/**
 * Edit Category Dialog Component
 * Modal dialog for editing existing categories
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { Category, CategoryVariant, Product } from "colori-platform-shared";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Simple form data type
interface EditCategoryFormData {
  name: string;
  description: string;
  icon: string;
  variant: CategoryVariant;
  displayOrder: number;
  active: boolean;
  products: string[];
}

/**
 * Edit category dialog props
 */
interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onCategoryUpdated: (category: Category) => void;
}

/**
 * Edit category dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  onCategoryUpdated,
}: EditCategoryDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);

  const form = useForm<EditCategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      variant: CategoryVariant.DEFAULT,
      displayOrder: 0,
      active: true,
      products: [],
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

  // Update form when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: (category["name" as keyof typeof category] as string) || "",
        description:
          (category["description" as keyof typeof category] as string) || "",
        icon: (category["icon" as keyof typeof category] as string) || "",
        variant:
          (category["variant" as keyof typeof category] as CategoryVariant) ||
          CategoryVariant.DEFAULT,
        displayOrder:
          (category[
            "displayOrder" as keyof typeof category
          ] as unknown as number) || 0,
        active:
          (category[
            "active" as keyof typeof category
          ] as unknown as boolean) !== undefined
            ? (category[
                "active" as keyof typeof category
              ] as unknown as boolean)
            : true,
        products: (category["products" as keyof typeof category] as string[]) || [],
      });
    }
  }, [category, form]);

  /**
   * Handle form submission
   */
  const onSubmit = async (data: EditCategoryFormData) => {
    if (!category) return;

    setIsLoading(true);
    try {
      const categoryData = {
        name: data.name,
        description: data.description,
        icon: data.icon,
        variant: data.variant,
        displayOrder: data.displayOrder,
        active: data.active,
        products: data.products,
      };

      const updatedCategory = await CategoryApiService.updateCategory(
        { id: category.id },
        categoryData
      );
      onCategoryUpdated(updatedCategory);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating category:", error);
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

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Categoría</DialogTitle>
          <DialogDescription>
            Modifica la información de la categoría &quot;
            {(category as unknown as { name: string }).name}
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
                    <FormLabel>Nombre de la Categoría</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la categoría" {...field} />
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
                        placeholder="Descripción de la categoría"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icono</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del icono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="variant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variante</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una variante" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CategoryVariant).map((variant) => (
                          <SelectItem key={variant} value={variant}>
                            {variant}
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
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden de Visualización</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? parseInt(e.target.value) : 0
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
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activa</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        La categoría estará visible en el menú
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

            {/* Productos Aplicables */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Productos</h3>
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productos en esta Categoría</FormLabel>
                    <div className="text-sm text-muted-foreground mb-3">
                      Selecciona los productos que pertenecen a esta categoría.
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
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
