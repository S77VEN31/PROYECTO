/**
 * Create Product Dialog Component
 * Modal dialog for creating new products
 */

"use client";

import { ProductApiService } from "@/api/entities/product.api";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Product,
  ProductCreate,
  ProductCreateSchema,
} from "colori-platform-shared";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Create product dialog props
 */
interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: (product: Product) => void;
}

/**
 * Create product dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function CreateProductDialog({
  open,
  onOpenChange,
  onProductCreated,
}: CreateProductDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductCreate>({
    resolver: zodResolver(ProductCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      longDescription: "",
      tags: [],
      preparationTime: undefined,
      nutritionalInfo: {
        calories: undefined,
        protein: undefined,
        carbs: undefined,
        fat: undefined,
        allergens: [],
      },
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
   * Handle form submission
   */
  const onSubmit = async (data: ProductCreate) => {
    setIsLoading(true);
    try {
      const newProduct = await ProductApiService.createProduct(data);
      onProductCreated(newProduct);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating product:", error);
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Producto</DialogTitle>
          <DialogDescription>
            Completa la información para crear un nuevo producto en el menú.
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
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del producto" {...field} />
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
                        placeholder="Descripción breve del producto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Detallada</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción detallada del producto (opcional)"
                        {...field}
                      />
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
                        onChange={(tags) => field.onChange(tags.join(", "))}
                        description="Ej: vegetariano, sin gluten, picante, etc."
                        maxTags={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio (₡)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preparationTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiempo de Preparación (min)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="15"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              parseInt(e.target.value) || undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TagInput
                        label="Etiquetas"
                        placeholder="Escribe una etiqueta y presiona Enter..."
                        value={field.value || []}
                        onChange={field.onChange}
                        description="Ej: vegetariano, sin gluten, picante, etc."
                        maxTags={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Nutritional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Información Nutricional (Opcional)
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nutritionalInfo.calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calorías</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="250"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              parseInt(e.target.value) || undefined
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
                  name="nutritionalInfo.protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proteínas (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="15.5"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              parseFloat(e.target.value) || undefined
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
                  name="nutritionalInfo.carbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbohidratos (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="30.2"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              parseFloat(e.target.value) || undefined
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
                  name="nutritionalInfo.fat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grasas (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="8.7"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              parseFloat(e.target.value) || undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="nutritionalInfo.allergens"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TagInput
                        label="Alérgenos"
                        placeholder="Escribe un alérgeno y presiona Enter..."
                        value={field.value || []}
                        onChange={field.onChange}
                        description="Ej: gluten, lácteos, frutos secos, etc."
                        maxTags={15}
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
                    <FormLabel className="text-base">Producto Activo</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Determina si el producto está disponible en el menú
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
                {isLoading ? "Creando..." : "Crear Producto"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 