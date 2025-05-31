/**
 * Product Statistics Component
 * Displays key metrics and statistics for products
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  DollarSign, 
  Package, 
  PackageCheck, 
  PackageX,
  Utensils
} from "lucide-react";

/**
 * Product statistics data structure
 */
interface ProductStatsData {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  withNutrition: number;
}

/**
 * Product stats component props
 */
interface ProductStatsProps {
  stats: ProductStatsData;
}

/**
 * Product statistics component
 * @param props - Component props
 * @returns JSX element
 */
export function ProductStats({ stats }: ProductStatsProps): React.JSX.Element {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const statsCards = [
    {
      title: "Total de Productos",
      value: stats.total.toString(),
      icon: <Package className="h-5 w-5" />,
      description: "Productos registrados",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Productos Activos",
      value: stats.active.toString(),
      icon: <PackageCheck className="h-5 w-5" />,
      description: "Disponibles en el menú",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Productos Inactivos",
      value: stats.inactive.toString(),
      icon: <PackageX className="h-5 w-5" />,
      description: "No disponibles",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Precio Promedio",
      value: formatPrice(stats.averagePrice),
      icon: <DollarSign className="h-5 w-5" />,
      description: "Precio medio de productos",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Con Información Nutricional",
      value: stats.withNutrition.toString(),
      icon: <Utensils className="h-5 w-5" />,
      description: "Productos con datos nutricionales",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statsCards.map((stat, index) => (
        <AdminCard key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                {stat.title === "Productos Activos" && stats.total > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round((stats.active / stats.total) * 100)}%
                  </Badge>
                )}
                {stat.title === "Con Información Nutricional" && stats.total > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round((stats.withNutrition / stats.total) * 100)}%
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        </AdminCard>
      ))}
    </div>
  );
} 