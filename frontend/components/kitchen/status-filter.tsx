"use client";

import {
  FilterButton,
  StatusConfig,
} from "@/components/common/buttons/filter-button";
import { Check, Clock3, Loader2, LucideIcon, RotateCcw, X } from "lucide-react";

export interface StatusFilterConfig {
  all?: StatusConfig;
  pending?: StatusConfig;
  inProgress?: StatusConfig;
  completed?: StatusConfig;
  cancelled?: StatusConfig;
}

interface StatusFilterProps {
  activeStatus: string | null;
  onFilterChange: (status: string | null) => void;
  pendingCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount?: number;
  config?: StatusFilterConfig;
  className?: string;
}

interface StatusButtonConfig {
  id: string | null;
  variant: string;
  icon: LucideIcon;
  label: string;
  count: number;
  config: StatusConfig;
}

export function StatusFilter({
  activeStatus,
  onFilterChange,
  pendingCount,
  inProgressCount,
  completedCount,
  cancelledCount = 0,
  config = {},
  className = "",
}: StatusFilterProps) {
  const totalCount =
    pendingCount + inProgressCount + completedCount + cancelledCount;

  const buttons: StatusButtonConfig[] = [
    {
      id: null,
      variant: "all",
      icon: RotateCcw,
      label: "Todas",
      count: totalCount,
      config: {
        buttonVariant: "all",
        badgeVariant: "cafe",
        iconClass:
          "text-[var(--color-cafe)] group-hover:text-white dark:text-[var(--color-rosa)] dark:group-hover:text-black",
        activeIconClass: "text-white dark:text-black",
        ...(config.all || {}),
      },
    },
    {
      id: "pending",
      variant: "pending",
      icon: Clock3,
      label: "Pendientes",
      count: pendingCount,
      config: {
        buttonVariant: "pending",
        iconClass:
          "text-[var(--status-pending)] group-hover:text-white dark:group-hover:text-black",
        activeIconClass: "text-white dark:text-black",
        ...(config.pending || {}),
      },
    },
    {
      id: "in-progress",
      variant: "in-progress",
      icon: Loader2,
      label: "En preparación",
      count: inProgressCount,
      config: {
        buttonVariant: "in-progress",
        iconClass:
          "text-[var(--status-inprogress)] group-hover:text-white dark:group-hover:text-black animate-spin",
        activeIconClass: "text-white dark:text-black animate-spin",
        ...(config.inProgress || {}),
      },
    },
    {
      id: "completed",
      variant: "completed",
      icon: Check,
      label: "Completadas",
      count: completedCount,
      config: {
        buttonVariant: "completed",
        iconClass:
          "text-[var(--status-completed)] group-hover:text-white dark:group-hover:text-black",
        activeIconClass: "text-white dark:text-black",
        ...(config.completed || {}),
      },
    },
    {
      id: "cancelled",
      variant: "cancelled",
      icon: X,
      label: "Canceladas",
      count: cancelledCount,
      config: {
        buttonVariant: "cancelled",
        iconClass:
          "text-[var(--status-cancelled)] group-hover:text-white dark:group-hover:text-black",
        activeIconClass: "text-white dark:text-black",
        ...(config.cancelled || {}),
      },
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 mb-6 ${className}`}>
      {buttons.map((button) => (
        <FilterButton
          key={button.id || "all"}
          isActive={activeStatus === button.id}
          variant={button.variant}
          icon={button.icon}
          label={button.label}
          count={button.count}
          onClick={() => onFilterChange(button.id)}
          config={button.config}
        />
      ))}
    </div>
  );
}
