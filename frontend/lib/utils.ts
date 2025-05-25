import { mockCategories } from "@/data/mock";
import { CategoryVariant } from "@/types/category";
import { clsx, type ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Configuración centralizada de variantes de color para componentes
 */
export const variantConfig = {
  // Colores principales por variante (respeta tema claro/oscuro)
  iconColors: {
    cafe: "text-[var(--color-cafe)] dark:text-[var(--color-rosa)]",
    celeste: "text-[var(--color-celeste)]",
    naranja: "text-[var(--color-naranja)]",
    rojo: "text-[var(--color-rojo)]",
    rosa: "text-[var(--color-rosa)]",
    default: "text-muted-foreground",
  },

  // Estilos de borde para tarjetas por variante
  borderStyles: {
    cafe: "border-[#40041A]/20 hover:border-[#40041A]/50 dark:border-[#F2D0D0]/20 dark:hover:border-[#F2D0D0]/50",
    celeste: "border-[#B0D9D5]/20 hover:border-[#B0D9D5]/50",
    naranja: "border-[#F2B988]/20 hover:border-[#F2B988]/50",
    rojo: "border-[#F29991]/20 hover:border-[#F29991]/50",
    rosa: "border-[#F2D0D0]/20 hover:border-[#F2D0D0]/50",
    default:
      "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600",
  },

  // Variantes para badges/etiquetas
  badgeVariants: {
    cafe: "bg-[var(--color-cafe)] text-white dark:bg-[var(--color-rosa)] dark:text-black",
    celeste: "bg-[var(--color-celeste)] text-black",
    naranja: "bg-[var(--color-naranja)] text-black",
    rojo: "bg-[var(--color-rojo)] text-white",
    rosa: "bg-[var(--color-rosa)] text-black",
    default: "bg-secondary text-secondary-foreground",
  },
};

/**
 * Obtiene la clase de color para un ícono basado en la variante
 * @param variant La variante de color a usar
 * @param size Tamaño del ícono (por defecto 'md')
 * @returns Clase CSS para el ícono con color y tamaño
 */
export function getVariantIconClass(
  variant: CategoryVariant | string,
  size: "sm" | "md" | "lg" = "md"
): string {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const variantColor =
    variantConfig.iconColors[variant as CategoryVariant] ||
    variantConfig.iconColors.default;

  return `${sizeClasses[size]} ${variantColor}`;
}

/**
 * Obtiene el estilo de borde para tarjetas basado en la variante
 * @param variant La variante de color a usar
 * @returns Clase CSS para el borde de la tarjeta
 */
export function getVariantBorderStyle(
  variant: CategoryVariant | string
): string {
  return (
    variantConfig.borderStyles[variant as CategoryVariant] ||
    variantConfig.borderStyles.default
  );
}

/**
 * Obtiene clases para badges/etiquetas basadas en la variante
 * @param variant La variante de color a usar
 * @returns Clase CSS para la etiqueta
 */
export function getVariantBadgeClass(
  variant: CategoryVariant | string
): string {
  return (
    variantConfig.badgeVariants[variant as CategoryVariant] ||
    variantConfig.badgeVariants.default
  );
}

/**
 * Obtiene la categoría principal de un producto
 * @param categoryId El ID o nombre de categoría del producto
 * @returns La categoría asociada o un valor predeterminado si no se encuentra
 */
export function getCategoryFromProduct(categoryId: string | string[]): {
  id: string;
  variant: CategoryVariant;
  name: string;
  icon: LucideIcon | null;
} {
  // Determinar qué ID de categoría usar
  let catId: string;
  if (Array.isArray(categoryId)) {
    catId = categoryId.length > 0 ? categoryId[0] : "default";
  } else {
    catId = categoryId || "default";
  }

  // Buscar la categoría en mockCategories
  const category = mockCategories.find(
    (cat) => cat.id === catId || cat.name === catId || cat.slug === catId
  );

  // Si no se encuentra, devolver valores por defecto
  if (!category) {
    return {
      id: "default",
      variant: "default" as CategoryVariant,
      name: typeof catId === "string" ? catId : "Producto",
      icon: null,
    };
  }

  // Devolver los datos de la categoría encontrada
  return {
    id: category.id,
    variant: category.variant as CategoryVariant,
    name: category.name,
    icon: category.icon,
  };
}
