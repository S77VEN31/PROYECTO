/**
 * Product Management Table Component
 * Displays products in a table with management capabilities
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getStatusBadgeClass,
  getStatusDisplayText,
  getToggleStatusActionText,
} from "@/lib/utils";
import {
  Category,
  GetProductsRequestParams,
  PaginatedResponse,
  Product,
  UpdateProductRequestBody,
} from "colori-platform-shared";
import {
  Clock,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DeleteProductDialog } from "./delete-product-dialog";
import { EditProductDialog } from "./edit-product-dialog";

/**
 * Product management table props
 */
interface ProductManagementTableProps {
  productsData: PaginatedResponse<Product> | null;
  isLoading: boolean;
  error: string | null;
  filters: GetProductsRequestParams;
  onFiltersChange: (filters: GetProductsRequestParams) => void;
  onProductUpdated: (product: Product) => void;
  onProductDeleted: (productId: string) => void;
  onRefresh: () => void;
}

/**
 * Product management table component
 * @param props - Component props
 * @returns JSX element
 */
export function ProductManagementTable({
  productsData,
  isLoading,
  error,
  filters,
  onFiltersChange,
  onProductUpdated,
  onProductDeleted,
  onRefresh,
}: ProductManagementTableProps): React.JSX.Element {
  console.log("ProductManagementTable - productsData:", productsData);
  console.log("ProductManagementTable - isLoading:", isLoading);
  console.log("ProductManagementTable - error:", error);

  // Extract products and pagination info
  const products = productsData?.data || [];
  const totalItems = productsData?.total || 0;
  const currentPage =
    typeof productsData?.page === "string"
      ? parseInt(productsData.page, 10)
      : productsData?.page || 1;
  const totalPages = productsData?.pages || 1;
  const itemsPerPage =
    typeof productsData?.limit === "string"
      ? parseInt(productsData.limit, 10)
      : productsData?.limit || 10;

  // State for dialogs and loading
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);

  // State for categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  /**
   * Load categories from API
   */
  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await CategoryApiService.getCategories({
        limit: 100, // Get all categories
      });
      if (response && response.data) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  /**
   * Handle product status toggle
   */
  const handleToggleProductStatus = async (product: Product) => {
    try {
      setUpdatingProduct(product);
      const updateData = {
        active: !(product[
          "active" as keyof typeof product
        ] as unknown as boolean),
      };
      const updatedProduct = await ProductApiService.updateProduct(
        { id: product.id as string },
        updateData as UpdateProductRequestBody
      );
      onProductUpdated(updatedProduct);
    } catch (error) {
      console.error("Error toggling product status:", error);
    } finally {
      setUpdatingProduct(null);
    }
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFiltersChange({
      ...filters,
      search: value || undefined,
      page: 1, // Reset to first page when searching
    });
  };

  /**
   * Handle category filter change
   */
  const handleCategoryFilterChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === "all" ? undefined : category,
      page: 1, // Reset to first page when filtering
    });
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number) => {
    onFiltersChange({
      ...filters,
      page,
    });
  };

  /**
   * Format price for display
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (error) {
    return (
      <AdminCard title="Error">
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </AdminCard>
    );
  }

  return (
    <>
      <AdminCard className="overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col gap-4 p-6 border-b">
          {/* Search and Category Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4 z-10" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Select
                value={filters.category || "all"}
                onValueChange={handleCategoryFilterChange}
                disabled={categoriesLoading}
              >
                <SelectTrigger className="w-full sm:w-48 min-w-[180px]">
                  <SelectValue
                    placeholder={
                      categoriesLoading
                        ? "Cargando..."
                        : "Filtrar por categoría"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={onRefresh}
                variant="default"
                size="icon"
                className="flex-shrink-0"
                title="Actualizar lista"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Product</TableHead>
                <TableHead className="min-w-[120px]">Price</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Prep. Time
                </TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      <span>Cargando productos...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <p className="text-lg font-medium mb-2">
                        No se encontraron productos
                      </p>
                      <p className="text-sm">
                        {filters.search || filters.category
                          ? "Intenta ajustar los filtros de búsqueda"
                          : "Comienza creando tu primer producto"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-foreground">
                          {product["name" as keyof typeof product] as string}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {
                            product[
                              "description" as keyof typeof product
                            ] as string
                          }
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <span className="font-medium">
                        {formatPrice(
                          product[
                            "price" as keyof typeof product
                          ] as unknown as number
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell min-w-[100px]">
                      <Badge
                        variant={
                          (product[
                            "active" as keyof typeof product
                          ] as unknown as boolean)
                            ? "default"
                            : "secondary"
                        }
                        className={getStatusBadgeClass(
                          product[
                            "active" as keyof typeof product
                          ] as unknown as boolean
                        )}
                      >
                        {getStatusDisplayText(
                          product[
                            "active" as keyof typeof product
                          ] as unknown as boolean
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell min-w-[120px]">
                      {(product[
                        "preparationTime" as keyof typeof product
                      ] as unknown as number) ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-primary" />
                          <span>
                            {
                              product[
                                "preparationTime" as keyof typeof product
                              ] as unknown as number
                            }{" "}
                            min
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right min-w-[80px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0 hover:text-primary"
                            disabled={updatingProduct?.id === product.id}
                          >
                            <MoreHorizontal className="h-4 w-4 text-primary" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                            className="text-primary"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleProductStatus(product)}
                            disabled={updatingProduct?.id === product.id}
                            className="text-primary"
                          >
                            {(product[
                              "active" as keyof typeof product
                            ] as unknown as boolean) ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                {getToggleStatusActionText(
                                  product[
                                    "active" as keyof typeof product
                                  ] as unknown as boolean,
                                  "product"
                                )}
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                {getToggleStatusActionText(
                                  product[
                                    "active" as keyof typeof product
                                  ] as unknown as boolean,
                                  "product"
                                )}
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="border-t p-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </AdminCard>

      {/* Edit Product Dialog */}
      {selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setSelectedProduct(null);
          }}
          onProductUpdated={onProductUpdated}
        />
      )}

      {/* Delete Product Dialog */}
      {selectedProduct && (
        <DeleteProductDialog
          product={selectedProduct}
          open={isDeleteDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteDialogOpen(open);
            if (!open) setSelectedProduct(null);
          }}
          onProductDeleted={onProductDeleted}
        />
      )}
    </>
  );
} 