"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Calendar, CalendarX, Percent, TrendingUp } from "lucide-react";

/**
 * Promotion statistics data structure
 */
export interface PromotionStatsData {
  total: number;
  active: number;
  inactive: number;
  expired: number;
  upcoming: number;
}

/**
 * Promotion statistics props
 */
interface PromotionStatsProps {
  stats: PromotionStatsData;
}

/**
 * Individual stat card props
 */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "active" | "inactive" | "expired" | "upcoming";
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
        return "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400";
      case "expired":
        return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      case "upcoming":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
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
 * Promotion statistics component
 * @param props - Component props
 * @returns JSX element
 */
export function PromotionStats({
  stats,
}: PromotionStatsProps): React.JSX.Element {
  const activePercentage =
    stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
  const upcomingPercentage =
    stats.total > 0 ? Math.round((stats.upcoming / stats.total) * 100) : 0;
  const expiredPercentage =
    stats.total > 0 ? Math.round((stats.expired / stats.total) * 100) : 0;

  const statCards = [
    {
      title: "Total de Promociones",
      value: stats.total,
      icon: <Percent className="h-5 w-5" />,
      variant: "default" as const,
      description: "Promociones registradas",
    },
    {
      title: "Promociones Activas",
      value: stats.active,
      icon: <TrendingUp className="h-5 w-5" />,
      variant: "active" as const,
      description:
        stats.total > 0
          ? `${activePercentage}% del total`
          : "Promociones en curso",
    },
    {
      title: "Promociones Inactivas",
      value: stats.inactive,
      icon: <CalendarX className="h-5 w-5" />,
      variant: "inactive" as const,
      description: "Promociones pausadas",
    },
    {
      title: "Promociones Expiradas",
      value: stats.expired,
      icon: <CalendarX className="h-5 w-5" />,
      variant: "expired" as const,
      description:
        stats.total > 0
          ? `${expiredPercentage}% del total`
          : "Promociones vencidas",
    },
    {
      title: "Promociones Próximas",
      value: stats.upcoming,
      icon: <Calendar className="h-5 w-5" />,
      variant: "upcoming" as const,
      description:
        stats.total > 0
          ? `${upcomingPercentage}% del total`
          : "Promociones programadas",
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