"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { cn } from "@/lib/utils";
import { Clock, User } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  // Campos extendidos para mayor flexibilidad
  type?: "order" | "product" | "category" | "user" | "system";
  actionType?: "created" | "updated" | "deleted" | "viewed" | "completed";
  entityId?: string;
  user?: {
    id: string;
    name: string;
    role?: string;
  };
  metadata?: Record<string, unknown>;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  // Determinar la intensidad del color primario según el tipo de actividad
  const getEmphasisLevel = (title: string, type?: string): string => {
    // Priorizar el tipo si está disponible
    if (type) {
      switch (type) {
        case "order":
          return "text-naranja";
        case "product":
          return "text-primary";
        case "category":
          return "text-celeste";
        case "user":
          return "text-rosa";
        case "system":
          return "text-muted-foreground";
      }
    }

    // Fallback al comportamiento anterior
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("nuevo")) {
      return "text-primary";
    } else if (lowerTitle.includes("completado")) {
      return "text-primary/90";
    } else {
      return "text-primary/80";
    }
  };

  return (
    <AdminCard
      title="Actividad Reciente"
      contentClassName="p-0"
      titleClassName="text-xl px-5 py-4"
      headerClassName="pb-0 pt-4 px-5"
      className="overflow-hidden"
    >
      <ul className="divide-y divide-border">
        {items.map((item, index) => {
          const emphasisClass = getEmphasisLevel(item.title, item.type);

          return (
            <li
              key={item.id}
              className={cn(
                "py-4 px-5 flex justify-between hover:bg-primary/5 transition-colors",
                "border-l-2",
                index === 0 ? "border-l-primary" : "border-l-transparent"
              )}
            >
              <div>
                <p className={cn("font-medium mb-1", emphasisClass)}>
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {item.user && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {item.user.name}
                    {item.user.role && (
                      <span className="opacity-75 ml-1">
                        ({item.user.role})
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground whitespace-nowrap ml-4 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminCard>
  );
}
