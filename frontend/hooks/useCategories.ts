import { CategoryApiService } from "@/api/entities/category.api";
import { Category } from "colori-platform-shared";
import { useEffect, useState } from "react";

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
}

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
        // Las categorías ya vienen en el formato correcto desde la API
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar categorías"
      );
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