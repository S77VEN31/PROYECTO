"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

// Importar tipos de Button y Badge
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export interface StatusConfig {
  buttonVariant?: string;
  badgeVariant?: string;
  iconClass?: string;
  activeIconClass?: string;
  badgeClass?: string;
}

export interface FilterButtonProps {
  isActive: boolean;
  variant: string;
  icon: LucideIcon;
  label: string;
  count: number;
  onClick: () => void;
  config?: StatusConfig;
  className?: string;
}

export function FilterButton({
  isActive,
  variant,
  icon: Icon,
  label,
  count,
  onClick,
  config,
  className = "",
}: FilterButtonProps) {
  // Apply default styles and override with config if provided
  const buttonVariant = isActive
    ? ((config?.buttonVariant || variant) as ButtonVariant)
    : "outline";

  const badgeVariant = (config?.badgeVariant || variant) as BadgeVariant;

  // Use activeIconClass when button is active, otherwise use iconClass
  const iconClass = isActive
    ? config?.activeIconClass || "text-white dark:text-black" // Default active icon colors
    : config?.iconClass || "";

  const badgeClass = `ml-1 ${
    isActive ? "border border-white dark:border-black" : ""
  } ${config?.badgeClass || ""}`;

  return (
    <Button
      variant={buttonVariant}
      size="sm"
      className={`flex items-center gap-2 group ${className}`}
      onClick={onClick}
    >
      <Icon className={`h-4 w-4 ${iconClass}`} />
      {label}
      <Badge variant={badgeVariant} className={badgeClass}>
        {count}
      </Badge>
    </Button>
  );
}
