/**
 * Edit Category Dialog Component
 * Modal dialog for editing existing categories
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import {
  PaginatedSelector,
  SelectorItem,
} from "@/components/common/paginated-selector";
import { TagInput } from "@/components/common/tag-input";
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
import { getCategoryVariantDisplayName } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  CategoryUpdate,
  CategoryUpdateSchema,
  CategoryVariant,
  Product,
  UpdateCategoryRequestBody,
} from "colori-platform-shared";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Edit category dialog props
 */
interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onCategoryUpdated: (category: Category) => void;
}

// Extend Product to match SelectorItem interface
interface ProductSelectorItem extends Product, SelectorItem {}

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

  const form = useForm<CategoryUpdate>({
    resolver: zodResolver(CategoryUpdateSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      variant: CategoryVariant.DEFAULT,
      displayOrder: 0,
      active: true,
      products: [],
      slug: "",
      searchTerm: "",
    },
  });

  // Update form when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "",
        variant: category.variant || CategoryVariant.DEFAULT,
        displayOrder: category.displayOrder || 0,
        active: category.active !== undefined ? category.active : true,
        products: category.products || [],
        slug: category.slug || "",
        searchTerm: category.searchTerm || "",
      });
    }
  }, [category, form]);

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
   * Handle form submission
   */
  const onSubmit = async (data: CategoryUpdate) => {
    if (!category) return;

    setIsLoading(true);
    try {
      const updateData: UpdateCategoryRequestBody = data;

      const updatedCategory = await CategoryApiService.updateCategory(
        { id: category.id },
        updateData
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
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Básica</h3>

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
                          {getCategoryVariantDisplayName(
                            CategoryVariant.DEFAULT
                          )}
                        </SelectItem>
                        <SelectItem value={CategoryVariant.COFFEE}>
                          {getCategoryVariantDisplayName(
                            CategoryVariant.COFFEE
                          )}
                        </SelectItem>
                        <SelectItem value={CategoryVariant.ORANGE}>
                          {getCategoryVariantDisplayName(
                            CategoryVariant.ORANGE
                          )}
                        </SelectItem>
                        <SelectItem value={CategoryVariant.PINK}>
                          {getCategoryVariantDisplayName(CategoryVariant.PINK)}
                        </SelectItem>
                        <SelectItem value={CategoryVariant.SKYBLUE}>
                          {getCategoryVariantDisplayName(
                            CategoryVariant.SKYBLUE
                          )}
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
                        placeholder="URL amigable para la categoría"
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
                        description="Ej: comida, bebida, postre, etc."
                        maxTags={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Associations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Productos Asociados</h3>

              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Productos</FormLabel>
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
            </div>

            {/* Status */}
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
