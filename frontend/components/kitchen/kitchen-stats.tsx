"use client";

import { CheckCircle2, Clock, PanelTop, TrendingUp } from "lucide-react";
import { StatsCard } from "../common/cards/stats-card";

interface KitchenStatsProps {
  pendingOrders: number;
  completedOrders: number;
  averageTime: string;
  totalOrders: number;
}

export function KitchenStats({
  pendingOrders,
  completedOrders,
  averageTime,
  totalOrders,
}: KitchenStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard
        title="Pendientes"
        value={pendingOrders}
        description="órdenes por preparar"
        icon={PanelTop}
        borderColor="border-l-[var(--status-pending)]"
        iconColor="text-[var(--status-pending)]"
      />

      <StatsCard
        title="Completadas"
        value={completedOrders}
        description="órdenes hoy"
        icon={CheckCircle2}
        borderColor="border-l-[var(--status-completed)]"
        iconColor="text-[var(--status-completed)]"
      />

      <StatsCard
        title="Tiempo Promedio"
        value={averageTime}
        description="de preparación"
        icon={Clock}
        borderColor="border-l-[var(--status-inprogress)]"
        iconColor="text-[var(--status-inprogress)]"
      />

      <StatsCard
        title="Total del Día"
        value={totalOrders}
        description="órdenes procesadas"
        icon={TrendingUp}
        borderColor="border-l-[var(--primary)]"
        iconColor="text-primary"
      />
    </div>
  );
}
