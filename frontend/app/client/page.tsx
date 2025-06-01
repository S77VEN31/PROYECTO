"use client";

import { CategoryCard } from "@/components/category/category-card";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";
import { ShoppingBag, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ClientHomePage() {
  const { categories, isLoading, error } = useCategories();

  // Crear categorías adicionales personalizadas
  const promotionsCategory: Category = {
    id: "promo",
    name: "Promociones",
    description: "Ofertas especiales y combos",
    active: true,
    displayOrder: 5,
    icon: Tag,
    variant: "rojo",
    slug: "promotions",
    searchTerm: "promotions",
  };

  const cartCategory: Category = {
    id: "cart",
    name: "Ver Pedido Actual",
    description: "Revisa y confirma tu pedido",
    active: true,
    displayOrder: 6,
    icon: ShoppingBag,
    variant: "cafe",
    slug: "cart",
  };

  // Función para renderizar el contenido de categorías
  const renderCategoryContent = () => {
    if (isLoading) {
      // Mostrar esqueletos de carga mientras se cargan las categorías
      return Array.from({ length: 4 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
          <Skeleton className={cn("h-48 w-full rounded-xl", "bg-gray-200 dark:bg-gray-800")} />
          <Skeleton className={cn("h-6 w-3/4", "bg-gray-200 dark:bg-gray-800")} />
          <Skeleton className={cn("h-4 w-full", "bg-gray-200 dark:bg-gray-800")} />
        </div>
      ));
    }

    if (error) {
      return (
        <div className="col-span-full p-4 text-center">
          <p className="text-red-500 mb-2">Error al cargar las categorías</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      );
    }

    return (
      <>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}

        <CategoryCard
          key={promotionsCategory.id}
          category={promotionsCategory}
          href="/client/category/promotions"
        />

        <CategoryCard
          key={cartCategory.id}
          category={cartCategory}
          href="/client/cart"
        />
      </>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Menú de Colori</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {renderCategoryContent()}
      </div>
    </div>
  );
}
