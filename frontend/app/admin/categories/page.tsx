"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import {
  CategoryManagementTable,
  CategoryStats,
  CreateCategoryDialog,
} from "@/components/admin/categories";
import { Button } from "@/components/ui/button";
import {
  Category,
  GetCategoriesRequestParams,
  PaginatedResponse,
} from "colori-platform-shared";
import { FolderOpen, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoriesManagementPage() {
  const [categoriesData, setCategoriesData] =
    useState<PaginatedResponse<Category> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState<GetCategoriesRequestParams>({
    page: 1,
    limit: 10,
  });

  /**
   * Load categories from API
   */
  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await CategoryApiService.getCategories({
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
        variant: filters.variant || undefined,
      });

      console.log("Categories response:", response);
      if (response) {
        setCategoriesData(response);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar categorías"
      );
      console.error("Error loading categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle category creation
   */
  const handleCategoryCreated = () => {
    // Refresh the data to get updated pagination
    loadCategories();
    setIsCreateDialogOpen(false);
  };

  /**
   * Handle category update
   */
  const handleCategoryUpdated = (updatedCategory: Category) => {
    if (categoriesData) {
      const updatedData = {
        ...categoriesData,
        data: categoriesData.data.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        ),
      };
      setCategoriesData(updatedData);
    }
  };

  /**
   * Handle category deletion
   */
  const handleCategoryDeleted = () => {
    // Refresh the data to get updated pagination
    loadCategories();
  };

  /**
   * Handle filter changes
   */
  const handleFiltersChange = (newFilters: GetCategoriesRequestParams) => {
    setFilters(newFilters);
  };

  // Load categories on component mount and when filters change
  useEffect(() => {
    loadCategories();
  }, [filters]);

  // Calculate category statistics from current data
  const categories = categoriesData?.data || [];
  const categoryStats = {
    total: categoriesData?.total || 0,
    active: categories.filter(
      (category) => "active" in category && category.active === true
    ).length,
    inactive: categories.filter(
      (category) => "active" in category && category.active === false
    ).length,
    withProducts: categories.filter(
      (category) =>
        "products" in category &&
        Array.isArray(category.products) &&
        category.products.length > 0
    ).length,
    averageProducts:
      categories.length > 0
        ? categories.reduce(
            (sum, category) =>
              sum +
              ("products" in category && Array.isArray(category.products)
                ? category.products.length
                : 0),
            0
          ) / categories.length
        : 0,
  };

  return (
    <AdminPageLayout
      title="Gestión de Categorías"
      subtitle="Administra las categorías del menú"
    >
      {/* Category Statistics */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Estadísticas de Categorías"
          description="Resumen del estado actual de categorías"
          icon={<FolderOpen className="h-6 w-6" />}
        />
        <CategoryStats stats={categoryStats} />
      </section>

      {/* Category Management Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <AdminSectionHeader
              title="Lista de Categorías"
              description="Gestiona todas las categorías del menú"
              icon={<FolderOpen className="h-6 w-6" />}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Categoría</span>
            </Button>
          </div>
        </div>

        <CategoryManagementTable
          categoriesData={categoriesData}
          isLoading={isLoading}
          error={error}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onCategoryUpdated={handleCategoryUpdated}
          onCategoryDeleted={handleCategoryDeleted}
          onRefresh={loadCategories}
        />
      </section>

      {/* Create Category Dialog */}
      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCategoryCreated={handleCategoryCreated}
      />
    </AdminPageLayout>
  );
}
