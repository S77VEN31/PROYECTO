"use client";

import { CartList, CartSummary } from "@/components/cart";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { CategoryVariant } from "colori-platform-shared";
import { ShoppingBag } from "lucide-react";

// Componente de header consistente con otras páginas
function CartHeader({ itemCount }: { itemCount: number }) {
  return (
    <div className="text-center space-y-4">
      {/* Ícono de carrito con estilo consistente */}
      <div className="flex justify-center">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full border-2",
            "bg-primary/10 border-primary/20",
            "transition-all duration-200 hover:shadow-md hover:scale-[1.02]",
            "hover:bg-primary/15 hover:border-primary/30"
          )}
        >
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
      </div>

      {/* Título y descripción */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tu Pedido
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revisa y confirma los items de tu pedido
        </p>

        {/* Contador de items */}
        {itemCount > 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu
            carrito
          </p>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

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

  // Preparar items del breadcrumb
  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/client",
    },
    {
      label: "Carrito",
      isActive: true,
    },
  ];

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 max-w-7xl space-y-6">
      {/* Breadcrumb consistente */}
      <Breadcrumb
        items={breadcrumbItems}
        categoryVariant={CategoryVariant.DEFAULT}
      />

      {/* Header de carrito con estilo consistente */}
      <CartHeader itemCount={cart.totalItems} />

      {/* Contenido principal del carrito */}
      <div className="space-y-8">
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
  );
}
