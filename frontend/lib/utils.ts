import { mockCategories } from "@/data/mock";
import { clsx, type ClassValue } from "clsx";
import { CategoryVariant, PromotionType } from "colori-platform-shared";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Maps CategoryVariant enum to button variant strings
 * @param variant The CategoryVariant enum value
 * @returns The corresponding button variant string
 */
export function getButtonVariantFromCategory(
  variant: CategoryVariant | string
): string {
  const variantMap: Record<string, string> = {
    [CategoryVariant.COFFEE]: "coffee",
    [CategoryVariant.SKYBLUE]: "skyblue",
    [CategoryVariant.ORANGE]: "orange",
    [CategoryVariant.RED]: "red",
    [CategoryVariant.PINK]: "pink",
    [CategoryVariant.DEFAULT]: "default",
  };

  return variantMap[variant as CategoryVariant] || "default";
}

/**
 * Gets the English display name for a CategoryVariant
 * @param variant The CategoryVariant enum value
 * @returns The English display name
 */
export function getCategoryVariantDisplayName(
  variant: CategoryVariant | string
): string {
  const displayNames: Record<string, string> = {
    [CategoryVariant.COFFEE]: "Coffee",
    [CategoryVariant.SKYBLUE]: "Sky Blue",
    [CategoryVariant.ORANGE]: "Orange",
    [CategoryVariant.RED]: "Red",
    [CategoryVariant.PINK]: "Pink",
    [CategoryVariant.DEFAULT]: "Default",
  };

  return displayNames[variant as CategoryVariant] || "Default";
}

/**
 * Gets the badge CSS classes for a CategoryVariant using our consistent color system
 * @param variant The CategoryVariant enum value
 * @returns CSS classes for the badge
 */
export function getCategoryVariantBadgeClass(
  variant: CategoryVariant | string
): string {
  // Use our consistent color system from variantConfig
  return getVariantBadgeClass(variant);
}

/**
 * Get role badge class for consistent styling
 */
export function getRoleBadgeClass(): string {
  // All roles use primary color for consistency
  return "bg-primary text-primary-foreground";
}

/**
 * Get role display name in English
 */
export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    ADMIN: "Administrator",
    MANAGER: "Manager",
    CHEF: "Chef",
    SERVER: "Server",
    CASHIER: "Cashier",
  };
  return roleNames[role] || role;
}

/**
 * Get status badge class for consistent styling
 */
export function getStatusBadgeClass(isActive?: boolean): string {
  return isActive === true
    ? "bg-primary text-primary-foreground"
    : "bg-secondary text-secondary-foreground";
}

/**
 * Get status display text in English
 */
export function getStatusDisplayText(isActive?: boolean): string {
  return isActive === true ? "Active" : "Inactive";
}

/**
 * Get promotion status badge class
 */
export function getPromotionStatusBadgeClass(status: string): string {
  switch (status) {
    case "active":
      return "bg-primary text-primary-foreground";
    case "inactive":
      return "bg-secondary text-secondary-foreground";
    case "expired":
      return "bg-destructive text-destructive-foreground";
    case "upcoming":
      return "bg-muted text-muted-foreground border";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

/**
 * Get promotion status display text in English
 */
export function getPromotionStatusDisplayText(status: string): string {
  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    expired: "Expired",
    upcoming: "Upcoming",
  };
  return statusLabels[status] || status;
}

/**
 * Get promotion type display text in English
 */
export function getPromotionTypeDisplayText(type: string): string {
  const typeLabels: Record<string, string> = {
    [PromotionType.DISCOUNT]: "Descuento",
    [PromotionType.BOGO]: "Compra 1 Lleva 1",
    [PromotionType.BUNDLE]: "Paquete",
    [PromotionType.FREE_SHIPPING]: "Envío Gratis",
    [PromotionType.GIFT_WITH_PURCHASE]: "Regalo con Compra",
    [PromotionType.SEASONAL]: "Estacional",
  };
  return typeLabels[type] || type;
}

/**
 * Get toggle status action text in English
 */
export function getToggleStatusActionText(
  isActive?: boolean,
  entityType: "user" | "product" | "promotion" = "user"
): string {
  if (isActive === true) {
    return `Deactivate ${entityType}`;
  } else {
    return `Activate ${entityType}`;
  }
}

/**
 * Configuración centralizada de variantes de color para componentes
 * Uses CSS variables that match CategoryVariant enum values
 * Colors are consistent across light and dark modes
 */
export const variantConfig = {
  // Colores principales por variante (consistentes en ambos modos)
  iconColors: {
    [CategoryVariant.COFFEE]: "text-[var(--color-coffee)]",
    [CategoryVariant.SKYBLUE]: "text-[var(--color-skyblue)]",
    [CategoryVariant.ORANGE]: "text-[var(--color-orange)]",
    [CategoryVariant.RED]: "text-[var(--color-red)]",
    [CategoryVariant.PINK]: "text-[var(--color-pink)]",
    [CategoryVariant.DEFAULT]: "text-muted-foreground",
  },

  // Estilos de borde para tarjetas por variante (consistentes en ambos modos)
  borderStyles: {
    [CategoryVariant.COFFEE]:
      "border-[var(--color-coffee)]/20 hover:border-[var(--color-coffee)]/50",
    [CategoryVariant.SKYBLUE]:
      "border-[var(--color-skyblue)]/20 hover:border-[var(--color-skyblue)]/50",
    [CategoryVariant.ORANGE]:
      "border-[var(--color-orange)]/20 hover:border-[var(--color-orange)]/50",
    [CategoryVariant.RED]:
      "border-[var(--color-red)]/20 hover:border-[var(--color-red)]/50",
    [CategoryVariant.PINK]:
      "border-[var(--color-pink)]/20 hover:border-[var(--color-pink)]/50",
    [CategoryVariant.DEFAULT]:
      "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600",
  },

  // Variantes para badges/etiquetas (consistentes en ambos modos)
  badgeVariants: {
    [CategoryVariant.COFFEE]: "bg-[var(--color-coffee)] text-white",
    [CategoryVariant.SKYBLUE]: "bg-[var(--color-skyblue)] text-black",
    [CategoryVariant.ORANGE]: "bg-[var(--color-orange)] text-black",
    [CategoryVariant.RED]: "bg-[var(--color-red)] text-white",
    [CategoryVariant.PINK]: "bg-[var(--color-pink)] text-black",
    [CategoryVariant.DEFAULT]: "bg-secondary text-secondary-foreground",
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
    variantConfig.iconColors[CategoryVariant.DEFAULT];

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
    variantConfig.borderStyles[CategoryVariant.DEFAULT]
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
    variantConfig.badgeVariants[CategoryVariant.DEFAULT]
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
      variant: CategoryVariant.DEFAULT,
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
