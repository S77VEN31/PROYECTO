"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  cn,
  getPromotionBadgeClassByStatus,
  getPromotionCardCompleteClass,
  getPromotionPrimaryClass,
  getPromotionUrgentClass,
} from "@/lib/utils";
import { Promotion, PromotionCreate } from "colori-platform-shared";
import {
  CalendarRange,
  Clock,
  Euro,
  Percent,
  Sparkles,
  Tag,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PromotionCardProps {
  promotion: Promotion;
  onSelect?: (promotion: Promotion) => void;
}

export function PromotionCard({ promotion, onSelect }: PromotionCardProps) {
  const router = useRouter();
  // Cast to PromotionCreate to access properties
  const promotionData = promotion as unknown as PromotionCreate;

  // Función para formatear fechas en formato legible
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Verificar el estado de la promoción
  const getPromotionStatus = () => {
    const now = new Date();
    const startDate = new Date(promotionData.startDate);
    const endDate = new Date(promotionData.endDate);

    if (!promotionData.active) {
      return "inactive"; // Promoción desactivada
    }

    if (now < startDate) {
      return "upcoming"; // Promoción futura
    }

    if (now >= startDate && now <= endDate) {
      return "active"; // Promoción activa
    }

    if (now > endDate) {
      return "expired"; // Promoción expirada
    }

    return "inactive";
  };

  const promotionStatus = getPromotionStatus();

  // Solo las promociones activas pueden ser clickeables para usar
  const isClickable =
    promotionStatus === "active" || promotionStatus === "upcoming";

  // Formatear el valor del descuento según el tipo
  const formatDiscountValue = () => {
    if (promotionData.discountPercent) {
      return `${promotionData.discountPercent}% OFF`;
    }
    if (promotionData.discountValue) {
      return `€${promotionData.discountValue.toFixed(2)} OFF`;
    }
    return "Oferta especial";
  };

  // Obtener el tipo de promoción formateado
  const getPromotionTypeText = () => {
    switch (promotionData.type) {
      case "discount":
        return "Descuento";
      case "bogo":
        return "2x1";
      case "bundle":
        return "Paquete";
      case "free-shipping":
        return "Envío Gratis";
      case "gift-with-purchase":
        return "Regalo";
      case "seasonal":
        return "Estacional";
      default:
        return "Promoción";
    }
  };

  // Calcular días restantes o días para inicio
  const getDaysInfo = () => {
    const now = new Date();

    if (promotionStatus === "upcoming") {
      const startDate = new Date(promotionData.startDate);
      const diffTime = startDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { type: "upcoming", days: diffDays };
    }

    if (promotionStatus === "active") {
      const endDate = new Date(promotionData.endDate);
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { type: "active", days: diffDays };
    }

    return { type: "other", days: 0 };
  };

  const daysInfo = getDaysInfo();
  const isExpiringSoon =
    daysInfo.type === "active" && daysInfo.days <= 3 && daysInfo.days > 0;
  const isStartingSoon = daysInfo.type === "upcoming" && daysInfo.days <= 7;

  // Obtener el texto del badge de estado
  const getStatusText = () => {
    switch (promotionStatus) {
      case "upcoming":
        return "Próximamente";
      case "active":
        return "Activa";
      case "expired":
        return "Expirada";
      case "inactive":
        return "Inactiva";
      default:
        return "Desconocido";
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(promotion);
    } else {
      // Navegar a la página de detalles de la promoción usando slug
      const slug = promotionData.slug || promotion.id;
      router.push(`/client/category/promotions/${slug}`);
    }
  };

  return (
    <Card
      className={getPromotionCardCompleteClass(isClickable)}
      onClick={handleCardClick}
    >
      {/* Imagen de la promoción */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {promotionData.backgroundImages &&
        promotionData.backgroundImages.length > 0 ? (
          <Image
            src={promotionData.backgroundImages[0].src}
            alt={promotionData.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center bg-muted/30">
            <Sparkles className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground mt-2">Sin imagen</p>
          </div>
        )}

        {/* Badge de estado en la esquina superior derecha */}
        <div className="absolute top-2 right-2 z-20">
          <Badge className={getPromotionBadgeClassByStatus(promotionStatus)}>
            {getStatusText()}
          </Badge>
        </div>

        {/* Badge de tipo de promoción en la esquina superior izquierda */}
        <div className="absolute top-2 left-2">
          <Badge className="text-xs font-medium shadow-sm border border-white/20 bg-[var(--color-coffee)] hover:bg-[var(--color-coffee)]/90 text-white dark:bg-[var(--color-pink)] dark:hover:bg-[var(--color-pink)]/90 dark:text-black">
            <Sparkles className="mr-1 h-3 w-3" />
            {getPromotionTypeText()}
          </Badge>
        </div>

        {/* Badge de urgencia o información temporal */}
        {isExpiringSoon && (
          <div className="absolute bottom-2 left-2">
            <Badge
              className={cn(
                "text-xs font-medium shadow-sm border border-white/20 animate-pulse",
                getPromotionUrgentClass("background"),
                getPromotionUrgentClass("text")
              )}
            >
              <Clock className="mr-1 h-3 w-3" />
              {daysInfo.days === 1 ? "¡Último día!" : `${daysInfo.days} días`}
            </Badge>
          </div>
        )}

        {isStartingSoon && (
          <div className="absolute bottom-2 left-2">
            <Badge className={getPromotionBadgeClassByStatus("upcoming")}>
              <Clock className="mr-1 h-3 w-3" />
              {daysInfo.days === 1
                ? "¡Inicia mañana!"
                : `Inicia en ${daysInfo.days} días`}
            </Badge>
          </div>
        )}

        {/* Overlay gradient para mejor legibilidad */}
        {promotionData.backgroundImages &&
          promotionData.backgroundImages.length > 0 && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Título y descripción */}
        <div className="space-y-2">
          <CardTitle className="text-lg font-bold line-clamp-1 text-foreground">
            {promotionData.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {promotionData.description}
          </CardDescription>
        </div>

        {/* Valor del descuento destacado */}
        <div
          className={cn(
            "flex items-center gap-2 p-3 rounded-lg border",
            getPromotionPrimaryClass("background"),
            getPromotionPrimaryClass("border")
          )}
        >
          {promotionData.discountPercent ? (
            <Percent
              className={cn("h-5 w-5", getPromotionPrimaryClass("text"))}
            />
          ) : (
            <Euro className={cn("h-5 w-5", getPromotionPrimaryClass("text"))} />
          )}
          <span
            className={cn(
              "text-lg font-bold",
              getPromotionPrimaryClass("text")
            )}
          >
            {formatDiscountValue()}
          </span>
        </div>

        {/* Información adicional */}
        <div className="space-y-2 text-sm">
          {/* Fechas de validez */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarRange
              className={cn("h-4 w-4", getPromotionPrimaryClass("text"))}
            />
            <span className="line-clamp-1">
              {formatDate(promotionData.startDate)} -{" "}
              {formatDate(promotionData.endDate)}
            </span>
          </div>

          {/* Código promocional si existe */}
          {promotionData.code && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ticket
                className={cn("h-4 w-4", getPromotionPrimaryClass("text"))}
              />
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {promotionData.code}
              </span>
            </div>
          )}

          {/* Compra mínima si existe */}
          {promotionData.minimumPurchase && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag
                className={cn("h-4 w-4", getPromotionPrimaryClass("text"))}
              />
              <span className="text-xs">
                Compra mín: €{promotionData.minimumPurchase.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
