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
import { getCategoryVariantDisplayName } from "@/lib/utils";
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
        products:
          (category["products" as keyof typeof category] as string[]) || [],
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
            Modificar la información para la categoría &quot;
            {(category as unknown as { name: string }).name}
            &quot;.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Nombre es requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la categoría" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: "Descripción es requerida",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción de la categoría"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon Field */}
            <FormField
              control={form.control}
              name="icon"
              rules={{
                required: "Icono es requerido",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del icono (e.g., coffee, utensils)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Variant Field */}
            <FormField
              control={form.control}
              name="variant"
              rules={{
                required: "Variante es requerido",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variante de Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar una variante de color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CategoryVariant.DEFAULT}>
                        {getCategoryVariantDisplayName(CategoryVariant.DEFAULT)}
                      </SelectItem>
                      <SelectItem value={CategoryVariant.COFFEE}>
                        {getCategoryVariantDisplayName(CategoryVariant.COFFEE)}
                      </SelectItem>
                      <SelectItem value={CategoryVariant.ORANGE}>
                        {getCategoryVariantDisplayName(CategoryVariant.ORANGE)}
                      </SelectItem>
                      <SelectItem value={CategoryVariant.PINK}>
                        {getCategoryVariantDisplayName(CategoryVariant.PINK)}
                      </SelectItem>
                      <SelectItem value={CategoryVariant.SKYBLUE}>
                        {getCategoryVariantDisplayName(CategoryVariant.SKYBLUE)}
                      </SelectItem>
                      <SelectItem value={CategoryVariant.RED}>
                        {getCategoryVariantDisplayName(CategoryVariant.RED)}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display Order Field */}
            <FormField
              control={form.control}
              name="displayOrder"
              rules={{
                required: "Orden de visualización es requerido",
                min: {
                  value: 0,
                  message: "El orden de visualización debe ser 0 o mayor",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orden de Visualización</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Field */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Activo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Habilitar esta categoría para hacerla visible a los
                      usuarios
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

            {/* Products Field */}
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Productos Asociados</FormLabel>
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
                          {field.value.length > 0
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
                            No se encontraron productos.
                          </CommandEmpty>
                          <CommandGroup>
                            {products.map((product) => (
                              <CommandItem
                                key={product.id}
                                onSelect={() => {
                                  const currentProducts = field.value || [];
                                  const isSelected = currentProducts.includes(
                                    product.id
                                  );
                                  const newProducts = isSelected
                                    ? currentProducts.filter(
                                        (id) => id !== product.id
                                      )
                                    : [...currentProducts, product.id];
                                  field.onChange(newProducts);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    field.value?.includes(product.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {product.name}
                              </CommandItem>
                            ))}
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
                        return (
                          <div
                            key={productId}
                            className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            <span>{product?.name || productId}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground hover:text-primary-foreground"
                              onClick={() => {
                                const newProducts = field.value.filter(
                                  (id) => id !== productId
                                );
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
