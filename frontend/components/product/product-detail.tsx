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
import { useState } from "react";
import { ProductImageGallery } from "./product-image-gallery";

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

  // Check if product is available (active)
  const isAvailable = product.active ?? true;

  // Obtener información de la categoría para estilos consistentes usando utils
  const categoryData = getCategoryFromProduct(product.id);
  const effectiveVariant = categoryVariant || categoryData.variant;

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 shadow-lg transition-all duration-300 h-full",
        getVariantBorderClass(effectiveVariant, "normal")
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Galería de imágenes del producto */}
        <ProductImageGallery
          images={product.backgroundImages || []}
          productName={product.name}
          isAvailable={isAvailable}
        />

        {/* Detalles del producto */}
        <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col h-full space-y-2 sm:space-y-3">
          {/* Header con categoría y precio */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mb-1",
                    getVariantBadgeClass(effectiveVariant)
                  )}
                >
                  {currentCategory || categoryData.name || "Sin categoría"}
                </div>
                <h1 className="text-lg sm:text-xl font-bold mb-1 text-foreground break-words">
                  {product.name}
                </h1>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg shrink-0 self-start",
                  getVariantTagClass(effectiveVariant)
                )}
              >
                <span className="text-lg sm:text-xl font-bold whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            {/* Tiempo de preparación */}
            {product.preparationTime && (
              <div className="flex items-center text-sm text-muted-foreground mb-1 flex-wrap">
                <div
                  className={cn(
                    "flex items-center justify-center h-4 w-4 rounded-sm mr-2 shrink-0",
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
                <span className="break-words">
                  Tiempo: {product.preparationTime} min
                </span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-1 text-foreground text-sm">
              Descripción
            </h3>
            <div className="space-y-1">
              <p className="text-muted-foreground leading-snug text-sm">
                {product.description}
              </p>
              {product.longDescription &&
                product.longDescription !== product.description && (
                  <div>
                    <h4 className="font-medium text-foreground mb-1 text-xs">
                      Detalles
                    </h4>
                    <p className="text-muted-foreground leading-snug text-xs">
                      {product.longDescription}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Información nutricional mejorada usando utils */}
          {product.nutritionalInfo && (
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-sm">
                Información Nutricional
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1">
                {product.nutritionalInfo.calories !== undefined && (
                  <div
                    className={cn(
                      "p-2 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Zap
                      className={cn(
                        "h-4 w-4 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-sm font-bold">
                      {product.nutritionalInfo.calories}
                    </p>
                    <p className="text-xs opacity-75">Calorías</p>
                  </div>
                )}
                {product.nutritionalInfo.protein !== undefined && (
                  <div
                    className={cn(
                      "p-2 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Utensils
                      className={cn(
                        "h-4 w-4 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-sm font-bold">
                      {product.nutritionalInfo.protein}g
                    </p>
                    <p className="text-xs opacity-75">Proteínas</p>
                  </div>
                )}
                {product.nutritionalInfo.carbs !== undefined && (
                  <div
                    className={cn(
                      "p-2 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Wheat
                      className={cn(
                        "h-4 w-4 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-sm font-bold">
                      {product.nutritionalInfo.carbs}g
                    </p>
                    <p className="text-xs opacity-75">Carbohidratos</p>
                  </div>
                )}
                {product.nutritionalInfo.fat !== undefined && (
                  <div
                    className={cn(
                      "p-2 rounded-lg text-center",
                      getVariantNutritionalClass(effectiveVariant)
                    )}
                  >
                    <Droplets
                      className={cn(
                        "h-4 w-4 mx-auto mb-1",
                        getVariantIconColorClass(effectiveVariant)
                      )}
                    />
                    <p className="text-sm font-bold">
                      {product.nutritionalInfo.fat}g
                    </p>
                    <p className="text-xs opacity-75">Grasas</p>
                  </div>
                )}
              </div>

              {/* Alérgenos con estilo consistente usando utils */}
              {product.nutritionalInfo.allergens &&
                product.nutritionalInfo.allergens.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-[var(--color-cancellation)]" />
                      <h4 className="font-semibold text-foreground text-sm">
                        Alérgenos
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.nutritionalInfo.allergens.map(
                        (allergen, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={cn(
                              "text-xs px-2 py-1",
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
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={cn(
                    "flex items-center justify-center h-4 w-4 rounded-sm",
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
                <h4 className="font-semibold text-foreground text-sm">Tags</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className={cn(
                      "text-xs px-2 py-1",
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
          <div className="mt-auto space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="font-semibold text-foreground text-sm">
                Cantidad
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 border-2 transition-all duration-200",
                    "hover:border-transparent",
                    getVariantBadgeClass(effectiveVariant),
                    quantity <= 1 && "opacity-50"
                  )}
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-semibold text-base">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 border-2 transition-all duration-200",
                    "hover:border-transparent",
                    getVariantBadgeClass(effectiveVariant)
                  )}
                  onClick={handleIncreaseQuantity}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg",
                getVariantNutritionalClass(effectiveVariant)
              )}
            >
              <div className="font-bold text-base text-center sm:text-left">
                Total: {formatPrice(product.price * quantity)}
              </div>
              <Button
                className={cn(
                  "px-4 sm:px-6 py-2 font-semibold w-full sm:w-auto",
                  getVariantBadgeClass(effectiveVariant),
                  "hover:opacity-90 transition-all duration-200",
                  !isAvailable && "opacity-50 cursor-not-allowed"
                )}
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAvailable ? "Añadir al carrito" : "No disponible"}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
