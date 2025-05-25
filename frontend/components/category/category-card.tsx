"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { getVariantBorderStyle, getVariantIconClass } from "@/lib/utils";
import { Category, CategoryVariant } from "@/types/category";
import { Coffee } from "lucide-react";
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

  const { name, description, slug, icon: Icon, variant } = category;
  const categoryHref = href || `/client/category/${slug}`;

  // Convertir la variante al tipo CategoryVariant o usar 'default'
  const cardVariant = (variant as CategoryVariant) || "default";

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md overflow-hidden ${getVariantBorderStyle(
        cardVariant
      )}`}
    >
      <CardContent className="pt-6 relative z-10">
        {Icon && (
          <div className="mb-4 flex items-center justify-center">
            <Icon className={getVariantIconClass(cardVariant, "lg")} />
          </div>
        )}
        <CardTitle className="text-xl font-bold text-center">{name}</CardTitle>
        <CardDescription className="text-center mt-2">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6 relative z-10">
        <Button asChild variant={cardVariant}>
          <Link href={categoryHref}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
