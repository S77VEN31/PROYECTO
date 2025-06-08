"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/contexts/CartContext";
import { cn, getCartItemCardClass } from "@/lib/utils";
import { ImageIcon, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function CartItemCard({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemCardProps) {
  const { product, quantity, productId } = item;
  const { name, price } = product;
  const totalPrice = price * quantity;

  // Obtener imagen del producto
  const hasImage =
    product.backgroundImages && product.backgroundImages.length > 0;
  const imageSrc = hasImage ? product.backgroundImages![0].src : null;

  // Verificar si es un producto en promoción basado en tags
  const isPromotion =
    product.tags?.includes("promoción") || product.tags?.includes("promo");

  // Creamos funciones manejadoras específicas para este ítem
  const handleIncrease = () => onIncrease(productId);
  const handleDecrease = () => onDecrease(productId);
  const handleRemove = () => onRemove(productId);

  return (
    <Card className={cn(getCartItemCardClass(), "mx-2")}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Imagen del producto mejorada */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-muted border border-border/30 shadow-sm">
            {hasImage ? (
              <Image
                src={imageSrc!}
                alt={name}
                fill
                className="object-cover transition-all duration-300 hover:scale-110"
                sizes="(max-width: 640px) 80px, 96px"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
              </div>
            )}
            {isPromotion && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-1.5 py-0.5 text-xs font-medium rounded-bl-lg shadow-sm z-20 border border-primary/20 backdrop-blur-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md dark:bg-primary dark:text-primary-foreground dark:border-primary/30">
                Promo
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-1 hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                ₡{price.toFixed(0)} por unidad
              </p>

              {item.specialInstructions && (
                <p className="text-xs text-muted-foreground italic bg-muted/50 px-2 py-1 rounded-md mt-1">
                  {item.specialInstructions}
                </p>
              )}
            </div>

            {/* Controles de cantidad y eliminar optimizados */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg bg-background shadow-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-l-lg hover:bg-muted transition-colors"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="px-3 py-1 text-sm font-medium min-w-[2.5rem] text-center border-x border-border/30">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-r-lg hover:bg-muted transition-colors"
                  onClick={handleIncrease}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg border border-destructive/20 hover:border-destructive/40"
                onClick={handleRemove}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Eliminar {name}</span>
              </Button>
            </div>
          </div>

          {/* Precio total optimizado */}
          <div className="text-right space-y-1 flex-shrink-0">
            <div className="text-lg sm:text-xl font-bold text-foreground">
              ₡{totalPrice.toFixed(0)}
            </div>
            {isPromotion && (
              <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Promo
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
