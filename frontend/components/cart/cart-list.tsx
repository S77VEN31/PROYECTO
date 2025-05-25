"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { CartItem } from "@/types/cart";
import { ShoppingCart } from "lucide-react";
import { CartItemCard } from "./cart-item-card";

interface CartListProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
}

export function CartList({
  items,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-10 w-10 text-muted-foreground" />}
        title="Tu carrito está vacío"
        description="Agrega algunos productos del menú para empezar tu pedido."
        actionLabel="Ver Menú"
        actionHref="/client/menu"
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard
          key={item.productId}
          item={item}
          onRemove={onRemoveItem}
          onIncrease={onIncreaseQuantity}
          onDecrease={onDecreaseQuantity}
        />
      ))}
    </div>
  );
}
