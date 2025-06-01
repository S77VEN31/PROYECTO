"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { Button } from "@/components/ui/button";
import { Category, Product } from "colori-platform-shared";
import { ChevronLeft, Coffee } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// Crear un ProductsGrid mínimo si no está disponible
import { ProductCard } from "@/components/product/product-card";

// Extender el tipo Product para incluir la propiedad categories
interface ExtendedProduct extends Product {
  categories?: string[];
}

// Definir un componente ProductsGrid compatible
function ProductsGrid({
  products,
  onSelectProduct,
  showInactive = true,
}: {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  showInactive?: boolean;
}) {
  // Filtrar productos inactivos si showInactive es false
  const filteredProducts = showInactive
    ? products
    : products.filter((product) => product.active !== false);

  if (filteredProducts.length === 0) {
    return (
      <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-md">
        <p className="text-center font-medium">No hay productos disponibles</p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          No se encontraron productos en esta categoría. Por favor, intenta con
          otra categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const categorySlug = unwrappedParams.category;

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<ExtendedProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      if (!categorySlug) return;

      try {
        setLoading(true);
        setError(null);

        // Primero obtener todas las categorías para encontrar la que coincida con el slug
        const categoriesResponse = await CategoryApiService.getCategories({
          page: 1,
          limit: 100,
        });

        if (!categoriesResponse || !categoriesResponse.data) {
          throw new Error("No se pudieron cargar las categorías");
        }

        // Buscar la categoría por slug
        const category = categoriesResponse.data.find(
          (cat) => cat.slug === categorySlug
        );

        if (!category) {
          throw new Error(`Categoría "${categorySlug}" no encontrada`);
        }

        setCurrentCategory(category);

        // Usar getProducts con el parámetro category
        const productsResponse = await ProductApiService.getProducts({
          category: category.id,
          page: 1,
          limit: 100,
        });

        if (productsResponse && productsResponse.data) {
          setCategoryProducts(productsResponse.data);
        } else {
          setCategoryProducts([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar la categoría"
        );
        console.error("Error fetching category and products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categorySlug]);

  const handleSelectProduct = (product: Product) => {
    router.push(`/client/category/${categorySlug}/product/${product.id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rojo mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando categoría...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentCategory) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {error || "Categoría no encontrada"}
        </h1>
        <p className="text-center mb-4 text-muted-foreground">
          {error || `No se pudo encontrar la categoría "${categorySlug}".`}
        </p>
        <div className="text-center">
          <Button onClick={() => router.push("/client")}>
            Volver al menú principal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header personalizado */}
      <div className="mb-8 space-y-4">
        <div className="flex justify-between">
          <Button asChild variant="ghost" size="sm" className="text-foreground">
            <Link href="/client">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Regresar
            </Link>
          </Button>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Coffee className="h-12 w-12 text-rojo" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {currentCategory.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            {currentCategory.description}
          </p>
          {categoryProducts.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {categoryProducts.length} productos disponibles
            </p>
          )}
        </div>
      </div>

      {/* Grid de productos */}
      <ProductsGrid
        products={categoryProducts}
        onSelectProduct={handleSelectProduct}
        showInactive={false}
      />
    </div>
  );
}

