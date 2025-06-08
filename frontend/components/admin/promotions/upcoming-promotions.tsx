"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Promotion, PromotionCreate } from "colori-platform-shared";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Euro,
  Eye,
  Percent,
  Sparkles,
  XCircle,
} from "lucide-react";

interface UpcomingPromotionsProps {
  promotions: Promotion[];
  onEdit?: (promotion: Promotion) => void;
  onView?: (promotion: Promotion) => void;
}

export function UpcomingPromotions({
  promotions,
  onEdit,
  onView,
}: UpcomingPromotionsProps) {
  // Filtrar y ordenar promociones próximas (próximas 30 días)
  const upcomingPromotions = promotions
    .map((promo) => promo as unknown as PromotionCreate)
    .filter((promo) => {
      const now = new Date();
      const startDate = new Date(promo.startDate);
      const diffTime = startDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30; // Próximas 30 días
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 10); // Mostrar máximo 10

  // Formatear fecha relativa
  const formatRelativeDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays <= 7) return `En ${diffDays} días`;
    if (diffDays <= 30) return `En ${diffDays} días`;
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  // Obtener prioridad de la promoción
  const getPromotionPriority = (promo: PromotionCreate) => {
    const now = new Date();
    const startDate = new Date(promo.startDate);
    const diffTime = startDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "urgent";
    if (diffDays <= 3) return "high";
    if (diffDays <= 7) return "medium";
    return "low";
  };

  // Obtener color según prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-primary";
    }
  };

  // Formatear valor del descuento
  const formatDiscountValue = (promo: PromotionCreate) => {
    if (promo.discountPercent) {
      return `${promo.discountPercent}%`;
    }
    if (promo.discountValue) {
      return `€${promo.discountValue}`;
    }
    return "Especial";
  };

  if (upcomingPromotions.length === 0) {
    return (
      <AdminCard
        title="Promociones Próximas"
        contentClassName="p-8 text-center"
        titleClassName="text-xl px-5 py-4"
        headerClassName="pb-0 pt-4 px-5"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              No hay promociones próximas
            </h3>
            <p className="text-sm text-muted-foreground">
              No tienes promociones programadas para los próximos 30 días
            </p>
          </div>
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard
      title={`Promociones Próximas (${upcomingPromotions.length})`}
      contentClassName="p-0"
      titleClassName="text-xl px-5 py-4"
      headerClassName="pb-0 pt-4 px-5"
      className="overflow-hidden"
    >
      <ul className="divide-y divide-border max-h-96 overflow-y-auto">
        {upcomingPromotions.map((promo) => {
          const priority = getPromotionPriority(promo);
          const priorityColor = getPriorityColor(priority);
          const isActive = promo.active;
          const originalPromo = promotions.find(
            (p) => (p as unknown as PromotionCreate).name === promo.name
          );

          return (
            <li
              key={originalPromo?.id || promo.name}
              className={cn(
                "py-4 px-5 hover:bg-primary/5 transition-colors",
                "border-l-2",
                priority === "urgent"
                  ? "border-l-red-500"
                  : priority === "high"
                  ? "border-l-orange-500"
                  : priority === "medium"
                  ? "border-l-yellow-500"
                  : "border-l-blue-500"
              )}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Header con nombre y estado */}
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={cn("font-medium truncate", priorityColor)}>
                      {promo.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      {isActive ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge
                        variant={isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {isActive ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>
                  </div>

                  {/* Información del descuento */}
                  <div className="flex items-center gap-4 mb-2 text-sm">
                    <div className="flex items-center gap-1">
                      {promo.discountPercent ? (
                        <Percent className="h-4 w-4 text-rojo" />
                      ) : (
                        <Euro className="h-4 w-4 text-rojo" />
                      )}
                      <span className="font-medium text-rojo">
                        {formatDiscountValue(promo)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground capitalize">
                        {promo.type}
                      </span>
                    </div>
                  </div>

                  {/* Fecha de inicio */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Inicia: {formatRelativeDate(promo.startDate)}</span>
                  </div>

                  {/* Código promocional si existe */}
                  {promo.code && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {promo.code}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onView(promo as unknown as Promotion)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => onEdit(promo as unknown as Promotion)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Indicador de urgencia */}
                  {priority === "urgent" && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />
                      <span className="text-xs text-red-600 font-medium">
                        Urgente
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminCard>
  );
}
