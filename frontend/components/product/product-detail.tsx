"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  cn,
  getAllergenBadgeClass,
  getCategoryFromProduct,
  getVariantBadgeClass,
  getVariantBorderClass,
  getVariantIconColorClass,
  getVariantNutritionalClass,
  getVariantTagClass,
} from "@/lib/utils";
import { CategoryVariant, Product } from "colori-platform-shared";
import {
  AlertTriangle,
  Clock,
  Droplets,
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  Tag,
  Utensils,
  Wheat,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (id: string, quantity: number) => void;
  currentCategory?: string;
  categoryVariant?: CategoryVariant;
}

export function ProductDetail({
  product,
  onAddToCart,
  currentCategory,
  categoryVariant = CategoryVariant.DEFAULT,
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

  // Función para formatear el precio en colones
  const formatPrice = (price: number) => {
    return `₡${price.toFixed(0)}`;
  };

  // Get the primary image or first image from backgroundImages
  const productImage =
    product.backgroundImages?.find((img) => img.isPrimary)?.src ||
    product.backgroundImages?.[0]?.src ||
    "/logo.jpg";

  // Check if product is available (active)
  const isAvailable = product.active ?? true;

  // Obtener información de la categoría para estilos consistentes usando utils
  const categoryData = getCategoryFromProduct(product.id);
  const effectiveVariant = categoryVariant || categoryData.variant;

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 shadow-lg transition-all duration-300",
        getVariantBorderClass(effectiveVariant, "normal")
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Imagen del producto */}
        <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
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
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="px-6 py-3 text-base font-semibold"
              >
                No Disponible
              </Badge>
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        <CardContent className="p-6 md:p-8 flex flex-col h-full space-y-6">
          {/* Header con categoría y precio */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-3",
                    getVariantBadgeClass(effectiveVariant)
                  )}
                >
                  {currentCategory || categoryData.name || "Sin categoría"}
                </div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">
                  {product.name}
                </h1>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg",
                  getVariantTagClass(effectiveVariant)
                )}
              >
                <span className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            {/* Tiempo de preparación */}
            {product.preparationTime && (
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <div
                  className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-sm mr-2",
                    getVariantTagClass(effectiveVariant)
                  )}
                >
                  <Clock
                    className={cn(
                      "h-3 w-3",
                      getVariantIconColorClass(effectiveVariant)
                    )}
                  />
                </div>
                <span>
                  Tiempo de preparación: {product.preparationTime} minutos
                </span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-3 text-foreground">Descripción</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              {product.longDescription &&
                product.longDescription !== product.description && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">
                      Descripción Detallada
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.longDescription}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Información nutricional mejorada usando utils */}
          {product.nutritionalInfo && (
            <div>
              <h3 className="font-semibold mb-4 text-foreground">
                Información Nutricional
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.nutritionalInfo.calories !== undefined && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Zap
                      className={cn(
                        "h-5 w-5 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-lg font-bold">
                      {product.nutritionalInfo.calories}
                    </p>
                    <p className="text-xs opacity-75">Calorías</p>
                  </div>
                )}
                {product.nutritionalInfo.protein !== undefined && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Utensils
                      className={cn(
                        "h-5 w-5 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-lg font-bold">
                      {product.nutritionalInfo.protein}g
                    </p>
                    <p className="text-xs opacity-75">Proteínas</p>
                  </div>
                )}
                {product.nutritionalInfo.carbs !== undefined && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Wheat
                      className={cn(
                        "h-5 w-5 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-lg font-bold">
                      {product.nutritionalInfo.carbs}g
                    </p>
                    <p className="text-xs opacity-75">Carbohidratos</p>
                  </div>
                )}
                {product.nutritionalInfo.fat !== undefined && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Droplets
                      className={cn(
                        "h-5 w-5 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-lg font-bold">
                      {product.nutritionalInfo.fat}g
                    </p>
                    <p className="text-xs opacity-75">Grasas</p>
                  </div>
                )}
              </div>

              {/* Alérgenos con estilo consistente usando utils */}
              {product.nutritionalInfo.allergens &&
                product.nutritionalInfo.allergens.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-[var(--color-cancellation)]" />
                      <h4 className="font-semibold text-foreground">
                        Alérgenos
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.nutritionalInfo.allergens.map(
                        (allergen, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={cn(
                              "text-sm px-3 py-1",
                              getAllergenBadgeClass()
                            )}
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

          {/* Tags del producto usando utils */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-sm",
                    getVariantTagClass(effectiveVariant)
                  )}
                >
                  <Tag
                    className={cn(
                      "h-3 w-3",
                      getVariantIconColorClass(effectiveVariant)
                    )}
                  />
                </div>
                <h4 className="font-semibold text-foreground">Tags</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={cn(
                      "text-sm px-3 py-1",
                      getVariantTagClass(effectiveVariant)
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Acciones de compra mejoradas usando utils */}
          <div className="mt-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground">Cantidad</div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 border-2 transition-all duration-200",
                    "hover:border-transparent",
                    getVariantBadgeClass(effectiveVariant),
                    quantity <= 1 && "opacity-50"
                  )}
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 border-2 transition-all duration-200",
                    "hover:border-transparent",
                    getVariantBadgeClass(effectiveVariant)
                  )}
                  onClick={handleIncreaseQuantity}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                getVariantNutritionalClass(effectiveVariant)
              )}
            >
              <div className="font-bold text-lg">
                Total: {formatPrice(product.price * quantity)}
              </div>
              <Button
                className={cn(
                  "px-8 py-3 font-semibold",
                  getVariantBadgeClass(effectiveVariant),
                  "hover:opacity-90 transition-all duration-200",
                  !isAvailable && "opacity-50 cursor-not-allowed"
                )}
                size="lg"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAvailable ? "Añadir al carrito" : "No disponible"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
