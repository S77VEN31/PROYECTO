/**
 * User Statistics Component
 * Displays user statistics in a grid of cards
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
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
  variant?:
    | "default"
    | "admin"
    | "manager"
    | "chef"
    | "server"
    | "cashier"
    | "active";
}

/**
 * Individual stat card component
 */
function StatCard({ title, value, icon, variant = "default" }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "admin":
        return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
      case "manager":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
      case "chef":
        return "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400";
      case "server":
        return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
      case "cashier":
        return "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400";
      case "active":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <AdminCard flat className="hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`p-3 rounded-full flex-shrink-0 ${getVariantStyles()}`}>
          {icon}
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
      variant: "default" as const,
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
      variant: "admin" as const,
    },
    {
      title: "Gerentes",
      value: stats.managers,
      icon: <Crown className="h-5 w-5" />,
      variant: "manager" as const,
    },
    {
      title: "Chefs",
      value: stats.chefs,
      icon: <ChefHat className="h-5 w-5" />,
      variant: "chef" as const,
    },
    {
      title: "Meseros",
      value: stats.servers,
      icon: <UserCheck className="h-5 w-5" />,
      variant: "server" as const,
    },
    {
      title: "Cajeros",
      value: stats.cashiers,
      icon: <CreditCard className="h-5 w-5" />,
      variant: "cashier" as const,
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
