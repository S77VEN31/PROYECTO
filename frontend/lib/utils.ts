import { mockCategories } from "@/data/mock";
import { clsx, type ClassValue } from "clsx";
import {
  CategoryVariant,
  PromotionType,
  UserRole,
} from "colori-platform-shared";
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
 * Get status display text in English
 * @param status The status value (boolean for active/inactive or string for promotion statuses)
 * @returns The English display name
 */
export function getStatusDisplayText(status?: boolean | string): string {
  if (typeof status === "boolean") {
    return status === true ? "Active" : "Inactive";
  }

  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    expired: "Expired",
    upcoming: "Upcoming",
  };
  return statusLabels[status as string] || status || "Unknown";
}

/**
 * Get status badge class for consistent styling
 * @param status The status value (boolean for active/inactive or string for promotion statuses)
 * @returns CSS classes for the badge
 */
export function getStatusBadgeClass(status?: boolean | string): string {
  if (typeof status === "boolean") {
    return status === true
      ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors";
  }

  const badgeClasses: Record<string, string> = {
    active:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors",
    inactive:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors",
    expired:
      "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors",
    upcoming:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors",
  };
  return (
    badgeClasses[status as string] ||
    "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
  );
}

/**
 * Get toggle status action text in English
 */
export function getToggleStatusActionText(
  isActive?: boolean,
  entityType: "user" | "product" | "promotion" | "category" = "user"
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
    [CategoryVariant.COFFEE]:
      "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
    [CategoryVariant.SKYBLUE]: "text-[var(--color-skyblue)]",
    [CategoryVariant.ORANGE]: "text-[var(--color-orange)]",
    [CategoryVariant.RED]: "text-[var(--color-red)]",
    [CategoryVariant.PINK]: "text-black dark:text-[var(--color-pink)]",
    [CategoryVariant.DEFAULT]: "text-primary dark:text-[var(--color-pink)]",
  },

  // Estilos de borde para tarjetas por variante (consistentes en ambos modos)
  borderStyles: {
    [CategoryVariant.COFFEE]:
      "border-[var(--color-coffee)]/20 hover:border-[var(--color-coffee)]/50 dark:border-[var(--color-pink)]/20 dark:hover:border-[var(--color-pink)]/50",
    [CategoryVariant.SKYBLUE]:
      "border-[var(--color-skyblue)]/20 hover:border-[var(--color-skyblue)]/50",
    [CategoryVariant.ORANGE]:
      "border-[var(--color-orange)]/20 hover:border-[var(--color-orange)]/50",
    [CategoryVariant.RED]:
      "border-[var(--color-red)]/20 hover:border-[var(--color-red)]/50",
    [CategoryVariant.PINK]:
      "border-[var(--color-pink)]/20 hover:border-[var(--color-pink)]/50",
    [CategoryVariant.DEFAULT]:
      "border-primary/20 hover:border-primary/50 dark:border-[var(--color-pink)]/20 dark:hover:border-[var(--color-pink)]/50",
  },

  // Estilos para flechas de carrusel (basado en badges para consistencia)
  arrowStyles: {
    [CategoryVariant.COFFEE]:
      "bg-[var(--color-coffee)] text-white hover:bg-[var(--color-coffee)]/90 dark:bg-[var(--color-pink)] dark:text-black dark:hover:bg-[var(--color-pink)]/90",
    [CategoryVariant.SKYBLUE]:
      "bg-[var(--color-skyblue)] text-black hover:bg-[var(--color-skyblue)]/90",
    [CategoryVariant.ORANGE]:
      "bg-[var(--color-orange)] text-black hover:bg-[var(--color-orange)]/90",
    [CategoryVariant.RED]:
      "bg-[var(--color-red)] text-black hover:bg-[var(--color-red)]/90",
    [CategoryVariant.PINK]:
      "bg-[var(--color-pink)] text-black hover:bg-[var(--color-pink)]/90",
    [CategoryVariant.DEFAULT]:
      "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-[var(--color-pink)] dark:text-black dark:hover:bg-[var(--color-pink)]/90",
  },

  // Variantes para badges/etiquetas (consistentes en ambos modos)
  badgeVariants: {
    [CategoryVariant.COFFEE]:
      "bg-[var(--color-coffee)] !text-white hover:bg-[var(--color-coffee)]/90 hover:!text-white transition-colors dark:bg-[var(--color-pink)] dark:!text-black dark:hover:bg-[var(--color-pink)]/90 dark:hover:!text-black",
    [CategoryVariant.SKYBLUE]:
      "bg-[var(--color-skyblue)] text-black hover:bg-[var(--color-skyblue)]/90 transition-colors",
    [CategoryVariant.ORANGE]:
      "bg-[var(--color-orange)] text-black hover:bg-[var(--color-orange)]/90 transition-colors",
    [CategoryVariant.RED]:
      "bg-[var(--color-red)] text-black hover:bg-[var(--color-red)]/90 transition-colors",
    [CategoryVariant.PINK]:
      "bg-[var(--color-pink)] text-black hover:bg-[var(--color-pink)]/90 transition-colors",
    [CategoryVariant.DEFAULT]:
      "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors dark:bg-[var(--color-pink)] dark:text-black dark:hover:bg-[var(--color-pink)]/90",
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
 * Obtiene clases de color para íconos pequeños basadas en la variante
 * Solo devuelve las clases de color, sin tamaño
 * @param variant La variante de color a usar
 * @returns Clase CSS solo para el color del ícono
 */
export function getVariantIconColorClass(
  variant: CategoryVariant | string
): string {
  return (
    variantConfig.iconColors[variant as CategoryVariant] ||
    variantConfig.iconColors[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene clases de fondo con opacidad para elementos de información nutricional
 * @param variant La variante de color a usar
 * @param opacity Nivel de opacidad (por defecto 'light')
 * @returns Clase CSS para el fondo con color de variante
 */
export function getVariantBackgroundClass(
  variant: CategoryVariant | string,
  opacity: "light" | "medium" | "strong" = "light"
): string {
  const opacityMap = {
    light: "/10",
    medium: "/20",
    strong: "/30",
  };

  const opacityLevel = opacityMap[opacity];

  const backgroundClasses: Record<string, string> = {
    [CategoryVariant.COFFEE]: `bg-[var(--color-coffee)]${opacityLevel} dark:bg-[var(--color-pink)]${opacityLevel}`,
    [CategoryVariant.SKYBLUE]: `bg-[var(--color-skyblue)]${opacityLevel}`,
    [CategoryVariant.ORANGE]: `bg-[var(--color-orange)]${opacityLevel}`,
    [CategoryVariant.RED]: `bg-[var(--color-red)]${opacityLevel}`,
    [CategoryVariant.PINK]: `bg-[var(--color-pink)]${opacityLevel}`,
    [CategoryVariant.DEFAULT]: `bg-muted${
      opacityLevel === "/10" ? "/50" : opacityLevel === "/20" ? "/70" : ""
    } dark:bg-[var(--color-pink)]${opacityLevel}`,
  };

  return (
    backgroundClasses[variant as CategoryVariant] ||
    backgroundClasses[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene clases de borde con color de variante para elementos destacados
 * @param variant La variante de color a usar
 * @param style Estilo del borde ('subtle' | 'normal' | 'strong')
 * @returns Clase CSS para el borde con color de variante
 */
export function getVariantBorderClass(
  variant: CategoryVariant | string,
  style: "subtle" | "normal" | "strong" = "normal"
): string {
  const styleMap = {
    subtle: "/10",
    normal: "/20",
    strong: "/40",
  };

  const opacity = styleMap[style];

  const borderClasses: Record<string, string> = {
    [CategoryVariant.COFFEE]: `border-[var(--color-coffee)]${opacity} dark:border-[var(--color-pink)]${opacity}`,
    [CategoryVariant.SKYBLUE]: `border-[var(--color-skyblue)]${opacity}`,
    [CategoryVariant.ORANGE]: `border-[var(--color-orange)]${opacity}`,
    [CategoryVariant.RED]: `border-[var(--color-red)]${opacity}`,
    [CategoryVariant.PINK]: `border-[var(--color-pink)]${opacity}`,
    [CategoryVariant.DEFAULT]:
      "border-muted-foreground/20 dark:border-[var(--color-pink)]/20",
  };

  return (
    borderClasses[variant as CategoryVariant] ||
    borderClasses[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene clases para íconos de advertencia (alérgenos)
 * @returns Clase CSS para íconos de advertencia
 */
export function getWarningIconClass(): string {
  return "text-[var(--color-cancellation)]";
}

/**
 * Obtiene clases para elementos de información nutricional con mejor contraste
 * @param variant La variante de color a usar
 * @returns Clase CSS para contenedores de información nutricional
 */
export function getNutritionalInfoContainerClass(
  variant: CategoryVariant | string
): string {
  return cn(
    "flex items-center gap-1 p-1.5 rounded-md border transition-colors",
    getVariantBackgroundClass(variant, "light"),
    getVariantBorderClass(variant, "subtle")
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

/**
 * Get promotion type display text in English
 * @param type The PromotionType enum value
 * @returns The English display name
 */
export function getPromotionTypeDisplayText(
  type: PromotionType | string
): string {
  const typeLabels: Record<string, string> = {
    [PromotionType.DISCOUNT]: "Discount",
    [PromotionType.BOGO]: "Buy One Get One",
    [PromotionType.BUNDLE]: "Bundle",
    [PromotionType.FREE_SHIPPING]: "Free Shipping",
    [PromotionType.GIFT_WITH_PURCHASE]: "Gift with Purchase",
    [PromotionType.SEASONAL]: "Seasonal",
  };
  return typeLabels[type as PromotionType] || type;
}

/**
 * Get promotion type badge class for consistent styling
 * @param type The PromotionType enum value
 * @returns CSS classes for the badge
 */
export function getPromotionTypeBadgeClass(
  type: PromotionType | string
): string {
  const badgeClasses: Record<string, string> = {
    [PromotionType.DISCOUNT]:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors",
    [PromotionType.BOGO]:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors",
    [PromotionType.BUNDLE]:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800 transition-colors",
    [PromotionType.FREE_SHIPPING]:
      "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800 transition-colors",
    [PromotionType.GIFT_WITH_PURCHASE]:
      "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300 dark:hover:bg-pink-800 transition-colors",
    [PromotionType.SEASONAL]:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 transition-colors",
  };
  return (
    badgeClasses[type as PromotionType] ||
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
  );
}

/**
 * Get role display name in English
 * @param role The UserRole enum value
 * @returns The English display name
 */
export function getRoleDisplayName(role: UserRole | string): string {
  const roleNames: Record<string, string> = {
    [UserRole.ADMIN]: "Administrator",
    [UserRole.MANAGER]: "Manager",
    [UserRole.CHEF]: "Chef",
    [UserRole.SERVER]: "Server",
    [UserRole.CASHIER]: "Cashier",
  };
  return roleNames[role as UserRole] || role;
}

/**
 * Get role badge class for consistent styling
 * @param role The UserRole enum value
 * @returns CSS classes for the badge
 */
export function getRoleBadgeClass(role: UserRole | string): string {
  const badgeClasses: Record<string, string> = {
    [UserRole.ADMIN]:
      "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors",
    [UserRole.MANAGER]:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors",
    [UserRole.CHEF]:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors",
    [UserRole.SERVER]:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 transition-colors",
    [UserRole.CASHIER]:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800 transition-colors",
  };
  return (
    badgeClasses[role as UserRole] ||
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
  );
}

/**
 * Centralized color configuration for statistics components
 * Provides consistent styling across all stat cards
 * Colors are mapped to match existing badge and status color systems
 */
export const statsColorConfig = {
  // Primary colors for different stat types
  primary: "text-primary bg-primary/10",

  // Status-based colors (matching getStatusBadgeClass)
  active: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  inactive: "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400",

  // Role-based colors (matching getRoleBadgeClass color scheme)
  admin: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
  manager: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  chef: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  server:
    "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400",
  cashier:
    "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400",

  // Functional colors for different data types
  total: "text-primary bg-primary/10",
  products: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  price: "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400",
  nutrition:
    "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400",
  average:
    "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400",

  // Promotion-specific colors (matching getStatusBadgeClass for promotion statuses)
  expired: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
  upcoming: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",

  // Promotion theme colors
  promotions:
    "text-[var(--color-coffee)] bg-[var(--color-coffee)]/10 dark:text-[var(--color-pink)] dark:bg-[var(--color-pink)]/20",
  discount:
    "text-[var(--color-coffee)] bg-[var(--color-coffee)]/10 dark:text-[var(--color-pink)] dark:bg-[var(--color-pink)]/20",
};

/**
 * Configuración centralizada de colores para promociones
 * Proporciona estilos consistentes en modo claro y oscuro usando los colores primarios del tema
 * Modo claro: coffee, Modo oscuro: pink
 */
export const promotionColorConfig = {
  // Colores principales para promociones usando los colores primarios del tema
  primary: {
    text: "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
    background: "bg-[var(--color-coffee)]/10 dark:bg-[var(--color-pink)]/20",
    border:
      "border-[var(--color-coffee)]/20 dark:border-[var(--color-pink)]/30",
    hover:
      "hover:bg-[var(--color-coffee)]/20 dark:hover:bg-[var(--color-pink)]/30",
  },

  // Estados de promoción con colores específicos
  status: {
    active: {
      text: "text-green-600 dark:text-green-400",
      background: "bg-green-50 dark:bg-green-950/50",
      border: "border-green-200 dark:border-green-800",
      badge: "bg-green-600 hover:bg-green-700 text-white",
    },
    upcoming: {
      text: "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
      background: "bg-[var(--color-coffee)]/10 dark:bg-[var(--color-pink)]/20",
      border:
        "border-[var(--color-coffee)]/20 dark:border-[var(--color-pink)]/30",
      badge:
        "bg-[var(--color-coffee)] hover:bg-[var(--color-coffee)]/90 text-white dark:bg-[var(--color-pink)] dark:hover:bg-[var(--color-pink)]/90 dark:text-black",
    },
    expired: {
      text: "text-red-600 dark:text-red-400",
      background: "bg-red-50 dark:bg-red-950/50",
      border: "border-red-200 dark:border-red-800",
      badge: "bg-red-600 hover:bg-red-700 text-white",
    },
    inactive: {
      text: "text-gray-600 dark:text-gray-400",
      background: "bg-gray-50 dark:bg-gray-950/50",
      border: "border-gray-200 dark:border-gray-800",
      badge: "bg-gray-600 hover:bg-gray-700 text-white",
    },
  },

  // Tipos de promoción con colores específicos
  types: {
    discount: {
      text: "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
      background: "bg-[var(--color-coffee)]/10 dark:bg-[var(--color-pink)]/20",
      badge:
        "bg-[var(--color-coffee)]/90 hover:bg-[var(--color-coffee)] text-white dark:bg-[var(--color-pink)] dark:hover:bg-[var(--color-pink)]/90 dark:text-black",
    },
    bogo: {
      text: "text-green-600 dark:text-green-400",
      background: "bg-green-50 dark:bg-green-950/50",
      badge: "bg-green-600 hover:bg-green-700 text-white",
    },
    bundle: {
      text: "text-purple-600 dark:text-purple-400",
      background: "bg-purple-50 dark:bg-purple-950/50",
      badge: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    "free-shipping": {
      text: "text-orange-600 dark:text-orange-400",
      background: "bg-orange-50 dark:bg-orange-950/50",
      badge: "bg-orange-600 hover:bg-orange-700 text-white",
    },
    "gift-with-purchase": {
      text: "text-pink-600 dark:text-pink-400",
      background: "bg-pink-50 dark:bg-pink-950/50",
      badge: "bg-pink-600 hover:bg-pink-700 text-white",
    },
    seasonal: {
      text: "text-yellow-600 dark:text-yellow-400",
      background: "bg-yellow-50 dark:bg-yellow-950/50",
      badge: "bg-yellow-600 hover:bg-yellow-700 text-white",
    },
  },

  // Elementos de UI específicos para promociones
  ui: {
    card: {
      background: "bg-card dark:bg-card",
      border:
        "border-[var(--color-coffee)]/30 hover:border-[var(--color-coffee)]/60 dark:border-[var(--color-pink)]/30 dark:hover:border-[var(--color-pink)]/60",
      shadow: "shadow-lg hover:shadow-xl",
    },
    urgent: {
      background: "bg-red-50/50 dark:bg-red-950/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
    },
    icon: {
      container:
        "bg-[var(--color-coffee)]/10 border-[var(--color-coffee)]/30 dark:bg-[var(--color-pink)]/20 dark:border-[var(--color-pink)]/40",
      color: "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
    },
  },
};

/**
 * Get consistent stat card color styling
 * @param variant The color variant to use
 * @returns CSS classes for the stat card icon background
 */
export function getStatCardColorClass(
  variant: keyof typeof statsColorConfig | UserRole | string
): string {
  // Handle UserRole enum values by mapping them to string keys
  let variantKey: string;

  if (
    typeof variant === "string" &&
    Object.values(UserRole).includes(variant as UserRole)
  ) {
    // Map UserRole enum values to lowercase string keys
    const roleMap: Record<UserRole, string> = {
      [UserRole.ADMIN]: "admin",
      [UserRole.MANAGER]: "manager",
      [UserRole.CHEF]: "chef",
      [UserRole.SERVER]: "server",
      [UserRole.CASHIER]: "cashier",
    };
    variantKey = roleMap[variant as UserRole];
  } else {
    variantKey = variant as string;
  }

  return (
    statsColorConfig[variantKey as keyof typeof statsColorConfig] ||
    statsColorConfig.primary
  );
}

/**
 * Delete dialog styling configuration
 * Provides consistent styling for all delete confirmation dialogs
 * Uses cancellation colors (#EF4444) that match cancelled/expired promotions for consistency
 */
export const deleteDialogConfig = {
  // Icon container styling using cancellation color from theme
  iconContainer:
    "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cancellation-bg)] dark:bg-[var(--color-cancellation-bg-dark)]",

  // Icon styling using cancellation color from theme
  icon: "h-5 w-5 text-[var(--color-cancellation)]",

  // Content container styling
  content: "py-4",

  // Main text styling
  mainText: "text-sm text-muted-foreground",

  // Highlighted entity name styling
  entityName: "font-medium text-foreground",

  // Secondary description text styling
  secondaryText: "mt-2 text-sm text-muted-foreground",

  // Alternative: Using Tailwind's destructive classes (automatically uses our custom colors)
  iconContainerTailwind:
    "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10",
  iconTailwind: "h-5 w-5 text-destructive",
};

/**
 * Cancellation/Destructive action styling utilities
 * Centralized functions for consistent cancellation UI across the app
 */
export const cancellationStyles = {
  // Background colors for cancellation contexts
  backgroundLight: "bg-[var(--color-cancellation-bg)]",
  backgroundDark: "dark:bg-[var(--color-cancellation-bg-dark)]",
  background:
    "bg-[var(--color-cancellation-bg)] dark:bg-[var(--color-cancellation-bg-dark)]",

  // Text colors for cancellation contexts
  text: "text-[var(--color-cancellation)]",
  textOnBackground: "text-[var(--color-cancellation-foreground)]", // White text for red backgrounds

  // Combined background with opacity for subtle effects
  backgroundSubtle: "bg-[var(--color-cancellation)]/10",

  // Border colors for cancellation contexts
  border: "border-[var(--color-cancellation)]/20",
  borderHover: "hover:border-[var(--color-cancellation)]/50",

  // Full button styling (red background with white text)
  button:
    "bg-[var(--color-cancellation)] text-[var(--color-cancellation-foreground)]",
  buttonHover: "hover:bg-[var(--color-cancellation)]/90",
};

/**
 * Get standardized cancellation background class
 * @param subtle - Whether to use subtle (10% opacity) background
 * @returns CSS classes for cancellation background
 */
export function getCancellationBackgroundClass(
  subtle: boolean = false
): string {
  return subtle
    ? cancellationStyles.backgroundSubtle
    : cancellationStyles.background;
}

/**
 * Get standardized cancellation text color class
 * @param onBackground - Whether text is on a red background (uses white text)
 * @returns CSS classes for cancellation text color
 */
export function getCancellationTextClass(
  onBackground: boolean = false
): string {
  return onBackground
    ? cancellationStyles.textOnBackground
    : cancellationStyles.text;
}

/**
 * Get standardized cancellation border class
 * @param withHover - Whether to include hover effect
 * @returns CSS classes for cancellation border
 */
export function getCancellationBorderClass(withHover: boolean = false): string {
  return withHover
    ? `${cancellationStyles.border} ${cancellationStyles.borderHover}`
    : cancellationStyles.border;
}

/**
 * Get standardized delete dialog icon container classes
 * @param useTailwind - Whether to use Tailwind destructive classes (default: false, uses custom CSS variables)
 * @returns CSS classes for the icon container
 */
export function getDeleteDialogIconContainerClass(
  useTailwind: boolean = false
): string {
  return useTailwind
    ? deleteDialogConfig.iconContainerTailwind
    : deleteDialogConfig.iconContainer;
}

/**
 * Get standardized delete dialog icon classes
 * @param useTailwind - Whether to use Tailwind destructive classes (default: false, uses custom CSS variables)
 * @returns CSS classes for the icon
 */
export function getDeleteDialogIconClass(useTailwind: boolean = false): string {
  return useTailwind
    ? deleteDialogConfig.iconTailwind
    : deleteDialogConfig.icon;
}

/**
 * Get standardized delete dialog content classes
 * @returns CSS classes for the content container
 */
export function getDeleteDialogContentClass(): string {
  return deleteDialogConfig.content;
}

/**
 * Get standardized delete dialog main text classes
 * @returns CSS classes for the main text
 */
export function getDeleteDialogMainTextClass(): string {
  return deleteDialogConfig.mainText;
}

/**
 * Get standardized delete dialog entity name classes
 * @returns CSS classes for the entity name highlight
 */
export function getDeleteDialogEntityNameClass(): string {
  return deleteDialogConfig.entityName;
}

/**
 * Get standardized delete dialog secondary text classes
 * @returns CSS classes for the secondary description text
 */
export function getDeleteDialogSecondaryTextClass(): string {
  return deleteDialogConfig.secondaryText;
}

/**
 * Get standardized cancellation button classes (red background with white text)
 * @param withHover - Whether to include hover effect
 * @returns CSS classes for cancellation button
 */
export function getCancellationButtonClass(withHover: boolean = true): string {
  return withHover
    ? `${cancellationStyles.button} ${cancellationStyles.buttonHover}`
    : cancellationStyles.button;
}

/**
 * Obtiene clases para badges de alérgenos con colores de advertencia consistentes
 * @returns Clase CSS para badges de alérgenos
 */
export function getAllergenBadgeClass(): string {
  return "border-[var(--color-cancellation)]/30 text-[var(--color-cancellation)] bg-[var(--color-cancellation)]/10 dark:border-[var(--color-cancellation)]/40 dark:text-[var(--color-cancellation)] dark:bg-[var(--color-cancellation)]/20";
}

/**
 * Obtiene clases para tags y elementos informativos con estilos optimizados para modo claro/oscuro
 * Modo claro: fondo translúcido sin borde
 * Modo oscuro: fondo translúcido con texto del color de categoría
 * @param variant La variante de color a usar
 * @returns Clase CSS para tags con estilos adaptativos
 */
export function getVariantTagClass(variant: CategoryVariant | string): string {
  const tagClasses: Record<string, string> = {
    [CategoryVariant.COFFEE]:
      "bg-[var(--color-coffee)]/40 text-[var(--color-coffee)] " +
      "dark:bg-[var(--color-pink)]/20 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/30 " +
      "hover:bg-[var(--color-coffee)]/50 dark:hover:bg-[var(--color-pink)]/30 transition-colors",
    [CategoryVariant.SKYBLUE]:
      "bg-[var(--color-skyblue)]/40 text-black " +
      "dark:bg-[var(--color-skyblue)]/20 dark:text-[var(--color-skyblue)] dark:border-[var(--color-skyblue)]/30 " +
      "hover:bg-[var(--color-skyblue)]/50 dark:hover:bg-[var(--color-skyblue)]/30 transition-colors",
    [CategoryVariant.ORANGE]:
      "bg-[var(--color-orange)]/40 text-black " +
      "dark:bg-[var(--color-orange)]/20 dark:text-[var(--color-orange)] dark:border-[var(--color-orange)]/30 " +
      "hover:bg-[var(--color-orange)]/50 dark:hover:bg-[var(--color-orange)]/30 transition-colors",
    [CategoryVariant.RED]:
      "bg-[var(--color-red)]/40 text-black " +
      "dark:bg-[var(--color-red)]/20 dark:text-[var(--color-red)] dark:border-[var(--color-red)]/30 " +
      "hover:bg-[var(--color-red)]/50 dark:hover:bg-[var(--color-red)]/30 transition-colors",
    [CategoryVariant.PINK]:
      "bg-[var(--color-pink)]/40 text-black " +
      "dark:bg-[var(--color-pink)]/20 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/30 " +
      "hover:bg-[var(--color-pink)]/50 dark:hover:bg-[var(--color-pink)]/35 transition-all duration-200 " +
      "hover:shadow-sm hover:scale-[1.02]",
    [CategoryVariant.DEFAULT]:
      "bg-muted/50 text-muted-foreground dark:border-muted-foreground/20 " +
      "hover:bg-muted/70 transition-colors " +
      "dark:bg-[var(--color-pink)]/20 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/30 " +
      "dark:hover:bg-[var(--color-pink)]/30",
  };

  return (
    tagClasses[variant as CategoryVariant] ||
    tagClasses[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene clases para contenedores de información nutricional con estilos optimizados
 * Modo claro: fondo translúcido sin borde
 * Modo oscuro: fondo translúcido con texto del color de categoría
 * @param variant La variante de color a usar
 * @returns Clase CSS para contenedores nutricionales con estilos adaptativos
 */
export function getVariantNutritionalClass(
  variant: CategoryVariant | string
): string {
  const nutritionalClasses: Record<string, string> = {
    [CategoryVariant.COFFEE]:
      "bg-[var(--color-coffee)]/30 text-[var(--color-coffee)] " +
      "dark:bg-[var(--color-pink)]/15 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/25 " +
      "hover:bg-[var(--color-coffee)]/40 dark:hover:bg-[var(--color-pink)]/25 transition-colors",
    [CategoryVariant.SKYBLUE]:
      "bg-[var(--color-skyblue)]/30 text-black " +
      "dark:bg-[var(--color-skyblue)]/15 dark:text-[var(--color-skyblue)] dark:border-[var(--color-skyblue)]/25 " +
      "hover:bg-[var(--color-skyblue)]/40 dark:hover:bg-[var(--color-skyblue)]/25 transition-colors",
    [CategoryVariant.ORANGE]:
      "bg-[var(--color-orange)]/30 text-black " +
      "dark:bg-[var(--color-orange)]/15 dark:text-[var(--color-orange)] dark:border-[var(--color-orange)]/25 " +
      "hover:bg-[var(--color-orange)]/40 dark:hover:bg-[var(--color-orange)]/25 transition-colors",
    [CategoryVariant.RED]:
      "bg-[var(--color-red)]/30 text-black " +
      "dark:bg-[var(--color-red)]/15 dark:text-[var(--color-red)] dark:border-[var(--color-red)]/25 " +
      "hover:bg-[var(--color-red)]/40 dark:hover:bg-[var(--color-red)]/25 transition-colors",
    [CategoryVariant.PINK]:
      "bg-[var(--color-pink)]/30 text-black " +
      "dark:bg-[var(--color-pink)]/15 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/25 " +
      "hover:bg-[var(--color-pink)]/40 dark:hover:bg-[var(--color-pink)]/30 transition-all duration-200 " +
      "hover:shadow-md hover:scale-[1.02]",
    [CategoryVariant.DEFAULT]:
      "bg-muted/30 text-muted-foreground dark:border-muted-foreground/20 " +
      "hover:bg-muted/50 transition-colors " +
      "dark:bg-[var(--color-pink)]/15 dark:text-[var(--color-pink)] dark:border-[var(--color-pink)]/25 " +
      "dark:hover:bg-[var(--color-pink)]/25",
  };

  return (
    nutritionalClasses[variant as CategoryVariant] ||
    nutritionalClasses[CategoryVariant.DEFAULT]
  );
}

/**
 * Get standardized cart component styling classes
 * Provides consistent styling across all cart-related components
 */
export const cartComponentStyles = {
  // Card container styling for cart items and summary
  card: "border-2 shadow-lg transition-all duration-300 hover:shadow-xl bg-card",

  // Cart item card specific styling with enhanced hover effects
  itemCard:
    "border-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:scale-[1.01] bg-card group",

  // Cart summary card specific styling
  summaryCard:
    "border-2 shadow-lg transition-all duration-300 hover:shadow-xl bg-card",

  // Product image container with hover effects
  imageContainer:
    "relative h-24 w-24 overflow-hidden rounded-lg flex-shrink-0 border-2 border-muted transition-all duration-200 hover:border-primary/30 hover:shadow-md",

  // Product image with hover effects
  productImage:
    "object-cover transition-transform duration-300 group-hover:scale-105",

  // Product name with hover effects
  productName:
    "font-semibold text-lg text-foreground truncate transition-colors duration-200 group-hover:text-primary",

  // Product price with hover effects
  productPrice:
    "text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground",

  // Total price with hover effects
  totalPrice:
    "text-xl font-bold text-foreground transition-all duration-200 group-hover:text-primary group-hover:scale-105",

  // Quantity control container
  quantityControl:
    "flex items-center border-2 border-muted rounded-lg bg-background shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md",

  // Quantity display with hover effects
  quantityDisplay:
    "w-12 text-center font-semibold text-foreground border-x border-muted transition-colors duration-200 group-hover:text-primary",

  // Quantity button styling
  quantityButton:
    "hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105",

  // Remove button styling with enhanced hover effects
  removeButton:
    "h-10 px-3 border-2 text-destructive border-destructive/20 hover:border-destructive/40 hover:scale-105 transition-all duration-200 hover:shadow-md",

  // Total display container
  totalContainer:
    "flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20 transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 hover:shadow-md",

  // Action button styling
  actionButton:
    "w-full h-12 font-semibold text-base bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02]",

  // Special instructions styling with hover effects
  specialInstructions:
    "text-xs text-muted-foreground mt-1 italic bg-muted/50 px-2 py-1 rounded transition-all duration-200 hover:bg-muted/70 hover:text-foreground",

  // Promotion badge styling with hover effects
  promotionBadge:
    "inline-block text-xs text-primary-foreground bg-primary px-3 py-1 rounded-full font-medium shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:scale-105",

  // Controls container with hover effects
  controlsContainer:
    "flex items-center gap-3 transition-all duration-200 group-hover:scale-[1.02]",
};

/**
 * Get product image container styling classes with hover effects
 * @returns CSS classes for product image containers
 */
export function getProductImageContainerClass(): string {
  return cartComponentStyles.imageContainer;
}

/**
 * Get product image styling classes with hover effects
 * @returns CSS classes for product images
 */
export function getProductImageClass(): string {
  return cartComponentStyles.productImage;
}

/**
 * Get product name styling classes with hover effects
 * @returns CSS classes for product names
 */
export function getProductNameClass(): string {
  return cartComponentStyles.productName;
}

/**
 * Get product price styling classes with hover effects
 * @returns CSS classes for product prices
 */
export function getProductPriceClass(): string {
  return cartComponentStyles.productPrice;
}

/**
 * Get total price styling classes with hover effects
 * @returns CSS classes for total prices
 */
export function getTotalPriceClass(): string {
  return cartComponentStyles.totalPrice;
}

/**
 * Get quantity display styling classes with hover effects
 * @returns CSS classes for quantity display
 */
export function getQuantityDisplayClass(): string {
  return cartComponentStyles.quantityDisplay;
}

/**
 * Get controls container styling classes with hover effects
 * @returns CSS classes for controls containers
 */
export function getControlsContainerClass(): string {
  return cartComponentStyles.controlsContainer;
}

/**
 * Get cart item card styling classes
 * @returns CSS classes for cart item cards
 */
export function getCartItemCardClass(): string {
  return cartComponentStyles.itemCard;
}

/**
 * Get cart summary card styling classes
 * @returns CSS classes for cart summary cards
 */
export function getCartSummaryCardClass(): string {
  return cartComponentStyles.summaryCard;
}

/**
 * Get quantity control container styling classes
 * @returns CSS classes for quantity control containers
 */
export function getQuantityControlClass(): string {
  return cartComponentStyles.quantityControl;
}

/**
 * Get quantity button styling classes
 * @param position - Button position ('left' | 'right')
 * @param disabled - Whether the button is disabled
 * @returns CSS classes for quantity buttons
 */
export function getQuantityButtonClass(
  position: "left" | "right",
  disabled: boolean = false
): string {
  const baseClasses = `h-10 w-10 ${cartComponentStyles.quantityButton}`;
  const positionClasses =
    position === "left"
      ? "rounded-l-lg rounded-r-none"
      : "rounded-r-lg rounded-l-none";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return cn(baseClasses, positionClasses, disabledClasses);
}

/**
 * Get remove button styling classes
 * @returns CSS classes for remove buttons
 */
export function getRemoveButtonClass(): string {
  return cartComponentStyles.removeButton;
}

/**
 * Get total display container styling classes
 * @returns CSS classes for total display containers
 */
export function getTotalContainerClass(): string {
  return cartComponentStyles.totalContainer;
}

/**
 * Get action button styling classes
 * @param disabled - Whether the button is disabled
 * @returns CSS classes for action buttons
 */
export function getActionButtonClass(disabled: boolean = false): string {
  const baseClasses = cartComponentStyles.actionButton;
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return cn(baseClasses, disabledClasses);
}

/**
 * Obtiene clases para el badge indicador de cantidad de productos en el carrito
 * Estilos consistentes con el theme y modo claro/oscuro
 * @returns Clase CSS para el badge indicador del carrito
 */
export function getCartIndicatorBadgeClass(): string {
  return cn(
    "flex items-center gap-2 text-sm text-muted-foreground",
    "bg-muted/50 px-3 py-1 rounded-full backdrop-blur-sm",
    "border border-border/30 shadow-sm",
    "transition-all duration-200",
    "hover:bg-muted/70 hover:border-border/50 hover:shadow-md",
    "dark:bg-muted/30 dark:border-border/20",
    "dark:hover:bg-muted/50 dark:hover:border-border/40"
  );
}

/**
 * Get special instructions styling classes
 * @returns CSS classes for special instructions text
 */
export function getSpecialInstructionsClass(): string {
  return cartComponentStyles.specialInstructions;
}

/**
 * Get promotion badge styling classes
 * @returns CSS classes for promotion badges
 */
export function getPromotionBadgeClass(): string {
  return cartComponentStyles.promotionBadge;
}

/**
 * Obtiene clases de color para íconos de tarjetas de categoría
 * Mantiene los colores originales en ambos modos (sin texto blanco en modo oscuro)
 * @param variant La variante de color a usar
 * @returns Clase CSS solo para el color del ícono de categoría
 */
export function getCategoryIconColorClass(
  variant: CategoryVariant | string
): string {
  const categoryIconColors: Record<string, string> = {
    [CategoryVariant.COFFEE]:
      "text-[var(--color-coffee)] dark:text-[var(--color-pink)]",
    [CategoryVariant.SKYBLUE]: "text-[var(--color-skyblue)]",
    [CategoryVariant.ORANGE]: "text-[var(--color-orange)]",
    [CategoryVariant.RED]: "text-[var(--color-red)]",
    [CategoryVariant.PINK]: "text-[var(--color-pink)]",
    [CategoryVariant.DEFAULT]: "text-primary dark:text-[var(--color-pink)]",
  };

  return (
    categoryIconColors[variant as CategoryVariant] ||
    categoryIconColors[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene la clase de color para un ícono de categoría basado en la variante
 * @param variant La variante de color a usar
 * @param size Tamaño del ícono (por defecto 'md')
 * @returns Clase CSS para el ícono de categoría con color y tamaño
 */
export function getCategoryIconClass(
  variant: CategoryVariant | string,
  size: "sm" | "md" | "lg" = "md"
): string {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const variantColor = getCategoryIconColorClass(variant);

  return `${sizeClasses[size]} ${variantColor}`;
}

/**
 * Obtiene clases para las flechas del carrusel basadas en la variante
 * @param variant La variante de color a usar
 * @returns Clase CSS para las flechas
 */
export function getVariantArrowClass(
  variant: CategoryVariant | string
): string {
  return (
    variantConfig.arrowStyles[variant as CategoryVariant] ||
    variantConfig.arrowStyles[CategoryVariant.DEFAULT]
  );
}

/**
 * Obtiene clases de color primario para promociones
 * @param element El elemento específico ('text' | 'background' | 'border' | 'hover')
 * @returns Clase CSS para el color primario de promociones
 */
export function getPromotionPrimaryClass(
  element: "text" | "background" | "border" | "hover"
): string {
  return promotionColorConfig.primary[element];
}

/**
 * Obtiene clases de color para estados de promoción
 * @param status El estado de la promoción ('active' | 'upcoming' | 'expired' | 'inactive')
 * @param element El elemento específico ('text' | 'background' | 'border' | 'badge')
 * @returns Clase CSS para el estado de promoción
 */
export function getPromotionStatusClass(
  status: "active" | "upcoming" | "expired" | "inactive",
  element: "text" | "background" | "border" | "badge"
): string {
  return promotionColorConfig.status[status][element];
}

/**
 * Obtiene clases de color para tipos de promoción
 * @param type El tipo de promoción
 * @param element El elemento específico ('text' | 'background' | 'badge')
 * @returns Clase CSS para el tipo de promoción
 */
export function getPromotionTypeClass(
  type:
    | "discount"
    | "bogo"
    | "bundle"
    | "free-shipping"
    | "gift-with-purchase"
    | "seasonal",
  element: "text" | "background" | "badge"
): string {
  return (
    promotionColorConfig.types[type]?.[element] ||
    promotionColorConfig.types.discount[element]
  );
}

/**
 * Obtiene clases para tarjetas de promoción
 * @param element El elemento específico ('background' | 'border' | 'shadow')
 * @returns Clase CSS para tarjetas de promoción
 */
export function getPromotionCardClass(
  element: "background" | "border" | "shadow"
): string {
  return promotionColorConfig.ui.card[element];
}

/**
 * Obtiene clases para promociones urgentes
 * @param element El elemento específico ('background' | 'border' | 'text')
 * @returns Clase CSS para promociones urgentes
 */
export function getPromotionUrgentClass(
  element: "background" | "border" | "text"
): string {
  return promotionColorConfig.ui.urgent[element];
}

/**
 * Obtiene clases para íconos de promoción
 * @param element El elemento específico ('container' | 'color')
 * @returns Clase CSS para íconos de promoción
 */
export function getPromotionIconClass(element: "container" | "color"): string {
  return promotionColorConfig.ui.icon[element];
}

/**
 * Obtiene clases completas para badges de promoción basadas en el estado
 * @param status El estado de la promoción
 * @returns Clase CSS completa para el badge
 */
export function getPromotionBadgeClassByStatus(
  status: "active" | "upcoming" | "expired" | "inactive"
): string {
  return cn(
    "text-xs font-medium shadow-sm border border-white/20",
    getPromotionStatusClass(status, "badge")
  );
}

/**
 * Obtiene clases completas para badges de tipo de promoción
 * @param type El tipo de promoción
 * @returns Clase CSS completa para el badge
 */
export function getPromotionTypeBadgeClassByType(
  type:
    | "discount"
    | "bogo"
    | "bundle"
    | "free-shipping"
    | "gift-with-purchase"
    | "seasonal"
): string {
  return cn(
    "text-xs font-medium shadow-sm border border-white/20",
    getPromotionTypeClass(type, "badge")
  );
}

/**
 * Obtiene clases completas para tarjetas de promoción con todos los estilos
 * @param isActive Si la promoción está activa (afecta la opacidad y filtros)
 * @returns Clase CSS completa para tarjetas de promoción
 */
export function getPromotionCardCompleteClass(
  isActive: boolean = true
): string {
  return cn(
    "overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer border-2",
    getPromotionCardClass("background"),
    getPromotionCardClass("shadow"),
    isActive
      ? getPromotionCardClass("border")
      : "border-muted hover:border-muted-foreground/30 opacity-75 grayscale",
    !isActive && "cursor-not-allowed"
  );
}
