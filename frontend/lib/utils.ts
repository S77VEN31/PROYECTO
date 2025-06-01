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
    [CategoryVariant.COFFEE]:
      "bg-[var(--color-coffee)] text-white hover:bg-[var(--color-coffee)]/90 transition-colors",
    [CategoryVariant.SKYBLUE]:
      "bg-[var(--color-skyblue)] text-black hover:bg-[var(--color-skyblue)]/90 transition-colors",
    [CategoryVariant.ORANGE]:
      "bg-[var(--color-orange)] text-black hover:bg-[var(--color-orange)]/90 transition-colors",
    [CategoryVariant.RED]:
      "bg-[var(--color-red)] text-white hover:bg-[var(--color-red)]/90 transition-colors",
    [CategoryVariant.PINK]:
      "bg-[var(--color-pink)] text-black hover:bg-[var(--color-pink)]/90 transition-colors",
    [CategoryVariant.DEFAULT]:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
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
  iconContainer: "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cancellation-bg)] dark:bg-[var(--color-cancellation-bg-dark)]",
  
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
  iconContainerTailwind: "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10",
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
  background: "bg-[var(--color-cancellation-bg)] dark:bg-[var(--color-cancellation-bg-dark)]",
  
  // Text colors for cancellation contexts
  text: "text-[var(--color-cancellation)]",
  textOnBackground: "text-[var(--color-cancellation-foreground)]", // White text for red backgrounds
  
  // Combined background with opacity for subtle effects
  backgroundSubtle: "bg-[var(--color-cancellation)]/10",
  
  // Border colors for cancellation contexts
  border: "border-[var(--color-cancellation)]/20",
  borderHover: "hover:border-[var(--color-cancellation)]/50",
  
  // Full button styling (red background with white text)
  button: "bg-[var(--color-cancellation)] text-[var(--color-cancellation-foreground)]",
  buttonHover: "hover:bg-[var(--color-cancellation)]/90",
};

/**
 * Get standardized cancellation background class
 * @param subtle - Whether to use subtle (10% opacity) background
 * @returns CSS classes for cancellation background
 */
export function getCancellationBackgroundClass(subtle: boolean = false): string {
  return subtle 
    ? cancellationStyles.backgroundSubtle 
    : cancellationStyles.background;
}

/**
 * Get standardized cancellation text color class
 * @param onBackground - Whether text is on a red background (uses white text)
 * @returns CSS classes for cancellation text color
 */
export function getCancellationTextClass(onBackground: boolean = false): string {
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
export function getDeleteDialogIconContainerClass(useTailwind: boolean = false): string {
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
