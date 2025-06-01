"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { ProductDetail } from "@/components/product/product-detail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Category, CategoryVariant, Product } from "colori-platform-shared";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// In a real application, instead of this mock implementation:
// 1. You would typically import a useCart hook or useContext(CartContext)
// 2. Then destructure: const { addToCart } = useCart();
// This ensures type safety and proper cart functionality
const addToCart = (productId: string, quantity: number) => {
  console.log("Adding to cart:", { productId, quantity });
};

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

// Componente de estado de carga consistente
function LoadingState() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    </div>
  );
}

// Componente de estado de error consistente
function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CategoryProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params using React.use() as recommended by Next.js
  const unwrappedParams = use(params);
  const categorySlug = unwrappedParams.category;
  const productSlug = unwrappedParams.product;

  useEffect(() => {
    const fetchData = async () => {
      if (!productSlug || !categorySlug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch both products and categories data to find by slug
        const [productsResponse, categoriesResponse] = await Promise.all([
          ProductApiService.getProducts({ page: 1, limit: 100 }),
          CategoryApiService.getCategories({ page: 1, limit: 100 }),
        ]);

        // Find the product by slug first, then get full details by ID
        if (productsResponse && productsResponse.data) {
          const foundProduct = productsResponse.data.find(
            (prod) => prod.slug === productSlug
          );

          if (foundProduct) {
            // Now get the full product details by ID
            const fullProduct = await ProductApiService.getProductById({
              id: foundProduct.id,
            });
            setProduct(fullProduct);
          } else {
            setProduct(null);
          }
        }

        // Find the category by slug
        if (categoriesResponse && categoriesResponse.data) {
          const foundCategory = categoriesResponse.data.find(
            (cat) => cat.slug === categorySlug
          );
          setCategory(foundCategory || null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el producto"
        );
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productSlug, categorySlug]);

  // Manejar la adición al carrito - matches CartContextType.addToCart signature
  const handleAddToCart = (id: string, quantity: number) => {
    if (product) {
      // Directly pass the parameters as expected by CartContextType
      addToCart(id, quantity);
    }
  };

  // Navegar hacia atrás a la categoría
  const handleBack = () => {
    router.push(`/client/category/${categorySlug}`);
  };

  // Estados de carga y error con componentes consistentes
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState title="Error al cargar el producto" message={error} />;
  }

  // Si no se encuentra el producto, mostrar mensaje de error
  if (!product) {
    return (
      <ErrorState
        title="Producto no encontrado"
        message="Lo sentimos, no pudimos encontrar el producto que buscas."
      />
    );
  }

  // Preparar items del breadcrumb
  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/client",
    },
    {
      label: category?.name || categorySlug,
      onClick: handleBack,
    },
    {
      label: product.name,
      isActive: true,
    },
  ];

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 max-w-7xl space-y-6">
      {/* Breadcrumb con estilo de categoría */}
      <Breadcrumb
        items={breadcrumbItems}
        categoryVariant={category?.variant as CategoryVariant}
      />

      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        currentCategory={category?.name}
        categoryVariant={category?.variant}
      />
    </div>
  );
}
