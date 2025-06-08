"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { CartItem } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ShoppingCart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CartItemCard } from "./cart-item-card";

interface CartListProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  maxHeight?: string;
}

/**
 * Componente que muestra la lista de items del carrito en un carousel vertical infinito
 * @param props - Propiedades del componente
 * @returns JSX element
 */
export function CartList({
  items,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
  maxHeight = "400px",
}: CartListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      dragFree: false,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
        title="Tu carrito está vacío"
        description="Agrega algunos productos del menú para empezar tu pedido."
        actionLabel="Ver Menú"
        actionHref="/client"
      />
    );
  }

  // Si hay 3 o menos items, mostrar lista normal sin carousel
  if (items.length <= 3) {
    return (
      <div className="space-y-4 px-2">
        {items.map((item) => (
          <CartItemCard
            key={item.productId}
            item={item}
            onRemove={onRemoveItem}
            onIncrease={onIncreaseQuantity}
            onDecrease={onDecreaseQuantity}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden" style={{ height: maxHeight }}>
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex flex-col">
            {items.map((item) => (
              <div
                key={item.productId}
                className="embla__slide flex-[0_0_auto] px-2 pb-4"
              >
                <CartItemCard
                  item={item}
                  onRemove={onRemoveItem}
                  onIncrease={onIncreaseQuantity}
                  onDecrease={onDecreaseQuantity}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fade effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-5" />
      </div>

      {/* Dot Indicators */}
      {items.length > 1 && (
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
              aria-label={`Ir a producto ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Item Counter */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-border/30 shadow-sm">
          <ShoppingCart className="h-4 w-4" />
          <span>
            {selectedIndex + 1} de {items.length} productos
          </span>
        </div>
      </div>
    </div>
  );
}
