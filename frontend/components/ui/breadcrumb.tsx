"use client";

import { Button } from "@/components/ui/button";
import {
  cn,
  getVariantBadgeClass,
  getVariantIconColorClass,
} from "@/lib/utils";
import { CategoryVariant } from "colori-platform-shared";
import { ChevronRight, Home, Package } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  productCount?: number;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  categoryVariant?: CategoryVariant;
  className?: string;
}

export function Breadcrumb({
  items,
  categoryVariant = CategoryVariant.DEFAULT,
  className,
}: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight
              className={cn(
                "h-4 w-4 mx-2",
                getVariantIconColorClass(categoryVariant)
              )}
            />
          )}

          {item.isActive ? (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-medium px-3 py-1.5 rounded-md transition-colors",
                  getVariantBadgeClass(categoryVariant)
                )}
              >
                {item.label}
              </span>
              {item.productCount !== undefined && item.productCount > 0 && (
                <>
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 mx-1",
                      getVariantIconColorClass(categoryVariant),
                      "opacity-60"
                    )}
                  />
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors",
                      getVariantBadgeClass(categoryVariant),
                      "opacity-80 hover:opacity-100"
                    )}
                  >
                    <Package className="h-3 w-3" />
                    <span>{item.productCount}</span>
                  </div>
                </>
              )}
            </div>
          ) : item.href ? (
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
              asChild
            >
              <Link href={item.href}>
                {index === 0 && <Home className="mr-1 h-4 w-4" />}
                {item.label}
              </Link>
            </Button>
          ) : item.onClick ? (
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground hover:text-foreground transition-colors"
              onClick={item.onClick}
            >
              {index === 0 && <Home className="mr-1 h-4 w-4 inline" />}
              {item.label}
            </Button>
          ) : (
            <span className="text-muted-foreground">
              {index === 0 && <Home className="mr-1 h-4 w-4 inline" />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
