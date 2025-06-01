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
  getCategoryVariantBadgeClass,
  getCategoryVariantDisplayName,
  getStatusBadgeClass,
  getStatusDisplayText,
  getToggleStatusActionText,
} from "@/lib/utils";
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

  if (error) {
    return (
      <AdminCard title="Error">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4 z-10" />
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

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary" />
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
                  const isActive = category[
                    "active" as keyof typeof category
                  ] as unknown as boolean;
                  const variant = category[
                    "variant" as keyof typeof category
                  ] as CategoryVariant;

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
                          className={getCategoryVariantBadgeClass(variant)}
                        >
                          {getCategoryVariantDisplayName(variant)}
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
                          <Package className="h-4 w-4 text-primary" />
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
                            variant={isActive ? "default" : "secondary"}
                            className={getStatusBadgeClass(isActive)}
                          >
                            {isActive ? (
                              <>
                                <FolderCheck className="h-3 w-3 mr-1" />
                                {getStatusDisplayText(true)}
                              </>
                            ) : (
                              <>
                                <FolderX className="h-3 w-3 mr-1" />
                                {getStatusDisplayText(false)}
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
                              className="text-primary"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleCategoryStatus(category)
                              }
                              disabled={updatingCategory?.id === category.id}
                              className="text-primary"
                            >
                              {isActive ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  {getToggleStatusActionText(true)}
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {getToggleStatusActionText(false)}
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
                              Delete
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
