/**
 * Create Category Dialog Component
 * Modal dialog for creating new categories
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
interface CreateCategoryFormData {
  name: string;
  description: string;
  icon: string;
  variant: CategoryVariant;
  displayOrder: number;
  active: boolean;
  products: string[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);

  const form = useForm<CreateCategoryFormData>({
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
        products: data.products,
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
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize your products.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
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
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Category description"
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
                required: "Icon is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Icon name (e.g., coffee, utensils)"
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
                required: "Variant is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Variant</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a color variant" />
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
                required: "Display order is required",
                min: {
                  value: 0,
                  message: "Display order must be 0 or greater",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
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
                    <FormLabel className="text-base">Active</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Enable this category to make it visible to users
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
                  <FormLabel>Associated Products</FormLabel>
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
                            ? `${field.value.length} product(s) selected`
                            : "Select products"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search products..." />
                        <CommandList>
                          <CommandEmpty>No products found.</CommandEmpty>
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
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
