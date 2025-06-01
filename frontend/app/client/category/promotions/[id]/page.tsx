"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { PromotionDetail } from "@/components/promotions/promotion-detail";
import { Button } from "@/components/ui/button";
import { Promotion } from "colori-platform-shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PromotionDetailPage() {
  const params = useParams();
  const promotionId = params.id as string;
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        setIsLoading(true);
        const fetchedPromotion = await PromotionApiService.getPromotionById({
          id: promotionId,
        });
        setPromotion(fetchedPromotion);
      } catch (err) {
        console.error("Error fetching promotion:", err);
        setError("Error al cargar la promoción");
      } finally {
        setIsLoading(false);
      }
    };

    if (promotionId) {
      fetchPromotion();
    }
  }, [promotionId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Cargando promoción...</div>
      </div>
    );
  }

  if (error || !promotion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Promoción no encontrada"}
          </p>
          <Button asChild>
            <Link href="/client/category/promotions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a promociones
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/client/category/promotions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a promociones
          </Link>
        </Button>
      </div>
      <PromotionDetail promotion={promotion} />
    </div>
  );
}
