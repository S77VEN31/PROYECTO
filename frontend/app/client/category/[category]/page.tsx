"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
  cn,
  getCategoryFromProduct,
  getCategoryIconColorClass,
  getVariantBackgroundClass,
  getVariantBorderStyle,
} from "@/lib/utils";
import { Category, CategoryVariant, Product } from "colori-platform-shared";
import { AlertCircle, Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// Importar el nuevo componente de carousel-grid
import { ProductCarouselGrid } from "@/components/product/product-carousel-grid";

// Extender el tipo Product para incluir la propiedad categories
interface ExtendedProduct extends Product {
  categories?: string[];
}

// Componente de header compacto para layout horizontal
function CategoryHeader({ category }: { category: Category }) {
  const categoryData = getCategoryFromProduct(category.id);
  const IconComponent = categoryData.icon || Coffee;

  return (
    <div className="flex items-center gap-3 lg:gap-4">
      {/* Contenido principal compacto - ahora a la izquierda */}
      <div className="flex-1 text-left">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          {category.name}
        </h1>
      </div>

      {/* Ícono de categoría - ahora a la derecha */}
      <div className="flex-shrink-0">
        <div
          className={cn(
            "flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 shadow-sm",
            getVariantBackgroundClass(
              category.variant as CategoryVariant,
              "strong"
            ),
            getVariantBorderStyle(category.variant as CategoryVariant),
            // Fondo blanco sólido en modo claro para máximo contraste con los colores de categoría
            "bg-white dark:bg-transparent",
            // Sombra para profundidad y separación
            "shadow-lg dark:shadow-none"
          )}
        >
          <IconComponent
            className={cn(
              "h-6 w-6 lg:h-7 lg:w-7",
              getCategoryIconColorClass(category.variant as CategoryVariant)
            )}
          />
        </div>
      </div>
    </div>
  );
}

// Componente de estado de carga consistente
function LoadingState() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando categoría...</p>
        </div>
      </div>
    </div>
  );
}

// Componente de estado de error consistente
function ErrorState({
  error,
  categorySlug,
}: {
  error: string | null;
  categorySlug: string;
}) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            {error || "Categoría no encontrada"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {error || `No se pudo encontrar la categoría "${categorySlug}".`}
          </p>
        </CardContent>
      </Card>
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
    router.push(`/client/category/${categorySlug}/product/${product.slug}`);
  };

  // Estados de carga y error con componentes consistentes
  if (loading) {
    return <LoadingState />;
  }

  if (error || !currentCategory) {
    return <ErrorState error={error} categorySlug={categorySlug} />;
  }

  // Preparar items del breadcrumb
  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/client",
    },
    {
      label: currentCategory.name,
      isActive: true,
      productCount: categoryProducts.length,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-6">
      {/* Layout combinado: Breadcrumb + Header en la misma línea */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Breadcrumb */}
        <div className="flex-shrink-0">
          <Breadcrumb
            items={breadcrumbItems}
            categoryVariant={currentCategory.variant as CategoryVariant}
          />
        </div>

        {/* Header compacto */}
        <div className="flex-1 lg:flex lg:items-center lg:justify-end">
          <CategoryHeader category={currentCategory} />
        </div>
      </div>

      {/* Carousel-Grid de productos con transición automática */}
      <div className="space-y-6">
        <ProductCarouselGrid
          products={categoryProducts}
          onSelectProduct={handleSelectProduct}
          showInactive={false}
          categoryVariant={currentCategory.variant as CategoryVariant}
          scrollThreshold={200}
          autoplay={true}
          autoplayDelay={5000}
        />
      </div>
    </div>
  );
}

