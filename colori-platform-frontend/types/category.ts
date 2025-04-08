import { LucideIcon } from "lucide-react";

/**
 * Representa una categoría del menú en la aplicación
 */
export interface Category {
  /** Identificador único de la categoría */
  id: string;
  /** Nombre visible de la categoría */
  name: string;
  /** Descripción corta de la categoría */
  description: string;
  /** Indica si la categoría está activa para ser mostrada */
  active: boolean;
  /** Orden de visualización en el menú */
  displayOrder: number;
  /** Icono asociado a la categoría */
  icon: LucideIcon;
  /** Variante visual utilizada para estilos (color, tema) */
  variant: CategoryVariant;
  /** URL amigable para la categoría */
  slug: string;
  /** Término de búsqueda asociado */
  searchTerm?: string;
  /** Imagen de fondo o representativa (opcional) */
  backgroundImage?: string;
}

/**
 * Tipos de variantes visuales predefinidas para categorías
 */
export type CategoryVariant =
  | "cafe"
  | "naranja"
  | "rosa"
  | "celeste"
  | "rojo"
  | "default";
