"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/types/cart";
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
  const { name, price, imageSrc } = product;
  const totalPrice = price * quantity;

  // Creamos funciones manejadoras específicas para este ítem
  const handleIncrease = () => onIncrease(productId);
  const handleDecrease = () => onDecrease(productId);
  const handleRemove = () => onRemove(productId);

  return (
    <Card className="p-4 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100px, 150px"
          />
          {product.isPromo && (
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg">
              Promo
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg text-foreground truncate">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            ${price.toFixed(2)} por unidad
          </p>

          <div className="flex items-center mt-2 gap-2">
            <div className="flex items-center border border-border rounded-md bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none text-foreground"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none text-foreground"
                onClick={handleIncrease}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Eliminar</span>
            </Button>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-medium text-foreground">
            ${totalPrice.toFixed(2)}
          </div>
          {product.isPromo && (
            <span className="text-xs text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
              Precio promocional
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
