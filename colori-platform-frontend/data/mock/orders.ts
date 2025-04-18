import { Order } from "../../types/orders";
import { getProductById } from "./products";

export const mockOrders: Order[] = [
  {
    id: "1001",
    customerName: "Juan Pérez",
    tableNumber: 5,
    products: [
      {
        product: getProductById("101")!,
        quantity: 1,
        specialInstructions: "Sin crutones por favor",
        status: "completed",
      },
      {
        product: getProductById("201")!,
        quantity: 1,
        specialInstructions: "Término medio",
        status: "in-progress",
      },
      {
        product: getProductById("402")!,
        quantity: 2,
        specialInstructions: "",
        status: "completed",
      },
    ],
    status: "in-progress",
    subtotal: 57.96,
    tax: 5.8,
    total: 63.76,
    tip: 10.0,
    paymentMethod: "credit_card",
    createdAt: "2023-06-15T18:30:00Z",
    updatedAt: "2023-06-15T19:10:00Z",
    completedAt: null,
    serverName: "Carlos Mendoza",
  },
  {
    id: "1002",
    customerName: "María Rodríguez",
    tableNumber: 8,
    products: [
      {
        product: getProductById("103")!,
        quantity: 1,
        specialInstructions: "",
        status: "completed",
      },
      {
        product: getProductById("301")!,
        quantity: 2,
        specialInstructions: "",
        status: "completed",
      },
    ],
    status: "completed",
    subtotal: 28.97,
    tax: 2.9,
    total: 31.87,
    tip: 6.0,
    paymentMethod: "cash",
    createdAt: "2023-06-15T19:00:00Z",
    updatedAt: "2023-06-15T20:15:00Z",
    completedAt: "2023-06-15T20:15:00Z",
    serverName: "Patricia Gómez",
  },
  {
    id: "1003",
    customerName: "Roberto Sánchez",
    tableNumber: 3,
    products: [
      {
        product: getProductById("101")!,
        quantity: 2,
        specialInstructions: "",
        status: "pending",
      },
      {
        product: getProductById("201")!,
        quantity: 1,
        specialInstructions: "Bien cocido",
        status: "pending",
      },
      {
        product: getProductById("301")!,
        quantity: 1,
        specialInstructions: "",
        status: "pending",
      },
    ],
    status: "pending",
    subtotal: 68.96,
    tax: 6.9,
    total: 75.86,
    tip: null,
    paymentMethod: null,
    createdAt: "2023-06-15T20:30:00Z",
    updatedAt: "2023-06-15T20:30:00Z",
    completedAt: null,
    serverName: "Carlos Mendoza",
  },
];
