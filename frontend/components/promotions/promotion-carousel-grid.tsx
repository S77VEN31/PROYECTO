"use client";

import { PromotionCard } from "@/components/promotions/promotion-card";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Promotion } from "colori-platform-shared";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface PromotionCarouselGridProps {
  promotions: Promotion[];
  onSelectPromotion?: (promotion: Promotion) => void;
  showInactive?: boolean;
  className?: string;
  scrollThreshold?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  switchComponent?: React.ReactNode;
}

/**
 * Componente que muestra promociones en carousel inicialmente
 * y se transforma en grid cuando el usuario hace scroll
 * @param props - Propiedades del componente
 * @returns JSX element
 */
export function PromotionCarouselGrid({
  promotions,
  onSelectPromotion,
  showInactive = false,
  className,
  scrollThreshold = 300,
  autoplay = true,
  autoplayDelay = 4000,
  switchComponent,
}: PromotionCarouselGridProps): React.JSX.Element {
  const { isScrolled } = useScroll(scrollThreshold);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      align: "start",
    },
    autoplay && !isScrolled
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
      : []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Filtrar promociones según el estado activo
  const filteredPromotions = showInactive
    ? promotions
    : promotions.filter((promotion) => {
        // Si showInactive es false, mostrar promociones activas Y futuras
        // Solo excluir las inactivas (active: false) y expiradas
        const now = new Date();
        const endDate = new Date(promotion.endDate);

        // Excluir promociones desactivadas
        if (!promotion.active) {
          return false;
        }

        // Incluir promociones futuras y activas, excluir solo las expiradas
        return now <= endDate;
      });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Detener autoplay cuando se cambia a grid
  useEffect(() => {
    if (isScrolled && emblaApi) {
      // Reinicializar el carousel sin autoplay cuando se hace scroll
      emblaApi.reInit({
        loop: true,
        dragFree: false,
        align: "start",
      });
    }
  }, [isScrolled, emblaApi]);

  // Si no hay promociones, mostrar mensaje vacío
  if (filteredPromotions.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">
          {showInactive
            ? "No hay promociones disponibles en este momento."
            : "No hay promociones activas en este momento."}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full relative", className)}>
      {/* Carousel Mode */}
      <div
        className={cn(
          "w-full transition-all duration-700 ease-out relative px-2 sm:px-4 md:px-12",
          !isScrolled
            ? "opacity-100 translate-y-0 relative z-10"
            : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none z-0"
        )}
      >
        <div className="embla overflow-hidden mx-auto" ref={emblaRef}>
          <div className="embla__container flex">
            {filteredPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className="embla__slide flex-[0_0_100%] xs:flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-3 min-w-0 flex justify-center"
              >
                <div className="h-full w-full max-w-[260px] sm:max-w-[280px]">
                  <PromotionCard
                    promotion={promotion}
                    onSelect={onSelectPromotion}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {filteredPromotions.length > 1 && (
          <div className="flex justify-center mt-4 gap-1.5 md:gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20",
                  index === selectedIndex
                    ? "bg-rojo shadow-sm scale-110"
                    : "bg-rojo/60 opacity-60 hover:opacity-80 hover:scale-105"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir a promoción ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Indicador de scroll */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-rojo animate-pulse"></div>
              <span>Desliza hacia abajo para ver todas las promociones</span>
            </div>
            {switchComponent && (
              <div className="flex-shrink-0">{switchComponent}</div>
            )}
          </div>
        </div>
      </div>

      {/* Grid Mode */}
      <div
        className={cn(
          "w-full transition-all duration-700 ease-out",
          isScrolled
            ? "opacity-100 translate-y-0 relative z-10"
            : "opacity-0 -translate-y-8 absolute inset-0 pointer-events-none z-0"
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPromotions.map((promotion) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onSelect={onSelectPromotion}
            />
          ))}
        </div>

        {/* Indicador de modo grid */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
              <div className="w-2 h-2 rounded-full bg-rojo"></div>
              <span>Vista de cuadrícula - Todas las promociones</span>
            </div>
            {switchComponent && (
              <div className="flex-shrink-0">{switchComponent}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
