"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Promotion, PromotionCreate } from "colori-platform-shared";
import {
  Calendar,
  Clock,
  Filter,
  Gift,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { PromotionCard } from "./promotion-card";

interface PromotionsGridProps {
  promotions: Promotion[];
  showInactive?: boolean;
  title?: string;
  subtitle?: string;
}

export function PromotionsGrid({
  promotions,
  showInactive = false,
  title,
  subtitle,
}: PromotionsGridProps) {
  const [sortBy, setSortBy] = useState<"date" | "discount" | "name">("date");

  // Filtrar promociones según el estado activo
  const filteredPromotions = showInactive
    ? promotions
    : promotions.filter((promo) => {
        const promotionData = promo as unknown as PromotionCreate;
        const now = new Date();
        const endDate = new Date(promotionData.endDate);

        // Excluir promociones desactivadas
        if (!promotionData.active) {
          return false;
        }

        // Incluir promociones futuras y activas, excluir solo las expiradas
        return now <= endDate;
      });

  // Ordenar promociones
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    const aData = a as unknown as PromotionCreate;
    const bData = b as unknown as PromotionCreate;

    switch (sortBy) {
      case "date":
        return (
          new Date(aData.endDate).getTime() - new Date(bData.endDate).getTime()
        );
      case "discount":
        const aDiscount = aData.discountPercent || aData.discountValue || 0;
        const bDiscount = bData.discountPercent || bData.discountValue || 0;
        return bDiscount - aDiscount;
      case "name":
        return aData.name.localeCompare(bData.name);
      default:
        return 0;
    }
  });

  // Calcular estadísticas
  const getPromotionStats = () => {
    const now = new Date();
    let activeCount = 0;
    let upcomingCount = 0;
    let expiringSoonCount = 0;

    filteredPromotions.forEach((promo) => {
      const promotionData = promo as unknown as PromotionCreate;
      const startDate = new Date(promotionData.startDate);
      const endDate = new Date(promotionData.endDate);

      if (!promotionData.active) return;

      if (now < startDate) {
        upcomingCount++;
      } else if (now >= startDate && now <= endDate) {
        activeCount++;

        // Verificar si expira pronto
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 3 && diffDays > 0) {
          expiringSoonCount++;
        }
      }
    });

    return { activeCount, upcomingCount, expiringSoonCount };
  };

  const stats = getPromotionStats();

  // Si no hay promociones para mostrar
  if (filteredPromotions.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header si se proporciona */}
        {(title || subtitle) && (
          <div className="text-center space-y-2">
            {title && (
              <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Estado vacío mejorado */}
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              {showInactive ? (
                <Search className="h-12 w-12 text-muted-foreground" />
              ) : (
                <Gift className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {showInactive
                ? "No hay promociones disponibles"
                : "No hay promociones activas"}
            </h3>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {showInactive
                ? "Actualmente no tenemos promociones disponibles. Vuelve a consultar más tarde para nuevas ofertas especiales."
                : "No hay promociones activas en este momento. Revisa más tarde para nuevas ofertas o consulta nuestro historial de promociones."}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Clock className="mr-1 h-4 w-4" />
                Próximamente
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Sparkles className="mr-1 h-4 w-4" />
                Ofertas especiales
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con título y estadísticas */}
      <div className="space-y-4">
        {(title || subtitle) && (
          <div className="text-center space-y-2">
            {title && (
              <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Estadísticas y controles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Estadísticas */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-sm">
              <TrendingUp className="mr-1 h-4 w-4" />
              {filteredPromotions.length} promociones
            </Badge>

            {!showInactive && stats.activeCount > 0 && (
              <Badge
                variant="default"
                className="text-sm bg-green-600 hover:bg-green-700 text-white"
              >
                <Sparkles className="mr-1 h-4 w-4" />
                {stats.activeCount} activas
              </Badge>
            )}

            {!showInactive && stats.upcomingCount > 0 && (
              <Badge
                variant="secondary"
                className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Calendar className="mr-1 h-4 w-4" />
                {stats.upcomingCount} próximamente
              </Badge>
            )}

            {stats.expiringSoonCount > 0 && (
              <Badge variant="destructive" className="text-sm animate-pulse">
                <Clock className="mr-1 h-4 w-4" />
                {stats.expiringSoonCount} expiran pronto
              </Badge>
            )}
          </div>

          {/* Controles de ordenación */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex rounded-lg border border-input bg-background">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-r-none border-r",
                  sortBy === "date" && "bg-muted"
                )}
                onClick={() => setSortBy("date")}
              >
                <Calendar className="mr-1 h-4 w-4" />
                Fecha
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none border-r",
                  sortBy === "discount" && "bg-muted"
                )}
                onClick={() => setSortBy("discount")}
              >
                <TrendingUp className="mr-1 h-4 w-4" />
                Descuento
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-l-none",
                  sortBy === "name" && "bg-muted"
                )}
                onClick={() => setSortBy("name")}
              >
                Nombre
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de promociones con animación */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPromotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className="animate-in fade-in-0 slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <PromotionCard promotion={promotion} />
          </div>
        ))}
      </div>

      {/* Footer con información adicional */}
      {filteredPromotions.length > 0 && (
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {showInactive
              ? `Mostrando ${filteredPromotions.length} promociones en total`
              : `Mostrando ${filteredPromotions.length} promociones activas`}
          </p>
          {!showInactive && stats.expiringSoonCount > 0 && (
            <p className="text-sm text-destructive mt-1">
              ⚡ {stats.expiringSoonCount} promociones expiran en los próximos 3
              días
            </p>
          )}
        </div>
      )}
    </div>
  );
}
