"use client";

import { CategoryCard } from "@/components/category/category-card";
import { mockCategories } from "@/data/mock";
import { Category } from "@/types/category";
import { ShoppingBag, Tag } from "lucide-react";

export default function ClientHomePage() {
  // Filtrar sólo categorías activas
  const activeCategories = mockCategories.filter((category) => category.active);

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Menú de Colori</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {activeCategories.map((category) => (
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
      </div>
    </div>
  );
}
