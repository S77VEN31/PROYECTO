"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { CartProvider, useCart } from "@/contexts/CartContext";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  // Obtenemos el estado del carrito para pasarle el contador al header
  const { cart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="client" cartCount={cart.totalItems} />
      <main className="flex-1 container mx-auto px-4 py-4">{children}</main>
      <Footer variant="client" />
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </CartProvider>
  );
}
