/**
 * Edit Product Dialog Component
 * Modal dialog for editing existing products
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
  ProductUpdate,
  ProductUpdateSchema,
  UpdateProductRequestBody,
} from "colori-platform-shared";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/**
 * Edit product dialog props
 */
interface EditProductDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdated: (product: Product) => void;
}

/**
 * Edit product dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function EditProductDialog({
  product,
  open,
  onOpenChange,
  onProductUpdated,
}: EditProductDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductUpdate>({
    resolver: zodResolver(ProductUpdateSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      longDescription: product.longDescription || "",
      tags: product.tags || [],
      preparationTime: product.preparationTime || undefined,
      nutritionalInfo: {
        calories: product.nutritionalInfo?.calories || undefined,
        protein: product.nutritionalInfo?.protein || undefined,
        carbs: product.nutritionalInfo?.carbs || undefined,
        fat: product.nutritionalInfo?.fat || undefined,
        allergens: product.nutritionalInfo?.allergens || [],
      },
      active: product.active,
      slug: product.slug || "",
      searchTerm: product.searchTerm || "",
    },
  });

  // Reset form when product changes
  useEffect(() => {
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      longDescription: product.longDescription || "",
      tags: product.tags || [],
      preparationTime: product.preparationTime || undefined,
      nutritionalInfo: {
        calories: product.nutritionalInfo?.calories || undefined,
        protein: product.nutritionalInfo?.protein || undefined,
        carbs: product.nutritionalInfo?.carbs || undefined,
        fat: product.nutritionalInfo?.fat || undefined,
        allergens: product.nutritionalInfo?.allergens || [],
      },
      active: product.active,
      slug: product.slug || "",
      searchTerm: product.searchTerm || "",
    });
  }, [product, form]);

  /**
   * Handle form submission
   */
  const onSubmit = async (data: ProductUpdate) => {
    console.log("=== FRONTEND UPDATE DEBUG ===");
    console.log("Form data:", JSON.stringify(data, null, 2));
    console.log("Product object:", JSON.stringify(product, null, 2));
    console.log("Product ID:", product.id);
    console.log("Product ID type:", typeof product.id);

    setIsLoading(true);
    try {
      const requestParams = { id: product.id as string };

      // Validate the update data using the schema
      const validatedData = ProductUpdateSchema.parse(data);

      console.log("Request params:", JSON.stringify(requestParams, null, 2));
      console.log("Update data:", JSON.stringify(validatedData, null, 2));
      console.log("Update data keys:", Object.keys(validatedData));
      console.log("Update data has id?", "id" in validatedData);
      console.log("Update data has product?", "product" in validatedData);

      const updatedProduct = await ProductApiService.updateProduct(
        requestParams,
        validatedData as UpdateProductRequestBody
      );

      console.log(
        "Product updated successfully:",
        JSON.stringify(updatedProduct, null, 2)
      );
      console.log("=== END FRONTEND UPDATE DEBUG ===");

      onProductUpdated(updatedProduct);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating product:", error);
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
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Modifica la información del producto {product.name}.
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
                        placeholder="URL amigable para el producto"
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
                      <FormLabel>Precio (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
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
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 