"use client";

import { PromotionsGrid } from "@/components/promotions/promotions-grid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPromotions } from "@/data/mock/promotions";
import { ArrowLeft, Bell, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PromocionesPage() {
  const [showInactive, setShowInactive] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
        <div className="flex-1">
          <div className="inline-flex items-center mb-2">
            <Button asChild variant="ghost" size="icon" className="mr-2">
              <Link href="/client">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Promociones</h1>
          </div>
          <p className="text-muted-foreground">
            Descubre las mejores ofertas y promociones para disfrutar en Colori
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => setShowInactive(!showInactive)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {showInactive ? "Mostrar solo activas" : "Mostrar todas"}
          </Button>
          <Button variant="naranja">
            <Bell className="mr-2 h-4 w-4" />
            Recibir notificaciones
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Contenido principal */}
      <Tabs defaultValue="all">
        <TabsList className="mb-8">
          <TabsTrigger value="all">Todas las promociones</TabsTrigger>
          <TabsTrigger value="combos">Combos</TabsTrigger>
          <TabsTrigger value="discounts">Descuentos</TabsTrigger>
          <TabsTrigger value="specials">Ofertas especiales</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <PromotionsGrid
            promotions={mockPromotions}
            showInactive={showInactive}
          />
        </TabsContent>

        <TabsContent value="combos">
          <PromotionsGrid
            promotions={mockPromotions.filter(
              (p) => p.discountType === "bundle"
            )}
            showInactive={showInactive}
          />
        </TabsContent>

        <TabsContent value="discounts">
          <PromotionsGrid
            promotions={mockPromotions.filter(
              (p) => p.discountType === "percentage"
            )}
            showInactive={showInactive}
          />
        </TabsContent>

        <TabsContent value="specials">
          <PromotionsGrid
            promotions={mockPromotions.filter(
              (p) => p.discountType === "fixed"
            )}
            showInactive={showInactive}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
