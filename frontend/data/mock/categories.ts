import { Category } from "../../types/category";

// Actualizando datos mock para usar strings como nombres de iconos
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Entradas",
    description: "Platos para comenzar tu experiencia culinaria",
    active: true,
    displayOrder: 1,
    icon: "UtensilsCrossed",
    variant: "cafe",
    slug: "entradas",
    searchTerm: "appetizer",
  },
  {
    id: "2",
    name: "Platos Principales",
    description: "Nuestras mejores creaciones culinarias",
    active: true,
    displayOrder: 2,
    icon: "UtensilsCrossed",
    variant: "naranja",
    slug: "platos-principales",
    searchTerm: "main-dish",
  },
  {
    id: "3",
    name: "Postres",
    description: "Endulza tu visita con nuestros postres artesanales",
    active: true,
    displayOrder: 3,
    icon: "Dessert",
    variant: "rosa",
    slug: "postres",
    searchTerm: "dessert",
  },
  {
    id: "4",
    name: "Bebidas",
    description: "Refrescantes opciones para acompañar tu comida",
    active: true,
    displayOrder: 4,
    icon: "Wine",
    variant: "celeste",
    slug: "bebidas",
    searchTerm: "beverage",
  },
];
