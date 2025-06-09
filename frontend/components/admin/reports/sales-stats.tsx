/**
 * Sales Statistics Component
 * Displays key sales metrics and statistics
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface SalesStatsProps {
  statistics: {
    totalSales: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalTips: number;
    totalTax: number;
    ordersByStatus: Record<string, number>;
    ordersByPaymentMethod: Record<string, number>;
    revenueByPaymentMethod: Record<string, number>;
    dailySales: Array<{ date: string; orders: number; revenue: number }>;
  };
  isLoading?: boolean;
}

/**
 * Format currency for display
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
  }).format(amount);
};

/**
 * Sales statistics component
 */
export function SalesStats({ statistics, isLoading }: SalesStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <AdminCard key={i} className="animate-pulse">
            <div className="h-20 bg-muted rounded"></div>
          </AdminCard>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Ventas",
      value: statistics.totalSales.toString(),
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Ingresos Totales",
      value: formatCurrency(statistics.totalRevenue),
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Valor Promedio",
      value: formatCurrency(statistics.averageOrderValue),
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Propinas Totales",
      value: formatCurrency(statistics.totalTips),
      icon: <CreditCard className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <AdminCard key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <AdminCard title="Órdenes por Estado" className="p-6">
          <div className="space-y-3">
            {Object.entries(statistics.ordersByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {status === "completed" && "Completadas"}
                    {status === "pending" && "Pendientes"}
                    {status === "in-progress" && "En Progreso"}
                    {status === "cancelled" && "Canceladas"}
                    {!["completed", "pending", "in-progress", "cancelled"].includes(status) && status}
                  </Badge>
                </div>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Orders by Payment Method */}
        <AdminCard title="Órdenes por Método de Pago" className="p-6">
          <div className="space-y-3">
            {Object.entries(statistics.ordersByPaymentMethod).map(([method, count]) => (
              <div key={method} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">
                    {method === "cash" && "Efectivo"}
                    {method === "card" && "Tarjeta"}
                    {method === "sinpe-movil" && "SINPE Móvil"}
                    {method === "Sin especificar" && "Sin especificar"}
                    {!["cash", "card", "sinpe-movil", "Sin especificar"].includes(method) && method}
                  </span>
                </div>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* Tax Information */}
      <AdminCard title="Información Fiscal" className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-lg font-semibold">
                {formatCurrency(statistics.totalRevenue - statistics.totalTax)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Impuestos</p>
              <p className="text-lg font-semibold">
                {formatCurrency(statistics.totalTax)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-semibold">
                {formatCurrency(statistics.totalRevenue)}
              </p>
            </div>
          </div>

          {/* Payment Methods Revenue Summary */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Monto por Método:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(statistics.revenueByPaymentMethod).map(([method, revenue]) => (
                <div key={method} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      {method === "cash" && "Efectivo"}
                      {method === "card" && "Tarjeta"}
                      {method === "sinpe-movil" && "SINPE Móvil"}
                      {method === "Sin especificar" && "Sin especificar"}
                      {!["cash", "card", "sinpe-movil", "Sin especificar"].includes(method) && method}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    {formatCurrency(revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminCard>
    </div>
  );
} 