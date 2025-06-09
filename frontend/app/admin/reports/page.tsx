/**
 * Sales Reports Page
 * Main page for viewing and exporting sales reports
 */

"use client";

import { OrderApiService } from "@/api/entities/order.api";
import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import {
  SalesFilters,
  SalesStats,
  SalesTable,
} from "@/components/admin/reports";
import { toast } from "sonner";
import { exportSalesReportToExcel } from "@/lib/excel-export";
import { Order } from "colori-platform-shared";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface SalesReportData {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  statistics: {
    totalSales: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalTips: number;
    totalTax: number;
    ordersByStatus: Record<string, number>;
    ordersByPaymentMethod: Record<string, number>;
    dailySales: Array<{ date: string; orders: number; revenue: number }>;
  };
}

export default function SalesReportsPage() {
  
  // State management
  const [reportData, setReportData] = useState<SalesReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    status: undefined as string | undefined,
    search: undefined as string | undefined,
    page: 1,
    limit: 10,
  });

  /**
   * Load sales report data
   */
  const loadSalesReport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await OrderApiService.getSalesReport({
        page: filters.page,
        limit: filters.limit,
        status: filters.status,
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      if (response) {
        setReportData(response);
      } else {
        setError("Error al cargar el reporte de ventas");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar el reporte de ventas"
      );
      console.error("Error loading sales report:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle filter changes
   */
  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset to page 1 when filters change (except for pagination)
    }));
  };

  /**
   * Apply filters and reload data
   */
  const handleApplyFilters = () => {
    loadSalesReport();
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  /**
   * Export to Excel
   */
  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      
      // Get all data for export (no pagination)
      const exportResponse = await OrderApiService.getSalesReportForExport({
        status: filters.status,
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      if (exportResponse) {
        const filename = exportSalesReportToExcel(
          exportResponse.orders,
          exportResponse.statistics,
          {
            startDate: filters.startDate,
            endDate: filters.endDate,
            status: filters.status,
            search: filters.search,
          }
        );

        toast.success(`Exportación Exitosa: El reporte se ha exportado como ${filename}`);
      } else {
        toast.error("Error de Exportación: No se pudo exportar el reporte");
      }
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      toast.error("Error de Exportación: Ocurrió un error al exportar el reporte");
    } finally {
      setIsExporting(false);
    }
  };

  // Load initial data
  useEffect(() => {
    loadSalesReport();
  }, [filters.page]); // Only reload when page changes

  return (
    <AdminPageLayout
      title="Reportes de Ventas"
      subtitle="Analiza las ventas y genera reportes detallados"
    >
      {/* Filters Section */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Filtros de Reporte"
          description="Configura los filtros para generar reportes personalizados"
          icon={<FileText className="h-6 w-6" />}
        />
        <SalesFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={handleApplyFilters}
          onExportExcel={handleExportExcel}
          isLoading={isLoading}
          isExporting={isExporting}
        />
      </section>

      {/* Statistics Section */}
      {reportData && (
        <section className="mb-8">
          <AdminSectionHeader
            title="Estadísticas de Ventas"
            description="Resumen de métricas y totales"
            icon={<FileText className="h-6 w-6" />}
          />
          <SalesStats
            statistics={reportData.statistics}
            isLoading={isLoading}
          />
        </section>
      )}

      {/* Sales Table Section */}
      <section>
        <AdminSectionHeader
          title="Detalle de Órdenes"
          description="Lista detallada de todas las órdenes"
          icon={<FileText className="h-6 w-6" />}
        />
        <SalesTable
          orders={reportData?.orders || []}
          total={reportData?.total || 0}
          page={reportData?.page || 1}
          limit={reportData?.limit || 10}
          isLoading={isLoading}
          error={error}
          onPageChange={handlePageChange}
          onRefresh={loadSalesReport}
        />
      </section>
    </AdminPageLayout>
  );
} 