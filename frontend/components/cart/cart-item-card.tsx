"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/contexts/CartContext";
import {
  getCartItemCardClass,
  getControlsContainerClass,
  getProductImageClass,
  getProductImageContainerClass,
  getProductNameClass,
  getProductPriceClass,
  getPromotionBadgeClass,
  getQuantityButtonClass,
  getQuantityControlClass,
  getQuantityDisplayClass,
  getRemoveButtonClass,
  getSpecialInstructionsClass,
  getTotalPriceClass,
} from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
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
  const imageSrc =
    product.backgroundImages?.[0]?.src || "/placeholder-product.jpg";

  // Verificar si es un producto en promoción basado en tags
  const isPromotion =
    product.tags?.includes("promoción") || product.tags?.includes("promo");

  // Creamos funciones manejadoras específicas para este ítem
  const handleIncrease = () => onIncrease(productId);
  const handleDecrease = () => onDecrease(productId);
  const handleRemove = () => onRemove(productId);

  return (
    <Card className={getCartItemCardClass()}>
      <div className="p-6">
        <div className="flex items-center gap-6">
          {/* Imagen del producto */}
          <div className={getProductImageContainerClass()}>
            <Image
              src={imageSrc}
              alt={name}
              fill
              className={getProductImageClass()}
              sizes="(max-width: 768px) 100px, 150px"
            />
            {isPromotion && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
                Promo
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <h3 className={getProductNameClass()}>{name}</h3>
              <p className={getProductPriceClass()}>
                ₡{price.toFixed(0)} por unidad
              </p>

              {item.specialInstructions && (
                <p className={getSpecialInstructionsClass()}>
                  {item.specialInstructions}
                </p>
              )}
            </div>

            {/* Controles de cantidad y eliminar */}
            <div className={getControlsContainerClass()}>
              <div className={getQuantityControlClass()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={getQuantityButtonClass("left", quantity <= 1)}
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className={getQuantityDisplayClass()}>{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={getQuantityButtonClass("right")}
                  onClick={handleIncrease}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className={`${getRemoveButtonClass()} [&:hover]:text-destructive [&:hover]:bg-destructive/10`}
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Eliminar</span>
              </Button>
            </div>
          </div>

          {/* Precio total */}
          <div className="text-right space-y-2">
            <div className={getTotalPriceClass()}>₡{totalPrice.toFixed(0)}</div>
            {isPromotion && (
              <span className={getPromotionBadgeClass()}>
                Precio promocional
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
