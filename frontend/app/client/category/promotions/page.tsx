"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
import { PromotionsGrid } from "@/components/promotions/promotions-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Promotion } from "colori-platform-shared";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function PromocionesPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await PromotionApiService.getPromotions({
          search: searchTerm || undefined,
          active: showInactive ? undefined : true,
        });
        setPromotions(response?.data || []);
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Error al cargar las promociones");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, [searchTerm, showInactive]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Cargando promociones...</div>
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Promociones y Ofertas
        </h1>
        <p className="text-muted-foreground">
          Descubre nuestras mejores ofertas y promociones especiales
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar promociones..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-inactive"
              checked={showInactive}
              onCheckedChange={setShowInactive}
            />
            <label
              htmlFor="show-inactive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mostrar promociones inactivas
            </label>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <PromotionsGrid promotions={promotions} showInactive={showInactive} />
    </div>
  );
}
