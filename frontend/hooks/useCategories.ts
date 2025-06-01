import { CategoryApiService } from "@/api/entities/category.api";
import { Category as SharedCategory } from "colori-platform-shared";
import { Category, CategoryVariant } from "@/types/category";
import { Coffee, Dessert, UtensilsCrossed, Wine, LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
}

// Mapeando iconos de Lucide a nombres de iconos
const iconMap: Record<string, LucideIcon> = {
  "Coffee": Coffee,
  "Dessert": Dessert,
  "UtensilsCrossed": UtensilsCrossed,
  "Wine": Wine,
};

// Mapeando variantes de categoría
const variantMap: Record<string, CategoryVariant> = {
  "cafe": "cafe",
  "naranja": "naranja",
  "rosa": "rosa",
  "celeste": "celeste",
  "rojo": "rojo",
  "default": "default",
};

/**
 * Hook para obtener categorías desde la API
 */
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await CategoryApiService.getCategories({
        page: 1,
        limit: 100,
      });

      if (response && response.data) {
        // Convertir las categorías de la API al formato del frontend
        const frontendCategories = response.data.map((apiCategory: SharedCategory) => {
          // Determinar qué icono usar
          let icon: LucideIcon = Coffee; // Icono predeterminado
          if (typeof apiCategory.icon === 'string') {
            // Buscar en el mapa de iconos si existe
            icon = iconMap[apiCategory.icon] || Coffee;
          }
          
          // Determinar qué variante usar
          let variant: CategoryVariant = "default"; // Variante predeterminada
          if (typeof apiCategory.variant === 'string') {
            variant = variantMap[apiCategory.variant as string] || "default";
          }
          
          // Crear una categoría compatible con el frontend
          return {
            id: apiCategory.id,
            name: apiCategory.name,
            description: apiCategory.description,
            active: apiCategory.active === true, // Asegurar que sea booleano
            displayOrder: apiCategory.displayOrder || 0,
            icon: icon,
            variant: variant,
            slug: apiCategory.slug,
            searchTerm: apiCategory.searchTerm,
            backgroundImage: apiCategory.backgroundImages?.[0]?.src
          } as Category;
        });
        
        setCategories(frontendCategories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar categorías");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refreshCategories: fetchCategories,
  };
} 