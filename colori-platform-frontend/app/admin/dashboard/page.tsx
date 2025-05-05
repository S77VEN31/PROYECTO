"use client";

import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import { DashboardStats, StatItem } from "@/components/admin/dashboard-stats";
import { PopularItem, PopularItems } from "@/components/admin/popular-items";
import { QuickActions } from "@/components/admin/quick-actions";
import { ActivityItem, RecentActivity } from "@/components/admin/recent-activity";
import { ClipboardList, FileBox, ShoppingCart } from "lucide-react";

export default function AdminDashboardPage() {
  const stats: StatItem[] = [
    {
      label: "Ventas Hoy",
      value: "$0.00",
      change: "0%",
      positive: true,
    },
    {
      label: "Pedidos Completados",
      value: "0",
      change: "0%",
      positive: true,
    },
    {
      label: "Tiempo Promedio",
      value: "0 min",
      change: "0%",
      positive: true,
    },
    {
      label: "Productos Vendidos",
      value: "0",
      change: "0%",
      positive: true,
    },
  ];

  const popularItems: PopularItem[] = [];

  const recentActivity: ActivityItem[] = [];

  return (
    <AdminPageLayout
      title="Dashboard Administrativo"
      subtitle="Panel de control para la administración del restaurante"
    >
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