/**
 * Category Management Table Component
 * Displays categories in a table with management capabilities
 */

"use client";

import { CategoryApiService } from "@/api/entities/category.api";
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
import {
  Category,
  CategoryVariant,
  GetCategoriesRequestParams,
  UpdateCategoryRequestBody,
} from "colori-platform-shared";
import {
  Edit,
  Eye,
  EyeOff,
  FolderCheck,
  FolderX,
  MoreHorizontal,
  Package,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";

/**
 * Category management table props
 */
interface CategoryManagementTableProps {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  filters: GetCategoriesRequestParams;
  onFiltersChange: (filters: GetCategoriesRequestParams) => void;
  onCategoryUpdated: (category: Category) => void;
  onCategoryDeleted: (categoryId: string) => void;
  onRefresh: () => void;
}

/**
 * Category management table component
 * @param props - Component props
 * @returns JSX element
 */
export function CategoryManagementTable({
  categories,
  isLoading,
  error,
  filters,
  onFiltersChange,
  onCategoryUpdated,
  onCategoryDeleted,
  onRefresh,
}: CategoryManagementTableProps): React.JSX.Element {
  console.log("CategoryManagementTable - categories:", categories);
  console.log(
    "CategoryManagementTable - categories.length:",
    categories.length
  );
  console.log("CategoryManagementTable - isLoading:", isLoading);
  console.log("CategoryManagementTable - error:", error);

  // State for dialogs and loading
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState<Category | null>(
    null
  );

  /**
   * Handle category status toggle
   */
  const handleToggleCategoryStatus = async (category: Category) => {
    try {
      setUpdatingCategory(category);
      const updateData = {
        active: !(category[
          "active" as keyof typeof category
        ] as unknown as boolean),
      };
      const updatedCategory = await CategoryApiService.updateCategory(
        { id: category.id },
        updateData as UpdateCategoryRequestBody
      );
      onCategoryUpdated(updatedCategory);
    } catch (error) {
      console.error("Error toggling category status:", error);
    } finally {
      setUpdatingCategory(null);
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
   * Handle variant filter change
   */
  const handleVariantFilterChange = (variant: string) => {
    onFiltersChange({
      ...filters,
      variant: variant === "all" ? undefined : variant,
      page: 1, // Reset to first page when filtering
    });
  };

  /**
   * Get variant display name
   */
  const getVariantDisplayName = (variant: CategoryVariant) => {
    switch (variant) {
      case CategoryVariant.COFFEE:
        return "Café";
      case CategoryVariant.ORANGE:
        return "Naranja";
      case CategoryVariant.PINK:
        return "Rosa";
      case CategoryVariant.SKYBLUE:
        return "Azul Cielo";
      case CategoryVariant.RED:
        return "Rojo";
      case CategoryVariant.DEFAULT:
      default:
        return "Por Defecto";
    }
  };

  /**
   * Get variant color class
   */
  const getVariantColorClass = (variant: CategoryVariant) => {
    switch (variant) {
      case CategoryVariant.COFFEE:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case CategoryVariant.ORANGE:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case CategoryVariant.PINK:
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case CategoryVariant.SKYBLUE:
        return "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200";
      case CategoryVariant.RED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case CategoryVariant.DEFAULT:
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
          {/* Search and Variant Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                placeholder="Buscar categorías..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Select
                value={filters.variant || "all"}
                onValueChange={handleVariantFilterChange}
              >
                <SelectTrigger className="w-full sm:w-48 min-w-[180px]">
                  <SelectValue placeholder="Filtrar por variante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las variantes</SelectItem>
                  <SelectItem value={CategoryVariant.DEFAULT}>
                    Por Defecto
                  </SelectItem>
                  <SelectItem value={CategoryVariant.COFFEE}>Café</SelectItem>
                  <SelectItem value={CategoryVariant.ORANGE}>
                    Naranja
                  </SelectItem>
                  <SelectItem value={CategoryVariant.PINK}>Rosa</SelectItem>
                  <SelectItem value={CategoryVariant.SKYBLUE}>
                    Azul Cielo
                  </SelectItem>
                  <SelectItem value={CategoryVariant.RED}>Rojo</SelectItem>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Variante</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Cargando categorías...
                    </div>
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No se encontraron categorías
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {
                              category[
                                "name" as keyof typeof category
                              ] as string
                            }
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {
                              category[
                                "description" as keyof typeof category
                              ] as string
                            }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getVariantColorClass(
                            category[
                              "variant" as keyof typeof category
                            ] as CategoryVariant
                          )}
                        >
                          {getVariantDisplayName(
                            category[
                              "variant" as keyof typeof category
                            ] as CategoryVariant
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {
                            category[
                              "displayOrder" as keyof typeof category
                            ] as unknown as number
                          }
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {(
                              category[
                                "products" as keyof typeof category
                              ] as unknown as string[]
                            )?.length || 0}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              (category[
                                "active" as keyof typeof category
                              ] as unknown as boolean)
                                ? "default"
                                : "secondary"
                            }
                            className={
                              (category[
                                "active" as keyof typeof category
                              ] as unknown as boolean)
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }
                          >
                            {(category[
                              "active" as keyof typeof category
                            ] as unknown as boolean) ? (
                              <>
                                <FolderCheck className="h-3 w-3 mr-1" />
                                Activa
                              </>
                            ) : (
                              <>
                                <FolderX className="h-3 w-3 mr-1" />
                                Inactiva
                              </>
                            )}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleCategoryStatus(category)
                              }
                              disabled={updatingCategory?.id === category.id}
                            >
                              {(category[
                                "active" as keyof typeof category
                              ] as unknown as boolean) ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </AdminCard>

      {/* Edit Category Dialog */}
      <EditCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={selectedCategory}
        onCategoryUpdated={onCategoryUpdated}
      />

      {/* Delete Category Dialog */}
      <DeleteCategoryDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        category={selectedCategory}
        onCategoryDeleted={onCategoryDeleted}
      />
    </>
  );
}
