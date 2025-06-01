"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import { Button } from "@/components/ui/button";
import {
  GetPromotionsRequestParams,
  PaginatedResponse,
  Promotion,
} from "colori-platform-shared";
import { Percent, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CreatePromotionDialog,
  PromotionManagementTable,
  PromotionStats,
} from "../../../components/admin/promotions";

export default function PromotionsManagementPage() {
  const [promotionsData, setPromotionsData] =
    useState<PaginatedResponse<Promotion> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState<GetPromotionsRequestParams>({
    page: 1,
    limit: 10,
  });

  /**
   * Load promotions from API
   */
  const loadPromotions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await PromotionApiService.getPromotions({
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
        type: filters.type || undefined,
        active: filters.active,
      });

      console.log("Promotions response:", response);
      if (response) {
        setPromotionsData(response);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar promociones"
      );
      console.error("Error loading promotions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle promotion creation
   */
  const handlePromotionCreated = () => {
    // Refresh the data to get updated pagination
    loadPromotions();
    setIsCreateDialogOpen(false);
  };

  /**
   * Handle promotion update
   */
  const handlePromotionUpdated = (updatedPromotion: Promotion) => {
    if (promotionsData) {
      const updatedData = {
        ...promotionsData,
        data: promotionsData.data.map((promotion) =>
          promotion.id === updatedPromotion.id ? updatedPromotion : promotion
        ),
      };
      setPromotionsData(updatedData);
    }
  };

  /**
   * Handle promotion deletion
   */
  const handlePromotionDeleted = () => {
    // Refresh the data to get updated pagination
    loadPromotions();
  };

  /**
   * Handle filter changes
   */
  const handleFiltersChange = (newFilters: GetPromotionsRequestParams) => {
    setFilters(newFilters);
  };

  // Load promotions on component mount and when filters change
  useEffect(() => {
    loadPromotions();
  }, [filters]);

  // Calculate promotion statistics from current data
  const promotions = promotionsData?.data || [];
  const promotionStats = {
    total: promotionsData?.total || 0,
    active: promotions.filter(
      (promotion) => "active" in promotion && promotion.active === true
    ).length,
    inactive: promotions.filter(
      (promotion) => "active" in promotion && promotion.active === false
    ).length,
    expired: promotions.filter((promotion) => {
      if ("endDate" in promotion && promotion.endDate) {
        const endDate = new Date(promotion.endDate as string);
        return endDate < new Date();
      }
      return false;
    }).length,
    upcoming: promotions.filter((promotion) => {
      if ("startDate" in promotion && promotion.startDate) {
        const startDate = new Date(promotion.startDate as string);
        return startDate > new Date();
      }
      return false;
    }).length,
  };

  return (
    <AdminPageLayout
      title="Gestión de Promociones"
      subtitle="Administra las promociones y ofertas especiales"
    >
      {/* Promotion Statistics */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Estadísticas de Promociones"
          description="Resumen del estado actual de promociones"
          icon={<Percent className="h-6 w-6" />}
        />
        <PromotionStats stats={promotionStats} />
      </section>

      {/* Promotion Management Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <AdminSectionHeader
              title="Lista de Promociones"
              description="Gestiona todas las promociones y ofertas"
              icon={<Percent className="h-6 w-6" />}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Crear Promoción</span>
            </Button>
          </div>
        </div>

        <PromotionManagementTable
          promotionsData={promotionsData}
          isLoading={isLoading}
          error={error}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onPromotionUpdated={handlePromotionUpdated}
          onPromotionDeleted={handlePromotionDeleted}
          onRefresh={loadPromotions}
        />
      </section>

      {/* Create Promotion Dialog */}
      <CreatePromotionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onPromotionCreated={handlePromotionCreated}
      />
    </AdminPageLayout>
  );
} 