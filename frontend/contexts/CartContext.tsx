"use client";

import { Product } from "colori-platform-shared";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Definición de los tipos para el carrito
 */
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  specialInstructions?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartSummary {
  subtotal: number;
  tax?: number;
  total: number;
}

/**
 * Contexto para el carrito
 */
export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number, specialInstructions?: string) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  summary: CartSummary;
}

// Valor por defecto para el contexto
const defaultCartContext: CartContextType = {
  cart: { items: [], totalItems: 0, totalPrice: 0 },
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  summary: { subtotal: 0, tax: 0, total: 0 },
};

// Creación del contexto
export const CartContext = createContext<CartContextType>(defaultCartContext);

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Constantes para almacenamiento local
const CART_STORAGE_KEY = "colori_cart";
const TAX_RATE = 0.16; // 16% de impuesto

/**
 * Proveedor del contexto del carrito
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], totalItems: 0, totalPrice: 0 });
  
  // Cargar carrito desde el almacenamiento local al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error("Error al cargar el carrito desde localStorage:", error);
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    }
  }, []);

  // Guardar carrito en almacenamiento local cada vez que cambie
  useEffect(() => {
    if (typeof window !== "undefined" && cart.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  // Cálculo del resumen del carrito
  const summary: CartSummary = {
    subtotal: cart.totalPrice,
    tax: Number((cart.totalPrice * TAX_RATE).toFixed(2)),
    total: Number((cart.totalPrice * (1 + TAX_RATE)).toFixed(2)),
  };

  // Agregar producto al carrito
  const addToCart = useCallback((product: Product, quantity: number, specialInstructions?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.productId === product.id
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Actualizar item existente
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          specialInstructions: specialInstructions || newItems[existingItemIndex].specialInstructions,
        };
      } else {
        // Agregar nuevo item
        newItems = [
          ...prevCart.items,
          {
            productId: product.id,
            product,
            quantity,
            specialInstructions,
          },
        ];
      }

      // Calcular nuevos totales
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  // Eliminar producto del carrito
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );
      
      // Calcular nuevos totales
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  // Aumentar cantidad de un producto
  const increaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      // Calcular nuevos totales
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  // Disminuir cantidad de un producto
  const decreaseQuantity = useCallback((productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items
        .map((item) =>
          item.productId === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      // Calcular nuevos totales
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        totalItems,
        totalPrice,
      };
    });
  }, []);

  // Limpiar carrito
  const clearCart = useCallback(() => {
    setCart({ items: [], totalItems: 0, totalPrice: 0 });
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    summary,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
} 