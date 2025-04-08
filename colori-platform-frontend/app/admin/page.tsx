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
import { mockOrders } from "@/data/mock";
import { ClipboardList, FileBox, ShoppingCart } from "lucide-react";

export default function AdminDashboard() {
  // Calculate stats based on mock data
  const totalOrdersToday = mockOrders.length;

  const totalSales = mockOrders.reduce(
    (total, order) => total + order.total,
    0
  );
  const salesFormatted = `$${totalSales.toFixed(2)}`;

  const avgTime = 18; // In minutes

  const totalItems = mockOrders.flatMap((order) => order.products).length;

  const stats: StatItem[] = [
    {
      label: "Ventas Hoy",
      value: salesFormatted,
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Pedidos Completados",
      value: totalOrdersToday.toString(),
      change: "+8.3%",
      positive: true,
    },
    {
      label: "Tiempo Promedio",
      value: `${avgTime} min`,
      change: "-5.2%",
      positive: true,
    },
    {
      label: "Productos Vendidos",
      value: totalItems.toString(),
      change: "+15.7%",
      positive: true,
    },
  ];

  // Calculate popular items based on mockMenuItems and mockOrders
  const itemCounts = mockOrders
    .flatMap((order) => order.products)
    .reduce((acc, item) => {
      const existing = acc.find((i) => i.id === item.product.id);
      if (existing) {
        existing.sales += item.quantity;
        existing.revenue += item.product.price * item.quantity;
      } else {
        acc.push({
          id: item.product.id,
          name: item.product.name,
          sales: item.quantity,
          revenue: item.product.price * item.quantity,
          category:
            Array.isArray(item.product.categories) &&
            item.product.categories.length > 0
              ? typeof item.product.categories[0] === "string"
                ? item.product.categories[0]
                : item.product.categories[0].name
              : "Sin categoría",
        });
      }
      return acc;
    }, [] as Array<PopularItem>);

  const popularItems = itemCounts.sort((a, b) => b.sales - a.sales).slice(0, 5);

  // Recent activity data
  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      title: "Nuevo pedido #1048",
      description: "4 productos - $45.98",
      time: "Hace 5 min",
    },
    {
      id: "2",
      title: "Pedido #1047 completado",
      description: "Tiempo de preparación: 15 min",
      time: "Hace 12 min",
    },
    {
      id: "3",
      title: "Menú actualizado",
      description: "Cambios por Juan García",
      time: "Hace 45 min",
    },
  ];

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
