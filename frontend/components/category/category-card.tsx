"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  getButtonVariantFromCategory,
  getVariantBorderStyle,
  getVariantIconClass,
} from "@/lib/utils";
import { Category } from "colori-platform-shared";
import {
  Coffee,
  LucideIcon,
  ShoppingBag,
  Tag,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  href?: string;
}

// Mapeo de iconos de string a componentes Lucide
const iconMap: Record<string, LucideIcon> = {
  "entradas.png": UtensilsCrossed,
  "image.png": Coffee,
  tag: Tag,
  "shopping-bag": ShoppingBag,
  coffee: Coffee,
  utensils: UtensilsCrossed,
};

export function CategoryCard({ category, href }: CategoryCardProps) {
  // Si category es undefined, mostrar un mensaje o usar valores predeterminados
  if (!category) {
    return (
      <Card className="transition-all duration-300 hover:shadow-md overflow-hidden border-gray-200">
        <CardContent className="pt-6 relative z-10">
          <div className="mb-4 flex items-center justify-center">
            <Coffee className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl font-bold text-center">
            Categoría no disponible
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Esta categoría no existe o no está disponible actualmente
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const { name, description, slug, icon, variant } = category;
  const categoryHref = href || `/client/category/${slug}`;
  const buttonVariant = getButtonVariantFromCategory(variant);

  // Obtener el componente de icono
  const IconComponent = iconMap[icon] || Coffee;

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md overflow-hidden ${getVariantBorderStyle(
        variant
      )}`}
    >
      <CardContent className="pt-6 relative z-10">
        <div className="mb-4 flex items-center justify-center">
          <IconComponent className={getVariantIconClass(variant, "lg")} />
        </div>
        <CardTitle className="text-xl font-bold text-center">{name}</CardTitle>
        <CardDescription className="text-center mt-2">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6 relative z-10">
        <Button
          asChild
          variant={
            buttonVariant as
              | "coffee"
              | "skyblue"
              | "orange"
              | "red"
              | "pink"
              | "default"
          }
        >
          <Link href={categoryHref}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
