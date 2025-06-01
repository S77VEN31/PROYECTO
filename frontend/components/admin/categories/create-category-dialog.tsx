/**
 * Create Category Dialog Component
 * Modal dialog for creating new categories
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
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
import { Category, CategoryVariant } from "colori-platform-shared";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Simple form data type
interface CreateCategoryFormData {
  name: string;
  description: string;
  icon: string;
  variant: CategoryVariant;
  displayOrder: number;
  active: boolean;
}

/**
 * Create category dialog props
 */
interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: (category: Category) => void;
}

/**
 * Create category dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCategoryCreated,
}: CreateCategoryDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateCategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
      variant: CategoryVariant.DEFAULT,
      displayOrder: 0,
      active: true,
    },
  });

  /**
   * Handle form submission
   */
  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsLoading(true);
    try {
      const categoryData = {
        name: data.name,
        description: data.description,
        icon: data.icon,
        variant: data.variant,
        displayOrder: data.displayOrder,
        active: data.active,
      };

      const newCategory = await CategoryApiService.createCategory(categoryData);
      onCategoryCreated(newCategory);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating category:", error);
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Categoría</DialogTitle>
          <DialogDescription>
            Completa la información para crear una nueva categoría en el menú.
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
                      <Input
                        placeholder="Nombre del icono (ej: coffee, utensils)"
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variante de Color</FormLabel>
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
                        <SelectItem value={CategoryVariant.DEFAULT}>
                          Por Defecto
                        </SelectItem>
                        <SelectItem value={CategoryVariant.COFFEE}>
                          Café
                        </SelectItem>
                        <SelectItem value={CategoryVariant.ORANGE}>
                          Naranja
                        </SelectItem>
                        <SelectItem value={CategoryVariant.PINK}>
                          Rosa
                        </SelectItem>
                        <SelectItem value={CategoryVariant.SKYBLUE}>
                          Azul Cielo
                        </SelectItem>
                        <SelectItem value={CategoryVariant.RED}>
                          Rojo
                        </SelectItem>
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
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                      <FormLabel className="text-base">
                        Categoría Activa
                      </FormLabel>
                      <div className="text-sm text-muted-foreground">
                        La categoría estará disponible en el menú
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
                {isLoading ? "Creando..." : "Crear Categoría"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
