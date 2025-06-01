/**
 * User Statistics Component
 * Displays user statistics in a grid of cards
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { getStatCardColorClass } from "@/lib/utils";
import { UserRole } from "colori-platform-shared";
import {
  Activity,
  ChefHat,
  CreditCard,
  Crown,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";

/**
 * User statistics data structure
 */
export interface UserStatsData {
  total: number;
  admins: number;
  managers: number;
  chefs: number;
  servers: number;
  cashiers: number;
  active: number;
}

/**
 * User statistics props
 */
interface UserStatsProps {
  stats: UserStatsData;
}

/**
 * Individual stat card props
 */
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  variant?: "primary" | "total" | "active" | "inactive" | UserRole | string;
}

/**
 * Individual stat card component
 */
function StatCard({ title, value, icon, variant = "primary" }: StatCardProps) {
  return (
    <AdminCard
      flat
      className="hover:shadow-lg transition-shadow h-full w-full"
      contentClassName="p-4"
    >
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <div
            className={`p-2.5 rounded-full flex-shrink-0 ${getStatCardColorClass(
              variant
            )}`}
          >
            {icon}
          </div>
        </div>
      </div>
    </AdminCard>
  );
}

/**
 * User statistics component
 * @param props - Component props
 * @returns JSX element
 */
export function UserStats({ stats }: UserStatsProps): React.JSX.Element {
  const statCards = [
    {
      title: "Total de Usuarios",
      value: stats.total,
      icon: <Users className="h-5 w-5" />,
      variant: "total" as const,
    },
    {
      title: "Usuarios Activos",
      value: stats.active,
      icon: <Activity className="h-5 w-5" />,
      variant: "active" as const,
    },
    {
      title: "Administradores",
      value: stats.admins,
      icon: <Shield className="h-5 w-5" />,
      variant: UserRole.ADMIN,
    },
    {
      title: "Gerentes",
      value: stats.managers,
      icon: <Crown className="h-5 w-5" />,
      variant: UserRole.MANAGER,
    },
    {
      title: "Chefs",
      value: stats.chefs,
      icon: <ChefHat className="h-5 w-5" />,
      variant: UserRole.CHEF,
    },
    {
      title: "Meseros",
      value: stats.servers,
      icon: <UserCheck className="h-5 w-5" />,
      variant: UserRole.SERVER,
    },
    {
      title: "Cajeros",
      value: stats.cashiers,
      icon: <CreditCard className="h-5 w-5" />,
      variant: UserRole.CASHIER,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
      {statCards.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}
