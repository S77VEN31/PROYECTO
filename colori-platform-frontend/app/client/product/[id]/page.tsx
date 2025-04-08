"use client";

import { ProductDetail } from "@/components/product/product-detail";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/mock";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

// In a real application, instead of this mock implementation:
// 1. You would typically import a useCart hook or useContext(CartContext)
// 2. Then destructure: const { addToCart } = useCart();
// This ensures type safety and proper cart functionality
const addToCart = (productId: string, quantity: number) => {
  console.log("Adding to cart:", { productId, quantity });
};

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();

  // Unwrap params using React.use() as recommended by Next.js
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  // Obtener el producto por ID
  const product = getProductById(productId);

  // Manejar la adición al carrito - matches CartContextType.addToCart signature
  const handleAddToCart = (id: string, quantity: number) => {
    if (product) {
      // Directly pass the parameters as expected by CartContextType
      addToCart(id, quantity);
    }
  };

  // Navegar hacia atrás
  const handleBack = () => {
    router.back();
  };

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
          Volver al menú
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-10">
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onBack={handleBack}
      />
    </div>
  );
}
