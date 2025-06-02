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
import { useCart } from "@/contexts/CartContext";
import {
  cn,
  getAllergenBadgeClass,
  getCategoryFromProduct,
  getStatusBadgeClass,
  getStatusDisplayText,
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
  Info,
  Plus,
  Tag,
  Utensils,
  Wheat,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group",
        "border-2 bg-card",
        getVariantBorderStyle(effectiveVariant),
        !isActive() && "opacity-75 grayscale"
      )}
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

        {/* Badge de estado con mejor contraste */}
        <div className="absolute top-2 right-2">
          <Badge
            className={cn(
              "text-xs font-medium shadow-sm border",
              getStatusBadgeClass(isActive())
            )}
          >
            {getStatusDisplayText(isActive())}
          </Badge>
        </div>

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

          {/* Descripción larga si está disponible */}
          {product.longDescription &&
            product.longDescription !== product.description && (
              <p className="text-xs text-muted-foreground line-clamp-1 italic">
                {product.longDescription}
              </p>
            )}
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

        {/* Alérgenos con colores consistentes del sistema */}
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

        {/* Tags del producto con colores de categoría */}
        {product.tags && product.tags.length > 0 && (
          <div className="space-y-1">
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

      <CardFooter className="p-4 pt-0 flex gap-2">
        {onSelect ? (
          <Button
            className={cn(
              "flex-1 font-medium shadow-sm",
              getVariantBadgeClass(effectiveVariant),
              "hover:opacity-90 transition-all duration-200",
              !isActive() && "opacity-50 cursor-not-allowed"
            )}
            size="sm"
            onClick={() => isActive() && onSelect(product)}
            disabled={!isActive()}
          >
            <Info className="mr-2 h-4 w-4" />
            {isActive() ? "Ver detalles" : "No disponible"}
          </Button>
        ) : (
          <Button
            className={cn(
              "flex-1 font-medium shadow-sm",
              getVariantBadgeClass(effectiveVariant),
              "hover:opacity-90 transition-all duration-200",
              !isActive() && "opacity-50 cursor-not-allowed"
            )}
            size="sm"
            asChild={isActive()}
            disabled={!isActive()}
          >
            {isActive() ? (
              <Link href={`/client/product/${product.id}`}>
                <Info className="mr-2 h-4 w-4" />
                Ver detalles
              </Link>
            ) : (
              <span>
                <Info className="mr-2 h-4 w-4" />
                No disponible
              </span>
            )}
          </Button>
        )}

        {isActive() && (
          <AddToCartButton
            product={product}
            effectiveVariant={effectiveVariant}
          />
        )}
      </CardFooter>
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

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <Button
      size="sm"
      className={cn(
        "h-9 w-9 p-0 font-medium shadow-sm",
        getVariantBadgeClass(effectiveVariant),
        "hover:opacity-90 transition-all duration-200"
      )}
      onClick={handleAddToCart}
    >
      <Plus className="h-4 w-4" />
      <span className="sr-only">Agregar {product.name} al carrito</span>
    </Button>
  );
}
