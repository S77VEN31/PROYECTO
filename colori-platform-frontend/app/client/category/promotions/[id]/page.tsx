import { PromotionDetail } from "@/components/promotions/promotion-detail";
import { Button } from "@/components/ui/button";
import { mockPromotions } from "@/data/mock/promotions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PromotionDetailPageProps {
  params: {
    id: string;
  };
}

export default function PromotionDetailPage({
  params,
}: PromotionDetailPageProps) {
  const { id } = params;

  // Buscar la promoción por ID
  const promotion = mockPromotions.find((promo) => promo.id === id);

  // Si no existe la promoción, redirigir a 404
  if (!promotion) {
    notFound();
  }

  // Función para agregar productos al carrito
  const handleAddToCart = (productId: string) => {
    console.log(
      `Añadiendo producto ${productId} al carrito con promoción ${id}`
    );
    // Aquí implementarías la lógica para agregar al carrito
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/client/category/promotions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a promociones
          </Link>
        </Button>
      </div>
      <PromotionDetail promotion={promotion} onAddToCart={handleAddToCart} />
    </div>
  );
}
