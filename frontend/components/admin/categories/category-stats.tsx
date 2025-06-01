/**
 * Category Statistics Component
 * Displays key metrics and statistics for categories
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import {
  BarChart3,
  FolderCheck,
  FolderOpen,
  FolderX,
  Package,
} from "lucide-react";

/**
 * Category statistics data structure
 */
export interface CategoryStatsData {
  total: number;
  active: number;
  inactive: number;
  withProducts: number;
  averageProducts: number;
}

/**
 * Category statistics props
 */
interface CategoryStatsProps {
  stats: CategoryStatsData;
}

/**
 * Individual stat card props
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "active" | "inactive" | "products" | "average";
  description?: string;
}

/**
 * Individual stat card component
 */
function StatCard({
  title,
  value,
  icon,
  variant = "default",
  description,
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "active":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400";
      case "inactive":
        return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      case "products":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
      case "average":
        return "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <AdminCard
      flat
      className="hover:shadow-lg transition-shadow h-full w-full"
      contentClassName="p-4"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div
            className={`p-2.5 rounded-full flex-shrink-0 ${getVariantStyles()}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </AdminCard>
  );
}

/**
 * Category statistics component
 * @param props - Component props
 * @returns JSX element
 */
export function CategoryStats({
  stats,
}: CategoryStatsProps): React.JSX.Element {
  const formatAverage = (average: number) => {
    return average.toFixed(1);
  };

  const statCards = [
    {
      title: "Total de Categorías",
      value: stats.total,
      icon: <FolderOpen className="h-5 w-5" />,
      variant: "default" as const,
      description: "Categorías registradas",
    },
    {
      title: "Categorías Activas",
      value: stats.active,
      icon: <FolderCheck className="h-5 w-5" />,
      variant: "active" as const,
      description:
        stats.total > 0
          ? `${Math.round((stats.active / stats.total) * 100)}% del total`
          : "Disponibles en el menú",
    },
    {
      title: "Categorías Inactivas",
      value: stats.inactive,
      icon: <FolderX className="h-5 w-5" />,
      variant: "inactive" as const,
      description: "No disponibles",
    },
    {
      title: "Con Productos",
      value: stats.withProducts,
      icon: <Package className="h-5 w-5" />,
      variant: "products" as const,
      description:
        stats.total > 0
          ? `${Math.round((stats.withProducts / stats.total) * 100)}% del total`
          : "Categorías con productos",
    },
    {
      title: "Promedio de Productos",
      value: formatAverage(stats.averageProducts),
      icon: <BarChart3 className="h-5 w-5" />,
      variant: "average" as const,
      description: "Productos por categoría",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          description={stat.description}
        />
      ))}
    </div>
  );
}
