"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/data/mock/products";
import {
  cn,
  getPromotionBadgeClassByStatus,
  getPromotionPrimaryClass,
  getPromotionStatusClass,
} from "@/lib/utils";
import {
  Promotion,
  PromotionCreate,
  Product as SharedProduct,
} from "colori-platform-shared";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarRange,
  CheckCircle,
  Copy,
  Euro,
  Gift,
  Percent,
  ShoppingBag,
  Sparkles,
  Ticket,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "../product/product-card";
import { PromotionImageGallery } from "./promotion-image-gallery";

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
  backHref?: string;
}

export function PromotionDetail({ promotion, backHref }: PromotionDetailProps) {
  const { toast } = useToast();

  // Cast to PromotionCreate to access properties
  const promotionData = promotion as unknown as PromotionCreate;

  // Formatear fecha con hora
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Verificar si la promoción está activa
  const isActive = () => {
    const now = new Date();
    const startDate = new Date(promotionData.startDate);
    const endDate = new Date(promotionData.endDate);
    return now >= startDate && now <= endDate && promotionData.active;
  };

  // Calcular días restantes
  const getDaysRemaining = () => {
    const now = new Date();
    const endDate = new Date(promotionData.endDate);
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Obtener el estado de la promoción
  const getPromotionStatus = () => {
    const now = new Date();
    const startDate = new Date(promotionData.startDate);
    const endDate = new Date(promotionData.endDate);

    if (!promotionData.active) {
      return "inactive";
    }

    if (now < startDate) {
      return "upcoming";
    }

    if (now >= startDate && now <= endDate) {
      return "active";
    }

    if (now > endDate) {
      return "expired";
    }

    return "inactive";
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

  // Formatear el valor del descuento
  const formatDiscountValue = () => {
    if (promotionData.discountPercent) {
      return `${promotionData.discountPercent}% OFF`;
    }
    if (promotionData.discountValue) {
      return `€${promotionData.discountValue.toFixed(2)} OFF`;
    }
    return "Oferta especial";
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

  const promotionStatus = getPromotionStatus();
  const daysRemaining = getDaysRemaining();
  const isExpiringSoon = daysRemaining <= 3 && daysRemaining > 0;

  return (
    <Card
      className={cn(
        "overflow-hidden border-2 shadow-lg transition-all duration-300 h-full relative",
        getPromotionPrimaryClass("border")
      )}
    >
      {/* Botón circular para volver */}
      {backHref && (
        <div className="absolute top-3 left-3 z-50">
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "rounded-full h-9 w-9 shadow-md border border-white/20",
              getPromotionStatusClass("upcoming", "badge")
            )}
            asChild
          >
            <Link href={backHref}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Galería de imágenes de la promoción */}
        <PromotionImageGallery
          images={promotionData.backgroundImages || []}
          promotionName={promotionData.name}
          isActive={isActive()}
        />

        {/* Detalles de la promoción */}
        <CardContent className="p-2 sm:p-3 md:p-4 flex flex-col h-full space-y-2 sm:space-y-3">
          {/* Header con tipo y estado */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mb-1 border border-white/20",
                    getPromotionStatusClass("upcoming", "badge")
                  )}
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {formatDiscountType()}
                </div>
                <h1 className="text-lg sm:text-xl font-bold mb-1 text-foreground break-words">
                  {promotionData.name}
                </h1>
              </div>
              <div className="shrink-0 self-start">
                <Badge
                  className={getPromotionBadgeClassByStatus(promotionStatus)}
                >
                  {promotionStatus === "active" && (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {promotionStatus === "upcoming" && (
                    <Sparkles className="mr-1 h-3 w-3" />
                  )}
                  {promotionStatus === "expired" && (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {promotionStatus === "inactive" && (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {promotionStatus === "active" && "Activa"}
                  {promotionStatus === "upcoming" && "Próximamente"}
                  {promotionStatus === "expired" && "Expirada"}
                  {promotionStatus === "inactive" && "Inactiva"}
                </Badge>
              </div>
            </div>

            {/* Alerta de urgencia */}
            {isActive() && isExpiringSoon && (
              <div
                className={cn(
                  "flex items-center text-sm mb-1 flex-wrap",
                  getPromotionPrimaryClass("text")
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center h-4 w-4 rounded-sm mr-2 shrink-0",
                    getPromotionPrimaryClass("background")
                  )}
                >
                  <AlertTriangle
                    className={cn(
                      "h-3 w-3 animate-pulse",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                </div>
                <span className="break-words font-medium">
                  {daysRemaining === 1
                    ? "¡Último día disponible!"
                    : `¡Solo ${daysRemaining} días restantes!`}
                </span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-1 text-foreground text-sm">
              Descripción
            </h3>
            <p className="text-muted-foreground leading-snug text-sm">
              {promotionData.description}
            </p>
          </div>

          {/* Información de la promoción en secciones */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground text-sm">
              Detalles de la Promoción
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* Valor del descuento destacado */}
              <div
                className={cn(
                  "p-2 rounded-lg text-center border",
                  getPromotionPrimaryClass("background"),
                  getPromotionPrimaryClass("border")
                )}
              >
                {promotionData.discountPercent ? (
                  <Percent
                    className={cn(
                      "h-4 w-4 mx-auto mb-1",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                ) : (
                  <Euro
                    className={cn(
                      "h-4 w-4 mx-auto mb-1",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                )}
                <p className="text-sm font-bold">{formatDiscountValue()}</p>
                <p className="text-xs opacity-75">Descuento</p>
              </div>

              {/* Compra mínima si existe */}
              {promotionData.minimumPurchase && (
                <div
                  className={cn(
                    "p-2 rounded-lg text-center border",
                    getPromotionPrimaryClass("background"),
                    getPromotionPrimaryClass("border")
                  )}
                >
                  <ShoppingBag
                    className={cn(
                      "h-4 w-4 mx-auto mb-1",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                  <p className="text-sm font-bold">
                    €{promotionData.minimumPurchase.toFixed(2)}
                  </p>
                  <p className="text-xs opacity-75">Compra mínima</p>
                </div>
              )}

              {/* Límite de uso si existe */}
              {promotionData.usageLimit && (
                <div
                  className={cn(
                    "p-2 rounded-lg text-center border",
                    getPromotionPrimaryClass("background"),
                    getPromotionPrimaryClass("border")
                  )}
                >
                  <Users
                    className={cn(
                      "h-4 w-4 mx-auto mb-1",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                  <p className="text-sm font-bold">
                    {promotionData.usageLimit}
                  </p>
                  <p className="text-xs opacity-75">Usos disponibles</p>
                </div>
              )}

              {/* Código de promoción si existe */}
              {promotionData.code && (
                <div
                  className={cn(
                    "p-2 rounded-lg text-center border",
                    getPromotionPrimaryClass("background"),
                    getPromotionPrimaryClass("border")
                  )}
                >
                  <Ticket
                    className={cn(
                      "h-4 w-4 mx-auto mb-1",
                      getPromotionPrimaryClass("text")
                    )}
                  />
                  <p className="text-sm font-mono font-bold">
                    {promotionData.code}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCodeToClipboard}
                    className={cn(
                      "mt-1 h-6 text-xs",
                      getPromotionPrimaryClass("text"),
                      getPromotionPrimaryClass("hover")
                    )}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copiar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Información de fechas */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground text-sm">
              Período de Validez
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div
                className={cn(
                  "p-2 rounded-lg text-center border",
                  getPromotionPrimaryClass("background"),
                  getPromotionPrimaryClass("border")
                )}
              >
                <CalendarRange
                  className={cn(
                    "h-4 w-4 mx-auto mb-1",
                    getPromotionPrimaryClass("text")
                  )}
                />
                <p className="text-sm font-bold">
                  {formatDateTime(promotionData.startDate)}
                </p>
                <p className="text-xs opacity-75">Inicio</p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-lg text-center border",
                  getPromotionPrimaryClass("background"),
                  getPromotionPrimaryClass("border")
                )}
              >
                <CalendarRange
                  className={cn(
                    "h-4 w-4 mx-auto mb-1",
                    getPromotionPrimaryClass("text")
                  )}
                />
                <p className="text-sm font-bold">
                  {formatDateTime(promotionData.endDate)}
                </p>
                <p className="text-xs opacity-75">Fin</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Estado actual de la promoción */}
          <div className="mt-auto">
            <div
              className={cn(
                "p-3 rounded-lg border text-center border-white/20",
                isActive()
                  ? getPromotionStatusClass("active", "badge")
                  : getPromotionStatusClass("upcoming", "badge")
              )}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {isActive() ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <XCircle className="h-5 w-5 dark:text-black text-white" />
                )}
                <span className="font-bold text-sm dark:text-black text-white">
                  {isActive()
                    ? "Promoción Disponible"
                    : "Promoción No Disponible"}
                </span>
              </div>
              <p className="text-xs dark:text-black/75 text-white/75">
                {isActive()
                  ? "¡Aprovecha esta oferta especial!"
                  : "Esta promoción no está disponible actualmente."}
              </p>
              {isActive() && daysRemaining > 0 && (
                <p className="text-xs font-medium mt-1 text-white">
                  {daysRemaining === 1
                    ? "¡Último día!"
                    : `${daysRemaining} días restantes`}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </div>

      {/* Productos aplicables */}
      {applicableProducts.length > 0 && (
        <div className={cn("border-t p-4", getPromotionPrimaryClass("border"))}>
          <div className="flex items-center gap-2 mb-4">
            <Gift className={cn("h-5 w-5", getPromotionPrimaryClass("text"))} />
            <h3 className="font-semibold text-foreground">
              Productos Aplicables
            </h3>
            <Badge
              className={cn(
                "ml-2 border border-white/20",
                getPromotionStatusClass("upcoming", "badge")
              )}
            >
              {applicableProducts.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applicableProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product as SharedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
