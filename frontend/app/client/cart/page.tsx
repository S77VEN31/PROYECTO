"use client";

import { CartList, CartSummary } from "@/components/cart";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, summary } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  const handleCheckout = () => {
    console.log("Procediendo al checkout con el carrito:", cart);
    // La redirección se maneja en el componente CartSummary
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mx-auto">
          <div className="mb-8 space-y-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Tu Pedido</h1>
              <p className="text-muted-foreground mt-2">
                Revisa y confirma los items de tu pedido
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <CartList
                items={cart.items}
                onRemoveItem={handleRemoveItem}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </div>

            <div>
              <CartSummary
                items={cart.items}
                actionLabel="Proceder al pago"
                actionHref="/client/checkout"
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
