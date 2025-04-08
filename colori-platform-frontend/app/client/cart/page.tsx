"use client";

import { CartList, CartSummary } from "@/components/cart";
import { mockProducts } from "@/data/mock";
import { Cart, CartItem } from "@/types/cart";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

// Initialize cart with complete product objects
const initialCartItems: CartItem[] = [
  {
    productId: "101",
    product: mockProducts.find((product) => product.id === "101")!, // Ensalada César
    quantity: 2,
  },
  {
    productId: "202",
    product: mockProducts.find((product) => product.id === "202")!, // Salmón a la Parrilla
    quantity: 1,
  },
  {
    productId: "103",
    product: mockProducts.find((product) => product.id === "103")!, // Nachos con Guacamole
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  // Calculate cart totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Create a cart object
  const cart: Cart = {
    items: cartItems,
    totalItems,
    totalPrice,
  };

  const handleRemoveItem = (productId: string) => {
    console.log(`Removing product with ID: ${productId}`);
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    );
  };

  const handleIncreaseQuantity = (productId: string) => {
    console.log(`Increasing quantity for product with ID: ${productId}`);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: string) => {
    console.log(`Decreasing quantity for product with ID: ${productId}`);
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = () => {
    console.log("Procediendo al checkout con el carrito:", cart);
    // Aquí podrías redirigir al usuario o realizar otras acciones
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
                items={cartItems}
                onRemoveItem={handleRemoveItem}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </div>

            <div>
              <CartSummary
                items={cartItems}
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
