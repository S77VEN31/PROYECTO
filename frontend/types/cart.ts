import { Product } from "./products";

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartSummary {
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  total: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  summary: CartSummary;
}
