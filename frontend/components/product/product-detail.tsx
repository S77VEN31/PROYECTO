"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "colori-platform-shared";
import {
  ArrowLeft,
  Clock,
  Heart,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (id: string, quantity: number) => void;
  onBack?: () => void;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function ProductDetail({
  product,
  onAddToCart,
  onBack,
  onFavorite,
  isFavorite = false,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  // Get the primary image or first image from backgroundImages
  const productImage =
    product.backgroundImages?.find((img) => img.isPrimary)?.src ||
    product.backgroundImages?.[0]?.src ||
    "/logo.jpg";

  // Check if product is available (active)
  const isAvailable = product.active ?? true;

  return (
    <Card className="overflow-hidden border shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Imagen del producto */}
        <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
          {onBack && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 left-4 z-10 bg-background/80 hover:bg-background shadow-sm"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="absolute inset-0">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="px-4 py-2 text-base">
                No Disponible
              </Badge>
            </div>
          )}
          {onFavorite && (
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 left-16 bg-background/80 hover:bg-background"
              onClick={() => onFavorite(product.id)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          )}
        </div>

        {/* Detalles del producto */}
        <CardContent className="p-6 md:p-8 flex flex-col h-full">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.tags && product.tags.length > 0
                    ? product.tags.join(", ")
                    : "Sin categoría"}
                </Badge>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              </div>
              <div className="text-xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
            </div>
            {product.preparationTime && (
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  Tiempo de preparación: {product.preparationTime} min
                </span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-muted-foreground">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Información nutricional */}
          {product.nutritionalInfo && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Información Nutricional</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.nutritionalInfo.calories !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-lg font-semibold">
                      {product.nutritionalInfo.calories}
                    </p>
                    <p className="text-xs text-muted-foreground">Calorías</p>
                  </div>
                )}
                {product.nutritionalInfo.protein !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-lg font-semibold">
                      {product.nutritionalInfo.protein}g
                    </p>
                    <p className="text-xs text-muted-foreground">Proteínas</p>
                  </div>
                )}
                {product.nutritionalInfo.carbs !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-lg font-semibold">
                      {product.nutritionalInfo.carbs}g
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Carbohidratos
                    </p>
                  </div>
                )}
                {product.nutritionalInfo.fat !== undefined && (
                  <div className="bg-muted/50 p-3 rounded-md text-center">
                    <p className="text-lg font-semibold">
                      {product.nutritionalInfo.fat}g
                    </p>
                    <p className="text-xs text-muted-foreground">Grasas</p>
                  </div>
                )}
              </div>

              {product.nutritionalInfo.allergens &&
                product.nutritionalInfo.allergens.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Alérgenos</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.nutritionalInfo.allergens.map(
                        (allergen, index) => (
                          <Badge
                            key={index}
                            variant="destructive"
                            className="text-xs"
                          >
                            {allergen}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="mb-6" />

          {/* Acciones de compra */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium">Cantidad</div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleIncreaseQuantity}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-bold">
                Total: ${(product.price * quantity).toFixed(2)}
              </div>
              <Button
                variant="cafe"
                size="lg"
                className="w-1/2"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAvailable ? "Añadir al pedido" : "No disponible"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
