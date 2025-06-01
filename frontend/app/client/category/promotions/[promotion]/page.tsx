"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { PromotionDetail } from "@/components/promotions/promotion-detail";
import { Button } from "@/components/ui/button";
import { Promotion } from "colori-platform-shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface PromotionPageProps {
  params: Promise<{
    promotion: string;
  }>;
}

export default function PromotionDetailPage({ params }: PromotionPageProps) {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params using React.use() as recommended by Next.js
  const unwrappedParams = use(params);
  const promotionSlug = unwrappedParams.promotion;

  useEffect(() => {
    const fetchPromotion = async () => {
      if (!promotionSlug) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch all promotions to find by slug (same pattern as products)
        const promotionsResponse = await PromotionApiService.getPromotions({
          page: 1,
          limit: 100,
        });

        // Find the promotion by slug first, then get full details by ID
        if (promotionsResponse && promotionsResponse.data) {
          const foundPromotion = promotionsResponse.data.find(
            (promo) => promo.slug === promotionSlug
          );

          if (foundPromotion) {
            // Now get the full promotion details by ID
            const fullPromotion = await PromotionApiService.getPromotionById({
              id: foundPromotion.id,
            });
            setPromotion(fullPromotion);
          } else {
            setPromotion(null);
          }
        }
      } catch (err) {
        console.error("Error fetching promotion:", err);
        setError("Error al cargar la promoción");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotion();
  }, [promotionSlug]);

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
