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
  CATEGORY_ICON_MAP,
  getButtonVariantFromCategory,
  getCategoryIconClass,
  getVariantBorderStyle,
} from "@/lib/utils";
import { Category } from "colori-platform-shared";
import { Coffee, LucideIcon } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  href?: string;
}

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

  // Obtener el componente de icono según el valor de icon (string o componente)
  let IconComponent: LucideIcon = Coffee; // Valor por defecto

  if (typeof icon === "string") {
    // Si icon es un string, intentar obtener el componente del mapa de iconos
    IconComponent =
      CATEGORY_ICON_MAP[icon as keyof typeof CATEGORY_ICON_MAP] || Coffee;
  } else if (icon) {
    // Si icon ya es un componente LucideIcon
    IconComponent = icon;
  }

  return (
    <Card
      className={`h-full flex flex-col transition-all duration-300 hover:shadow-md overflow-hidden ${getVariantBorderStyle(
        variant
      )}`}
    >
      <CardContent className="pt-8 pb-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="mb-6 flex items-center justify-center">
          <IconComponent className={getCategoryIconClass(variant, "lg")} />
        </div>
        <CardTitle className="text-xl font-bold text-center mb-3">
          {name}
        </CardTitle>
        <CardDescription className="text-center text-sm leading-relaxed flex-1 flex items-center justify-center">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6 pt-2 relative z-10">
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
          className="w-full max-w-[140px]"
        >
          <Link href={categoryHref}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
