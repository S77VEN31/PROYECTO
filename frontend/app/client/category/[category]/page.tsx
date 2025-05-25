"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mockCategories, mockProducts } from "@/data/mock";
import { getVariantIconClass } from "@/lib/utils";
import { Category } from "@/types/category";
import { Product } from "@/types/products";
import { ChevronLeft, Coffee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo } from "react";

// Función para generar una URL de imagen confiable de Unsplash según el producto
const getProductImageUrl = (product: Product, category?: Category): string => {
  if (product.imageSrc && product.imageSrc.startsWith("http")) {
    return product.imageSrc;
  }

  // Palabras clave basadas en el nombre del producto
  const nameKeywords = product.name.toLowerCase().replace(/\s+/g, "-");

  // Obtener el término de búsqueda de la categoría
  const categoryTerm = category?.searchTerm || "food";

  // URL completa de Unsplash con parámetros específicos para imágenes de mayor calidad
  return `https://source.unsplash.com/featured/800x600/?${categoryTerm},${nameKeywords},food`;
};

// Función para convertir slugs a categoría
const findCategoryBySlug = (slug: string): Category | undefined => {
  return mockCategories.find((cat) => cat.slug === slug);
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const router = useRouter();

  // Manejar los parámetros de forma segura usando React.use()
  const unwrappedParams = use(params);
  const categorySlug = unwrappedParams.category;

  // Buscar la categoría por slug
  const currentCategory = useMemo(() => {
    if (!categorySlug) return undefined;
    return findCategoryBySlug(categorySlug);
  }, [categorySlug]);

  // Para depuración: log cuando la categoría no se encuentra
  useEffect(() => {
    if (categorySlug && !currentCategory) {
      console.warn(`Categoría no encontrada para slug: "${categorySlug}"`);
      console.warn(
        "Categorías disponibles:",
        mockCategories.map((c) => c.slug)
      );
    }
  }, [categorySlug, currentCategory]);

  // Filtrar productos por categoría
  const categoryProducts = useMemo(() => {
    if (!currentCategory) return [];

    // Filtrar los productos del array mockProducts por categoría
    return mockProducts.filter((product) => {
      // Determinar si el producto pertenece a esta categoría
      if (!product.categories || !product.categories.length) return false;

      return (
        product.categories.some(
          (cat) =>
            (typeof cat === "object" &&
              cat !== null &&
              cat.id === currentCategory.id) ||
            (typeof cat === "string" &&
              (cat === currentCategory.id || cat === currentCategory.name))
        ) && product.available
      );
    });
  }, [currentCategory]);

  // Si no encuentra la categoría, redirigir a la página principal
  if (!currentCategory) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Categoría no encontrada
        </h1>
        <p className="text-center mb-4 text-muted-foreground">
          No se pudo encontrar la categoría &quot;{categorySlug}&quot;. Por
          favor, elige otra categoría.
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/client")}>
            Volver al menú principal
          </Button>
        </div>
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          No hay productos disponibles en esta categoría
        </h1>
        <p className="text-center mb-4 text-muted-foreground">
          La categoría &quot;{currentCategory.name}&quot; está vacía o los
          productos no están disponibles.
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/client")}>
            Volver al menú principal
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = currentCategory.icon || Coffee;

  const handleSelectProduct = (product: Product) => {
    router.push(`/client/product/${product.id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header personalizado */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between">
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link href="/client">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Regresar
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <IconComponent
              className={getVariantIconClass(currentCategory.variant, "md")}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {currentCategory.description}
          </p>
        </div>
      </div>

      <div className="w-full relative my-8">
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {categoryProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1">
                    <Card
                      className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={
                            product.imageSrc ||
                            getProductImageUrl(product, currentCategory)
                          }
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {product.description}
                        </p>
                        <div className="font-semibold">
                          ${product.price.toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
              <CarouselPrevious />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
              <CarouselNext />
            </div>
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
