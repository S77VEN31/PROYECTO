"use client";

import { ProductCard } from "@/components/product/product-card";
import { useScroll } from "@/hooks/use-scroll";
import {
  cn,
  getCategoryIconColorClass,
  getVariantBadgeClass,
} from "@/lib/utils";
import { CategoryVariant, Product } from "colori-platform-shared";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface ProductCarouselGridProps {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  showInactive?: boolean;
  categoryVariant?: CategoryVariant;
  className?: string;
  scrollThreshold?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
}

/**
 * Componente que muestra productos en carousel inicialmente
 * y se transforma en grid cuando el usuario hace scroll
 * @param props - Propiedades del componente
 * @returns JSX element
 */
export function ProductCarouselGrid({
  products,
  onSelectProduct,
  showInactive = true,
  categoryVariant = CategoryVariant.DEFAULT,
  className,
  scrollThreshold = 300,
  autoplay = true,
  autoplayDelay = 4000,
}: ProductCarouselGridProps): React.JSX.Element {
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

  // Filtrar productos inactivos si showInactive es false
  const filteredProducts = showInactive
    ? products
    : products.filter((product) => product.active !== false);

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

  // Si no hay productos, mostrar mensaje vacío
  if (filteredProducts.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <p className="text-muted-foreground">
          No hay productos disponibles en esta categoría.
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="embla__slide flex-[0_0_100%] xs:flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-3 min-w-0 flex justify-center"
              >
                <div className="h-full w-full max-w-[260px] sm:max-w-[280px]">
                  <ProductCard
                    product={product}
                    onSelect={onSelectProduct}
                    categoryVariant={categoryVariant}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        {filteredProducts.length > 1 && (
          <div className="flex justify-center mt-4 gap-1.5 md:gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20",
                  index === selectedIndex
                    ? cn(
                        "shadow-sm scale-110",
                        getVariantBadgeClass(categoryVariant)
                      )
                    : cn(
                        "opacity-60 hover:opacity-80 hover:scale-105",
                        getVariantBadgeClass(categoryVariant)
                      )
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir a producto ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Indicador de scroll */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
            <div
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                getCategoryIconColorClass(categoryVariant)
              )}
            ></div>
            <span>Desliza hacia abajo para ver todos los productos</span>
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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              categoryVariant={categoryVariant}
            />
          ))}
        </div>

        {/* Indicador de modo grid */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                getCategoryIconColorClass(categoryVariant)
              )}
            ></div>
            <span>
              Mostrando todos los productos ({filteredProducts.length})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
