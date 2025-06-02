"use client";

import { ProductApiService } from "@/api/entities/product.api";
import { ProductDetail } from "@/components/product/product-detail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Product } from "colori-platform-shared";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductPageProps {}

export default function ProductPage({}: ProductPageProps) {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        const productData = await ProductApiService.getProductById({ id: productId });
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Manejar la adición al carrito
  const handleAddToCart = (id: string, quantity: number) => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} agregado al carrito`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center min-h-[300px]">
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold">
              {error || "Producto no encontrado"}
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              Lo sentimos, no pudimos encontrar el producto que estás buscando.
            </p>
            <Button asChild>
              <Link href="/client">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al menú
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <Button variant="outline" asChild className="mb-6">
          <Link href="/client">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al menú
          </Link>
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <ProductDetail 
        product={product}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
} 