"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/data/mock/products";
import { Promotion, PromotionCreate } from "colori-platform-shared";
import {
  ArrowLeft,
  CalendarRange,
  Clock,
  Copy,
  Percent,
  ShoppingBag,
  Tag,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "../product/product-card";

// Simple toast implementation
const useToast = () => {
  const [toasts, setToasts] = useState<
    { title: string; description: string }[]
  >([]);

  const toast = ({
    title,
    description,
    duration = 3000,
  }: {
    title: string;
    description: string;
    duration?: number;
  }) => {
    const newToast = { title, description };
    setToasts([...toasts, newToast]);

    // Remove toast after duration
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t !== newToast));
    }, duration);

    // Here we'd normally show a toast UI, but for simplicity
    // we'll just use browser's alert
    alert(`${title}: ${description}`);
  };

  return { toast, toasts };
};

interface PromotionDetailProps {
  promotion: Promotion;
  onAddToCart?: (id: string) => void;
}

export function PromotionDetail({
  promotion,
  onAddToCart = () => {},
}: PromotionDetailProps) {
  const { toast } = useToast();

  // Cast to PromotionCreate to access properties
  const promotionData = promotion as unknown as PromotionCreate;

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Verificar si la promoción está activa
  const isActive = () => {
    const now = new Date();
    const startDate = new Date(promotionData.startDate);
    const endDate = new Date(promotionData.endDate);
    return now >= startDate && now <= endDate && promotionData.active;
  };

  // Formatear el tipo de descuento
  const formatDiscountType = () => {
    switch (promotionData.type) {
      case "discount":
        return "Descuento";
      case "bogo":
        return "Compra 1 Lleva 2";
      case "bundle":
        return "Paquete";
      case "free-shipping":
        return "Envío Gratis";
      case "gift-with-purchase":
        return "Regalo con Compra";
      case "seasonal":
        return "Estacional";
      default:
        return "Oferta especial";
    }
  };

  // Copiar código al portapapeles
  const copyCodeToClipboard = () => {
    if (promotionData.code) {
      navigator.clipboard.writeText(promotionData.code);
      toast({
        title: "Código copiado",
        description: `El código ${promotionData.code} ha sido copiado al portapapeles.`,
        duration: 3000,
      });
    }
  };

  // Filtrar productos aplicables a esta promoción
  const applicableProducts = mockProducts.filter((product) =>
    promotionData.applicableProducts?.includes(product.id)
  );

  return (
    <div className="space-y-8">
      {/* Encabezado con imagen */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden">
        <Image
          src={
            promotionData.backgroundImages?.[0]?.src ||
            "/placeholder-promotion.jpg"
          }
          alt={promotionData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{promotionData.name}</h1>
          <p className="mt-2 text-white/90">{promotionData.description}</p>
        </div>
      </div>

      {/* Información de la promoción */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detalles */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">
                Detalles de la promoción
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-full">
                    <Tag className="h-5 w-5 text-rojo" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tipo de promoción
                    </p>
                    <p className="font-medium">{formatDiscountType()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-full">
                    <Percent className="h-5 w-5 text-rojo" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Valor del descuento
                    </p>
                    <p className="font-medium">
                      {promotionData.discountPercent &&
                        `${promotionData.discountPercent}%`}
                      {promotionData.discountValue &&
                        `€${promotionData.discountValue.toFixed(2)}`}
                      {!promotionData.discountPercent &&
                        !promotionData.discountValue &&
                        "Oferta especial"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-muted p-2 rounded-full">
                    <CalendarRange className="h-5 w-5 text-rojo" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Período de validez
                    </p>
                    <p className="font-medium">
                      {formatDate(promotionData.startDate)} -{" "}
                      {formatDate(promotionData.endDate)}
                    </p>
                  </div>
                </div>

                {promotionData.code && (
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Ticket className="h-5 w-5 text-rojo" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Código promocional
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded font-bold">
                          {promotionData.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={copyCodeToClipboard}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {promotionData.usageLimit && (
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Clock className="h-5 w-5 text-rojo" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Límite de uso
                      </p>
                      <p className="font-medium">
                        {promotionData.usageLimit} uso(s) total
                      </p>
                    </div>
                  </div>
                )}

                {promotionData.minimumPurchase && (
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-rojo" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Compra mínima
                      </p>
                      <p className="font-medium">
                        €{promotionData.minimumPurchase.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción larga y estado */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {promotionData.description}
              </p>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium">Estado de la promoción</h3>
                <p
                  className={`mt-1 font-bold ${
                    isActive() ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isActive() ? "Promoción activa" : "Promoción inactiva"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isActive()
                    ? "Esta promoción está disponible actualmente. ¡Aprovéchala!"
                    : "Esta promoción no está disponible en este momento."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Productos aplicables */}
      {applicableProducts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Productos aplicables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicableProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageSrc={product.imageSrc}
                isPromo={true}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button variant="outline" size="lg" asChild className="sm:flex-1">
          <Link href="/client/category/promotions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a promociones
          </Link>
        </Button>
        {isActive() && (
          <Button variant="rojo" size="lg" className="sm:flex-1">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Aprovechar promoción
          </Button>
        )}
      </div>
    </div>
  );
}
