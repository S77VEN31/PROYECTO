"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
  cn,
  getCategoryFromProduct,
  getVariantBackgroundClass,
  getVariantBorderStyle,
  getVariantIconClass,
} from "@/lib/utils";
import { Category, CategoryVariant, Product } from "colori-platform-shared";
import { AlertCircle, Coffee, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// Crear un ProductsGrid mínimo si no está disponible
import { ProductCard } from "@/components/product/product-card";

// Extender el tipo Product para incluir la propiedad categories
interface ExtendedProduct extends Product {
  categories?: string[];
}

// Definir un componente ProductsGrid compatible con estilos consistentes
function ProductsGrid({
  products,
  onSelectProduct,
  showInactive = true,
  categoryVariant = CategoryVariant.DEFAULT,
}: {
  products: Product[];
  onSelectProduct?: (product: Product) => void;
  showInactive?: boolean;
  categoryVariant?: CategoryVariant;
}) {
  // Filtrar productos inactivos si showInactive es false
  const filteredProducts = showInactive
    ? products
    : products.filter((product) => product.active !== false);

  if (filteredProducts.length === 0) {
    return (
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          getVariantBorderStyle(categoryVariant)
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full mb-4",
              "bg-muted"
            )}
          >
            <Package
              className={cn(getVariantIconClass(categoryVariant, "lg"))}
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No hay productos disponibles
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            No se encontraron productos en esta categoría. Por favor, intenta
            con otra categoría o vuelve más tarde.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
          categoryVariant={categoryVariant}
        />
      ))}
    </div>
  );
}

// Componente de header de sección consistente con admin
function CategoryHeader({
  category,
  productCount,
}: {
  category: Category;
  productCount: number;
}) {
  const categoryData = getCategoryFromProduct(category.id);
  const IconComponent = categoryData.icon || Coffee;

  return (
    <div className="text-center space-y-4">
      {/* Ícono de categoría con estilo consistente */}
      <div className="flex justify-center">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full border-2",
            getVariantBackgroundClass(
              category.variant as CategoryVariant,
              "light"
            ),
            getVariantBorderStyle(category.variant as CategoryVariant)
          )}
        >
          <IconComponent
            className={cn(
              getVariantIconClass(category.variant as CategoryVariant, "lg")
            )}
          />
        </div>
      </div>

      {/* Título y descripción */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        )}

        {/* Contador de productos */}
        {productCount > 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            {productCount} productos disponibles
          </p>
        )}
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
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      {/* Breadcrumb con estilo de categoría */}
      <Breadcrumb
        items={breadcrumbItems}
        categoryVariant={currentCategory.variant as CategoryVariant}
      />

      {/* Header de categoría con estilo consistente */}
      <CategoryHeader
        category={currentCategory}
        productCount={categoryProducts.length}
      />

      {/* Grid de productos con estilo consistente */}
      <div className="space-y-6">
        <ProductsGrid
          products={categoryProducts}
          onSelectProduct={handleSelectProduct}
          showInactive={false}
          categoryVariant={currentCategory.variant as CategoryVariant}
        />
      </div>
    </div>
  );
}

