"use client";

import { CategoryCard } from "@/components/category/category-card";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Category } from "colori-platform-shared";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface CategoryCarouselGridProps {
  categories: Category[];
  className?: string;
  scrollThreshold?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  additionalCategories?: Array<{
    category: Category;
    href?: string;
  }>;
}

/**
 * Componente que muestra categorías en carousel inicialmente
 * y se transforma en grid cuando el usuario hace scroll
 * @param props - Propiedades del componente
 * @returns JSX element
 */
export function CategoryCarouselGrid({
  categories,
  className,
  scrollThreshold = 100,
  autoplay = true,
  autoplayDelay = 6000,
  additionalCategories = [],
}: CategoryCarouselGridProps): React.JSX.Element {
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

  // Combinar categorías principales con adicionales
  const allCategories: Array<{ category: Category; href?: string }> = [
    ...categories.map((cat) => ({ category: cat })),
    ...additionalCategories,
  ];

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

  // Si no hay categorías, mostrar mensaje vacío
  if (allCategories.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">No hay categorías disponibles.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full relative min-h-[60vh] flex flex-col justify-center",
        className
      )}
    >
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
            {allCategories.map((item) => (
              <div
                key={item.category.id}
                className="embla__slide flex-[0_0_100%] xs:flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-4 sm:px-6 min-w-0 flex justify-center"
              >
                <div className="h-full w-full max-w-[280px] sm:max-w-[320px] max-h-[380px] min-h-[320px]">
                  <CategoryCard category={item.category} href={item.href} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {allCategories.length > 1 && (
          <div className="flex justify-center mt-4 gap-1.5 md:gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20",
                  index === selectedIndex
                    ? "bg-primary shadow-sm scale-110"
                    : "bg-primary/30 hover:bg-primary/50 opacity-60 hover:opacity-80 hover:scale-105"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir a categoría ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Indicador de scroll */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Desliza hacia abajo para ver todas las categorías</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
          {allCategories.map((item) => (
            <div
              key={`grid-${item.category.id}`}
              className="w-full max-w-[320px] max-h-[380px] min-h-[320px] mx-auto"
            >
              <CategoryCard category={item.category} href={item.href} />
            </div>
          ))}
        </div>

        {/* Indicador de modo grid */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Mostrando todas las categorías ({allCategories.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
