"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IconCircle } from "@/components/ui/icon-circle";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  iconVariant?: "primary" | "muted" | "secondary" | "accent" | "default";
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
  iconVariant = "muted",
}: EmptyStateProps) {
  return (
    <Card className={cn("border-dashed text-center", className)}>
      <CardContent className="pt-8 pb-6 px-6">
        <IconCircle variant={iconVariant} className="mx-auto mb-4">
          {icon}
        </IconCircle>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardContent>
      {actionLabel && actionHref && (
        <CardFooter className="pb-6 flex justify-center">
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
