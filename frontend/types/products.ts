import { Category } from "./category";

export interface Image {
  src: string;
  alt?: string;
  isPrimary?: boolean;
}

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
  backgroundImages?: Image[];
  imageSrc?: string; // Para compatibilidad con componentes existentes
  image?: string; // Para compatibilidad con componentes existentes
  categories?: Category[]; // Nueva propiedad con referencia directa a las categorías
  tags?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
  available?: boolean;
  isPromo?: boolean;
  relatedProducts?: string[];
}
