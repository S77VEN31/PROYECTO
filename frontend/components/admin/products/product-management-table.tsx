/**
 * Product Management Table Component
 * Displays products in a table with management capabilities
 */

"use client";

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
import { GetProductsRequest, Product } from "colori-platform-shared";
import {
  Edit,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  PackageCheck,
  PackageX,
  Euro,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { EditProductDialog } from "./edit-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

/**
 * Product management table props
 */
interface ProductManagementTableProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filters: GetProductsRequest;
  onFiltersChange: (filters: GetProductsRequest) => void;
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
  products,
  isLoading,
  error,
  filters,
  onFiltersChange,
  onProductUpdated,
  onProductDeleted,
  onRefresh,
}: ProductManagementTableProps): React.JSX.Element {
  console.log("ProductManagementTable - products:", products);
  console.log("ProductManagementTable - products.length:", products.length);
  console.log("ProductManagementTable - isLoading:", isLoading);
  console.log("ProductManagementTable - error:", error);

  // State for dialogs and loading
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);

  /**
   * Handle product status toggle
   */
  const handleToggleProductStatus = async (product: Product) => {
    try {
      setUpdatingProduct(product);
      await ProductApiService.updateProduct(
        { id: product.id as string },
        { 
          id: product.id as string,
          product: { ...product, active: !product.active } 
        }
      );
      onProductUpdated({ ...product, active: !product.active });
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
   * Format price for display
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (error) {
    return (
      <AdminCard title="Error">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
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
              >
                <SelectTrigger className="w-full sm:w-48 min-w-[180px]">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="appetizers">Entrantes</SelectItem>
                  <SelectItem value="main-courses">Platos principales</SelectItem>
                  <SelectItem value="desserts">Postres</SelectItem>
                  <SelectItem value="beverages">Bebidas</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={onRefresh}
                variant="outline"
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
                <TableHead className="min-w-[200px]">Producto</TableHead>
                <TableHead className="min-w-[120px]">Precio</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">
                  Estado
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Tiempo Prep.
                </TableHead>
                <TableHead className="min-w-[150px] hidden xl:table-cell">
                  Etiquetas
                </TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Cargando productos...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
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
                          {product.name}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <Euro className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell min-w-[100px]">
                      <Badge
                        variant={product.active ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {product.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell min-w-[120px]">
                      {product.preparationTime ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{product.preparationTime} min</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell min-w-[150px]">
                      {product.tags && product.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 2}
                            </Badge>
                          )}
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
                            className="h-8 w-8 flex-shrink-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleProductStatus(product)}
                          >
                            {product.active ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Activar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
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