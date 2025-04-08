import { Product } from "./products";

export type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled";
export type ProductOrderStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";
export type PaymentMethod =
  | "cash"
  | "credit_card"
  | "debit_card"
  | "mobile_payment"
  | null;

export interface OrderProduct {
  product: Product;
  quantity: number;
  specialInstructions: string;
  status: ProductOrderStatus;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: number;
  products: OrderProduct[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  tip: number | null;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  serverName: string;
}
