"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import {
  cn,
  getAllergenBadgeClass,
  getCategoryFromProduct,
  getVariantBadgeClass,
  getVariantBorderStyle,
  getVariantNutritionalClass,
  getVariantTagClass,
} from "@/lib/utils";
import { CategoryVariant, Product } from "colori-platform-shared";
import {
  AlertTriangle,
  Clock,
  Droplets,
  ShoppingCart,
  Tag,
  Utensils,
  Wheat,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  categoryVariant?: CategoryVariant;
}

export function ProductCard({
  product,
  onSelect,
  categoryVariant = CategoryVariant.DEFAULT,
}: ProductCardProps) {
  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return `₡${price.toFixed(0)}`;
  };

  // Verificar si el producto está activo
  const isActive = () => {
    return product.active !== false;
  };

  // Obtener información de la categoría para estilos consistentes
  const categoryData = getCategoryFromProduct(product.id);
  const effectiveVariant = categoryVariant || categoryData.variant;

  const handleCardClick = () => {
    if (isActive()) {
      if (onSelect) {
        onSelect(product);
      } else {
        // Navegar directamente al producto si no hay onSelect
        window.location.href = `/client/product/${product.id}`;
      }
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer",
        "border-2 bg-card",
        getVariantBorderStyle(effectiveVariant),
        !isActive() && "opacity-75 grayscale cursor-not-allowed"
      )}
      onClick={handleCardClick}
    >
      {/* Imagen del producto */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={product.backgroundImages?.[0]?.src || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* Botón agregar al carrito en la esquina superior derecha */}
        {isActive() && (
          <div className="absolute top-2 right-2 z-20">
            <AddToCartButton
              product={product}
              effectiveVariant={effectiveVariant}
            />
          </div>
        )}

        {/* Badge de tiempo de preparación si está disponible */}
        {product.preparationTime && (
          <div className="absolute top-2 left-2">
            <Badge
              className={cn(
                "text-xs font-medium shadow-sm border border-white/20",
                getVariantBadgeClass(effectiveVariant)
              )}
            >
              <Clock className="mr-1 h-3 w-3" />
              {product.preparationTime}min
            </Badge>
          </div>
        )}

        {/* Overlay gradient para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Título y descripción */}
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold line-clamp-1 text-foreground">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </CardDescription>
        </div>

        {/* Precio destacado con colores de variante */}
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-md",
            getVariantNutritionalClass(effectiveVariant)
          )}
        >
          {/* Usar solo el ícono de la categoría */}
          {categoryData.icon && <categoryData.icon className="h-5 w-5" />}
          <span className="text-xl font-bold">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Información nutricional completa si está disponible */}
        {product.nutritionalInfo && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Información Nutricional
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {product.nutritionalInfo.calories && (
                <div
                  className={cn(
                    "flex items-center gap-1 p-1.5 rounded-md",
                    getVariantNutritionalClass(effectiveVariant)
                  )}
                >
                  <Zap className="h-3 w-3" />
                  <span className="font-medium">
                    {product.nutritionalInfo.calories}
                  </span>
                  <span className="opacity-75">cal</span>
                </div>
              )}
              {product.nutritionalInfo.protein && (
                <div
                  className={cn(
                    "flex items-center gap-1 p-1.5 rounded-md",
                    getVariantNutritionalClass(effectiveVariant)
                  )}
                >
                  <Utensils className="h-3 w-3" />
                  <span className="font-medium">
                    {product.nutritionalInfo.protein}g
                  </span>
                  <span className="opacity-75">proteína</span>
                </div>
              )}
              {product.nutritionalInfo.carbs && (
                <div
                  className={cn(
                    "flex items-center gap-1 p-1.5 rounded-md",
                    getVariantNutritionalClass(effectiveVariant)
                  )}
                >
                  <Wheat className="h-3 w-3" />
                  <span className="font-medium">
                    {product.nutritionalInfo.carbs}g
                  </span>
                  <span className="opacity-75">carbos</span>
                </div>
              )}
              {product.nutritionalInfo.fat && (
                <div
                  className={cn(
                    "flex items-center gap-1 p-1.5 rounded-md",
                    getVariantNutritionalClass(effectiveVariant)
                  )}
                >
                  <Droplets className="h-3 w-3" />
                  <span className="font-medium">
                    {product.nutritionalInfo.fat}g
                  </span>
                  <span className="opacity-75">grasa</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alérgenos */}
        {product.nutritionalInfo?.allergens &&
          product.nutritionalInfo.allergens.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-[var(--color-cancellation)]" />
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Alérgenos
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.nutritionalInfo.allergens
                  .slice(0, 3)
                  .map((allergen, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        getAllergenBadgeClass()
                      )}
                    >
                      {allergen}
                    </Badge>
                  ))}
                {product.nutritionalInfo.allergens.length > 3 && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5",
                      getAllergenBadgeClass()
                    )}
                  >
                    +{product.nutritionalInfo.allergens.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          )}

        {/* Tags del producto con botón agregar al carrito */}
        {product.tags && product.tags.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-sm",
                    getVariantTagClass(effectiveVariant)
                  )}
                >
                  <Tag className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Tags
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  className={cn(
                    "text-xs px-2 py-0.5",
                    getVariantTagClass(effectiveVariant)
                  )}
                >
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge
                  className={cn(
                    "text-xs px-2 py-0.5",
                    getVariantTagClass(effectiveVariant)
                  )}
                >
                  +{product.tags.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente de botón Agregar al Carrito
function AddToCartButton({
  product,
  effectiveVariant,
}: {
  product: Product;
  effectiveVariant: CategoryVariant;
}) {
  const { addToCart } = useCart();

  // Debug: verificar que el contexto esté disponible
  console.log("CartContext addToCart function:", typeof addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Evitar que se active el click del card

    console.log("Intentando agregar al carrito:", product.name, product.id);

    try {
      if (!addToCart) {
        console.error("addToCart function is not available");
        toast.error("Error: función de carrito no disponible");
        return;
      }

      addToCart(product, 1);
      console.log("Producto agregado exitosamente al carrito");
      toast.success(`${product.name} agregado al carrito`, {
        duration: 2000,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("Error al agregar el producto al carrito");
    }
  };

  return (
    <Button
      size="sm"
      className={cn(
        "h-9 w-9 p-0 font-medium shadow-sm z-10 relative",
        getVariantBadgeClass(effectiveVariant),
        "hover:opacity-90 transition-all duration-200"
      )}
      onClick={handleAddToCart}
      type="button"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Agregar {product.name} al carrito</span>
    </Button>
  );
}
