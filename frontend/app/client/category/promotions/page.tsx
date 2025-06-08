"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { PromotionCarouselGrid } from "@/components/promotions/promotion-carousel-grid";
import { PromotionsGrid } from "@/components/promotions/promotions-grid";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  cn,
  getPromotionIconClass,
  getPromotionUrgentClass,
} from "@/lib/utils";
import { Promotion } from "colori-platform-shared";
import { AlertTriangle, Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";

// Componente de header compacto para promociones
function PromotionsHeader() {
  return (
    <div className="flex items-center gap-3 lg:gap-4">
      {/* Contenido principal compacto */}
      <div className="flex-1 text-left">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
          Promociones y Ofertas
        </h1>
      </div>

      {/* Ícono de promociones */}
      <div className="flex-shrink-0">
        <div
          className={`flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 shadow-lg ${getPromotionIconClass(
            "container"
          )}`}
        >
          <Tag
            className={`h-6 w-6 lg:h-7 lg:w-7 ${getPromotionIconClass(
              "color"
            )}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function PromocionesPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const fetchPromotions = async () => {
    try {
      setIsLoading(true);
      const response = await PromotionApiService.getPromotions({
        page: 1,
        limit: 100,
      });
      setPromotions(response?.data || []);
    } catch (err) {
      setError("Error al cargar las promociones");
      console.error("Error fetching promotions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [showInactive]);

  // Manejar el cambio del switch con animación
  const handleSwitchChange = (checked: boolean) => {
    setIsTransitioning(true);
    setShowInactive(checked);

    // Resetear la transición después de un tiempo
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Filtrar promociones urgentes (expiran en 3 días o menos)
  const urgentPromotions = promotions.filter((promotion) => {
    const now = new Date();
    const endDate = new Date(promotion.endDate);
    const startDate = new Date(promotion.startDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Solo promociones activas y que expiran pronto
    return (
      now >= startDate &&
      now <= endDate &&
      promotion.active &&
      diffDays <= 3 &&
      diffDays > 0
    );
  });

  // Promociones regulares (excluyendo las urgentes)
  const regularPromotions = promotions.filter((promotion) => {
    return !urgentPromotions.some((urgent) => urgent.id === promotion.id);
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-rojo border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando promociones...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  // Preparar items del breadcrumb
  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/client",
    },
    {
      label: "Promociones",
      isActive: true,
      productCount: promotions.length,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-6">
      {/* Layout combinado: Breadcrumb + Header en la misma línea */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Breadcrumb */}
        <div className="flex-shrink-0">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header compacto */}
        <div className="flex-1 lg:flex lg:items-center lg:justify-end">
          <PromotionsHeader />
        </div>
      </div>

      {/* Filters - Solo mostrar cuando NO se incluyen inactivas */}
      {/* Removido - el switch ahora está siempre en el carousel */}

      {/* Urgent Promotions Section - Solo mostrar cuando NO se incluyen inactivas */}
      {!showInactive && urgentPromotions.length > 0 && (
        <Card
          className={`border-2 ${getPromotionUrgentClass(
            "border"
          )} ${getPromotionUrgentClass("background")}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle
                className={`h-5 w-5 animate-pulse ${getPromotionUrgentClass(
                  "text"
                )}`}
              />
              <h2
                className={`text-lg font-semibold ${getPromotionUrgentClass(
                  "text"
                )}`}
              >
                ¡Promociones que Expiran Pronto!
              </h2>
              <Badge variant="destructive" className="ml-2">
                <Clock className="mr-1 h-3 w-3" />
                Últimos días
              </Badge>
            </div>
            <PromotionsGrid
              promotions={urgentPromotions}
              showInactive={false}
            />
          </CardContent>
        </Card>
      )}

      {/* Main Promotions Display */}
      <div className="space-y-4">
        {/* Siempre usar carousel */}
        <div
          className={cn(
            "space-y-6 transition-all duration-500 ease-in-out",
            isTransitioning
              ? "opacity-75 scale-[0.98]"
              : "opacity-100 scale-100"
          )}
        >
          <PromotionCarouselGrid
            promotions={showInactive ? promotions : regularPromotions}
            showInactive={showInactive}
            autoplay={true}
            autoplayDelay={5000}
            scrollThreshold={200}
            switchComponent={
              <Card
                className={cn(
                  "shadow-lg border-2 transition-all duration-300 ease-in-out",
                  isTransitioning
                    ? "scale-105 shadow-xl border-primary/50 bg-primary/5"
                    : "scale-100 hover:scale-105"
                )}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-inactive-inline"
                      checked={showInactive}
                      onCheckedChange={handleSwitchChange}
                      disabled={isTransitioning}
                    />
                    <label
                      htmlFor="show-inactive-inline"
                      className={cn(
                        "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap transition-colors duration-300",
                        isTransitioning ? "text-primary" : ""
                      )}
                    >
                      Incluir inactivas
                    </label>
                  </div>
                </CardContent>
              </Card>
            }
          />
        </div>
      </div>
    </div>
  );
}
