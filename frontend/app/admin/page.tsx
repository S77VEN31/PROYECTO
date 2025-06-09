"use client";

import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import { DashboardStats, StatItem } from "@/components/admin/dashboard-stats";
import { PopularItem, PopularItems } from "@/components/admin/popular-items";
import { QuickActions } from "@/components/admin/quick-actions";
import {
  ActivityItem,
  RecentActivity,
} from "@/components/admin/recent-activity";
import { DashboardApiService, DashboardData } from "@/api/dashboard.api";
import { ClipboardList, FileBox, ShoppingCart, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await DashboardApiService.getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminPageLayout
        title="Dashboard Administrativo"
        subtitle="Panel de control para la administración del restaurante"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Cargando datos del dashboard...</span>
          </div>
        </div>
      </AdminPageLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <AdminPageLayout
        title="Dashboard Administrativo"
        subtitle="Panel de control para la administración del restaurante"
      >
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">
                {error || 'Error al cargar los datos del dashboard'}
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-blue-600 hover:underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }

  const stats: StatItem[] = [
    {
      label: "Ventas Hoy",
      value: `₡${dashboardData.stats.totalSalesToday.toLocaleString()}`,
      change: dashboardData.stats.salesGrowth,
      positive: !dashboardData.stats.salesGrowth.startsWith('-'),
    },
    {
      label: "Pedidos Completados",
      value: dashboardData.stats.totalOrdersToday.toString(),
      change: dashboardData.stats.ordersGrowth,
      positive: !dashboardData.stats.ordersGrowth.startsWith('-'),
    },
    {
      label: "Tiempo Promedio",
      value: `${dashboardData.stats.averageOrderTime} min`,
      change: dashboardData.stats.timeImprovement,
      positive: dashboardData.stats.timeImprovement.startsWith('-'), // Negative time is good
    },
    {
      label: "Productos Vendidos",
      value: dashboardData.stats.totalProductsSold.toString(),
      change: dashboardData.stats.productsGrowth,
      positive: !dashboardData.stats.productsGrowth.startsWith('-'),
    },
  ];

  const popularItems: PopularItem[] = dashboardData.popularProducts.map(product => ({
    id: product.id,
    name: product.name,
    sales: product.sales,
    revenue: product.revenue,
    category: product.category
  }));

  const recentActivity: ActivityItem[] = dashboardData.recentActivity.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    time: activity.time
  }));

  return (
    <AdminPageLayout
      title="Dashboard Administrativo"
      subtitle="Panel de control para la administración del restaurante"
    >
      {/* Header with refresh button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={fetchDashboardData}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar datos
        </Button>
      </div>

      {/* Stats Section */}
      <section className="mb-8">
        <DashboardStats stats={stats} />
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Acciones Rápidas"
          description="Gestiona tu restaurante fácilmente"
          icon={<FileBox className="h-6 w-6" />}
        />
        <QuickActions />
      </section>

      {/* Popular Items & Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AdminSectionHeader
            title="Productos Populares"
            description="Lo más vendido en tu restaurante"
            icon={<ShoppingCart className="h-6 w-6" />}
          />
          <PopularItems items={popularItems} />
        </div>

        <div>
          <AdminSectionHeader
            title="Actividad Reciente"
            description="Últimas actualizaciones y acciones"
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <RecentActivity items={recentActivity} />
        </div>
      </section>
    </AdminPageLayout>
  );
}
