"use client";

import { CategoryApiService } from "@/api/entities/category.api";
import { ProductApiService } from "@/api/entities/product.api";
import { ProductDetail } from "@/components/product/product-detail";
import { Button } from "@/components/ui/button";
import { Category, Product } from "colori-platform-shared";
import { ChevronLeft } from "lucide-react";
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

  // Loading state
  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rojo mb-4"></div>
        <p className="text-muted-foreground">Cargando producto...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-6 text-2xl font-bold">Error al cargar el producto</h1>
        <p className="mb-8 text-muted-foreground">{error}</p>
        <Button onClick={handleBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a la categoría
        </Button>
      </div>
    );
  }

  // Si no se encuentra el producto, mostrar mensaje de error
  if (!product) {
    return (
      <div className="container flex flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-6 text-2xl font-bold">Producto no encontrado</h1>
        <p className="mb-8 text-muted-foreground">
          Lo sentimos, no pudimos encontrar el producto que buscas.
        </p>
        <Button onClick={handleBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a la categoría
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-10">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button
            variant="link"
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/client")}
          >
            Inicio
          </Button>
          <span>/</span>
          <Button
            variant="link"
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={handleBack}
          >
            {category?.name || categorySlug}
          </Button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onBack={handleBack}
        currentCategory={category?.name}
        categoryVariant={category?.variant}
      />
    </div>
  );
}
