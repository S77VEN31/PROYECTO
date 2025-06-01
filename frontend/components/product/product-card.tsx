"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "colori-platform-shared";
import { Clock, Info, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  // Verificar si el producto está activo
  const isActive = () => {
    return product.active !== false;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-rojo/20 hover:border-rojo/50">
      <div className="relative h-48 w-full">
        <Image
          src={
            product.backgroundImages?.[0]?.src ||
            "/placeholder-product.jpg"
          }
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-2 right-2">
          <Badge variant={isActive() ? "naranja" : "destructive"}>
            {isActive() ? "Disponible" : "No disponible"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">
          {product.name}
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2 text-sm">
          {product.description}
        </CardDescription>

        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-rojo" />
            <span>{formatPrice(product.price)}</span>
          </div>

          {product.preparationTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-rojo" />
              <span>Tiempo de preparación: {product.preparationTime} min</span>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {onSelect ? (
          <Button 
            variant="rojo" 
            size="sm" 
            className="w-full"
            onClick={() => onSelect(product)}
          >
            <Info className="mr-2 h-4 w-4" />
            Seleccionar
          </Button>
        ) : (
          <Button variant="rojo" size="sm" className="w-full" asChild>
            <Link href={`/client/product/${product.id}`}>
              <Info className="mr-2 h-4 w-4" />
              Ver detalles
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
