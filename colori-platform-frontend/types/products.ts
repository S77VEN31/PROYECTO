import { Category } from "./category";

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  allergens?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  imageSrc: string;
  image?: string; // Para compatibilidad con componentes existentes
  categories?: Category[]; // Nueva propiedad con referencia directa a las categorías
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
  available?: boolean;
  isPromo?: boolean;
  relatedProducts?: string[];
}
