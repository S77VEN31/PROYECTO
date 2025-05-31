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
import { Product } from "colori-platform-shared";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Form data type for editing
interface EditProductFormData {
  name: string;
  description: string;
  price: number;
  longDescription?: string;
  tags: string[];
  preparationTime?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  allergens: string[];
  active: boolean;
}

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

  const form = useForm<EditProductFormData>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      longDescription: product.longDescription || "",
      tags: product.tags || [],
      preparationTime: product.preparationTime || undefined,
      calories: product.nutritionalInfo?.calories || undefined,
      protein: product.nutritionalInfo?.protein || undefined,
      carbs: product.nutritionalInfo?.carbs || undefined,
      fat: product.nutritionalInfo?.fat || undefined,
      allergens: product.nutritionalInfo?.allergens || [],
      active: product.active,
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
      calories: product.nutritionalInfo?.calories || undefined,
      protein: product.nutritionalInfo?.protein || undefined,
      carbs: product.nutritionalInfo?.carbs || undefined,
      fat: product.nutritionalInfo?.fat || undefined,
      allergens: product.nutritionalInfo?.allergens || [],
      active: product.active,
    });
  }, [product, form]);

  /**
   * Handle form submission
   */
  const onSubmit = async (data: EditProductFormData) => {
    console.log("Form submitted with data:", data);
    setIsLoading(true);
    try {
      const updatedProduct = await ProductApiService.updateProduct(
        { id: product.id as string },
        {
          id: product.id as string,
          product: {
            name: data.name,
            description: data.description,
            price: data.price,
            longDescription: data.longDescription || undefined,
            tags: data.tags.length > 0 ? data.tags : undefined,
            preparationTime: data.preparationTime || undefined,
            nutritionalInfo:
              data.calories ||
              data.protein ||
              data.carbs ||
              data.fat ||
              data.allergens.length > 0
                ? {
                    calories: data.calories || undefined,
                    protein: data.protein || undefined,
                    carbs: data.carbs || undefined,
                    fat: data.fat || undefined,
                    allergens:
                      data.allergens.length > 0 ? data.allergens : undefined,
                  }
                : undefined,
            active: data.active,
          },
        }
      );

      console.log("Product updated successfully:", updatedProduct);
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
                          {...field}
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
                          {...field}
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
                        value={field.value}
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
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calorías</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="250"
                          {...field}
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
                  name="protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proteínas (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="15.5"
                          {...field}
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
                  name="carbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbohidratos (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="30.2"
                          {...field}
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
                  name="fat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grasas (g)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder="8.7"
                          {...field}
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
                name="allergens"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TagInput
                        label="Alérgenos"
                        placeholder="Escribe un alérgeno y presiona Enter..."
                        value={field.value}
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