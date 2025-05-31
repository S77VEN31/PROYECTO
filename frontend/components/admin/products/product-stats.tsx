/**
 * Product Statistics Component
 * Displays key metrics and statistics for products
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import {
  DollarSign,
  Package,
  PackageCheck,
  PackageX,
  Utensils,
} from "lucide-react";

/**
 * Product statistics data structure
 */
export interface ProductStatsData {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  withNutrition: number;
}

/**
 * Product statistics props
 */
interface ProductStatsProps {
  stats: ProductStatsData;
}

/**
 * Individual stat card props
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "active" | "inactive" | "price" | "nutrition";
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
      case "price":
        return "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400";
      case "nutrition":
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
 * Product statistics component
 * @param props - Component props
 * @returns JSX element
 */
export function ProductStats({ stats }: ProductStatsProps): React.JSX.Element {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const statCards = [
    {
      title: "Total de Productos",
      value: stats.total,
      icon: <Package className="h-5 w-5" />,
      variant: "default" as const,
      description: "Productos registrados",
    },
    {
      title: "Productos Activos",
      value: stats.active,
      icon: <PackageCheck className="h-5 w-5" />,
      variant: "active" as const,
      description:
        stats.total > 0
          ? `${Math.round((stats.active / stats.total) * 100)}% del total`
          : "Disponibles en el menú",
    },
    {
      title: "Productos Inactivos",
      value: stats.inactive,
      icon: <PackageX className="h-5 w-5" />,
      variant: "inactive" as const,
      description: "No disponibles",
    },
    {
      title: "Precio Promedio",
      value: formatPrice(stats.averagePrice),
      icon: <DollarSign className="h-5 w-5" />,
      variant: "price" as const,
      description: "Precio medio de productos",
    },
    {
      title: "Con Información Nutricional",
      value: stats.withNutrition,
      icon: <Utensils className="h-5 w-5" />,
      variant: "nutrition" as const,
      description:
        stats.total > 0
          ? `${Math.round(
              (stats.withNutrition / stats.total) * 100
            )}% del total`
          : "Con datos nutricionales",
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