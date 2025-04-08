"use client";

import { Promotion } from "@/data/mock/promotions";
import { PromotionCard } from "./promotion-card";

interface PromotionsGridProps {
  promotions: Promotion[];
  showInactive?: boolean;
}

export function PromotionsGrid({
  promotions,
  showInactive = false,
}: PromotionsGridProps) {
  // Filtrar promociones según el estado activo
  const filteredPromotions = showInactive
    ? promotions
    : promotions.filter((promo) => {
        const now = new Date();
        const startDate = new Date(promo.startDate);
        const endDate = new Date(promo.endDate);
        return now >= startDate && now <= endDate && promo.active;
      });

  // Si no hay promociones para mostrar
  if (filteredPromotions.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium text-muted-foreground">
          {showInactive
            ? "No hay promociones disponibles"
            : "No hay promociones activas en este momento"}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {showInactive
            ? "Vuelve a consultar más tarde para nuevas ofertas"
            : "Revisa más tarde para nuevas promociones o consulta las ofertas pasadas"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPromotions.map((promotion) => (
        <PromotionCard key={promotion.id} promotion={promotion} />
      ))}
    </div>
  );
}
