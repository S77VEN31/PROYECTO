"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AdminCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  flat?: boolean;
}

export function AdminCard({
  title,
  children,
  className,
  headerClassName,
  contentClassName,
  titleClassName,
  flat = false,
}: AdminCardProps) {
  // En este caso solo usamos primary, que ya cambia automáticamente según el tema
  // En modo claro será café (#40041A), en modo oscuro será rosa (#F2D0D0)
  const borderColorClass = "border-t-primary";
  const shadowColorClass = "shadow-primary/10";

  return (
    <Card
      className={cn(
        flat ? "border" : "border-t-4 shadow-md",
        !flat && borderColorClass,
        !flat && shadowColorClass,
        className
      )}
    >
      {title && (
        <CardHeader className={cn("pb-2", headerClassName)}>
          <CardTitle
            className={cn("text-lg font-semibold text-primary", titleClassName)}
          >
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
    </Card>
  );
}
