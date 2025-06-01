"use client";

import { ProductApiService } from "@/api/entities/product.api";
import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import {
  CreateProductDialog,
  ProductManagementTable,
  ProductStats,
} from "@/components/admin/products";
import { Button } from "@/components/ui/button";
import { GetProductsRequestParams, Product } from "colori-platform-shared";
import { Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductsManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState<GetProductsRequestParams>({
    page: 1,
    limit: 10,
  });

  /**
   * Load products from API
   */
  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ProductApiService.getProducts({
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
        category: filters.category || undefined,
        tag: filters.tag || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      });

      console.log("Products response:", response);
      if (response) {
        console.log("Products data:", response.data);
        setProducts((response.data || []) as Product[]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar productos"
      );
      console.error("Error loading products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle product creation
   */
  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setIsCreateDialogOpen(false);
  };

  /**
   * Handle product update
   */
  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  /**
   * Handle product deletion
   */
  const handleProductDeleted = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  /**
   * Handle filter changes
   */
  const handleFiltersChange = (newFilters: GetProductsRequestParams) => {
    setFilters(newFilters);
  };

  // Load products on component mount and when filters change
  useEffect(() => {
    loadProducts();
  }, [filters]);

  // Calculate product statistics
  const productStats = {
    total: products.length,
    active: products.filter(
      (product) => "active" in product && product.active === true
    ).length,
    inactive: products.filter(
      (product) => "active" in product && product.active === false
    ).length,
    averagePrice:
      products.length > 0
        ? products.reduce(
            (sum, product) =>
              sum +
              ("price" in product && typeof product.price === "number"
                ? product.price
                : 0),
            0
          ) / products.length
        : 0,
    withNutrition: products.filter(
      (product) => "nutritionalInfo" in product && product.nutritionalInfo
    ).length,
  };

  return (
    <AdminPageLayout
      title="Gestión de Productos"
      subtitle="Administra los productos del menú"
    >
      {/* Product Statistics */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Estadísticas de Productos"
          description="Resumen del estado actual de productos"
          icon={<Package className="h-6 w-6" />}
        />
        <ProductStats stats={productStats} />
      </section>

      {/* Product Management Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <AdminSectionHeader
              title="Lista de Productos"
              description="Gestiona todos los productos del menú"
              icon={<Package className="h-6 w-6" />}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Producto</span>
            </Button>
          </div>
        </div>

        <ProductManagementTable
          products={products}
          isLoading={isLoading}
          error={error}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onProductUpdated={handleProductUpdated}
          onProductDeleted={handleProductDeleted}
          onRefresh={loadProducts}
        />
      </section>

      {/* Create Product Dialog */}
      <CreateProductDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProductCreated={handleProductCreated}
      />
    </AdminPageLayout>
  );
} 