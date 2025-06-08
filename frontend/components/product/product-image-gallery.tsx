"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "colori-platform-shared";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ProductImageGalleryProps {
  images: ImageType[];
  productName: string;
  isAvailable?: boolean;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

/**
 * Product Image Gallery Component
 * Displays product images in a carousel using Embla Carousel with autoplay
 * @param props - Component props
 * @returns JSX element
 */
export function ProductImageGallery({
  images,
  productName,
  isAvailable = true,
  className,
  autoplay = true,
  autoplayDelay = 4000,
}: ProductImageGalleryProps): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
    },
    autoplay
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
      : []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full h-full min-h-[300px] md:min-h-[500px]",
          className
        )}
      >
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-muted-foreground/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Sin imágenes disponibles
            </p>
            <p className="text-muted-foreground/70 text-xs mt-1">
              {productName}
            </p>
          </div>
        </div>
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <Badge
              variant="destructive"
              className="px-6 py-3 text-base font-semibold"
            >
              No Disponible
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div
        className={cn(
          "relative w-full h-full min-h-[300px] md:min-h-[500px]",
          className
        )}
      >
        <div className="absolute inset-0">
          <Image
            src={images[0].src}
            alt={images[0].alt || productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <Badge
              variant="destructive"
              className="px-6 py-3 text-base font-semibold"
            >
              No Disponible
            </Badge>
          </div>
        )}
      </div>
    );
  }

  // Multiple images - show Embla carousel
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[300px] md:min-h-[500px] overflow-hidden",
        className
      )}
    >
      <div className="embla h-full relative" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] h-full relative"
            >
              <div className="relative h-full min-h-[300px] md:min-h-[500px]">
                <Image
                  src={image.src}
                  alt={image.alt || `${productName} - Imagen ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[5] bg-white/80 hover:bg-white/90 rounded-full p-1.5 md:p-2 shadow-md transition-colors backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[5] bg-white/80 hover:bg-white/90 rounded-full p-1.5 md:p-2 shadow-md transition-colors backdrop-blur-sm"
        onClick={scrollNext}
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-[5]">
        <Badge
          variant="secondary"
          className="bg-black/70 text-white border-white/20 text-xs md:text-sm backdrop-blur-sm"
        >
          {selectedIndex + 1} / {images.length}
        </Badge>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-[5]">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors backdrop-blur-sm",
                index === selectedIndex
                  ? "bg-white shadow-sm"
                  : "bg-white/50 hover:bg-white/70"
              )}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Availability Overlay */}
      {!isAvailable && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[10]">
          <Badge
            variant="destructive"
            className="px-6 py-3 text-base font-semibold"
          >
            No Disponible
          </Badge>
        </div>
      )}
    </div>
  );
}
