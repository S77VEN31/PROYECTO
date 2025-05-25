"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Promotion } from "@/data/mock/promotions";
import { CalendarRange, Clock, Info, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PromotionCardProps {
  promotion: Promotion;
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  // Función para formatear fechas en formato legible
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Verificar si la promoción está activa basándonos en la fecha actual
  const isActive = () => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return now >= startDate && now <= endDate && promotion.active;
  };

  // Formatear el valor del descuento según el tipo
  const formatDiscountValue = () => {
    switch (promotion.discountType) {
      case "percentage":
        return `${promotion.discountValue}% de descuento`;
      case "fixed":
        return `$${promotion.discountValue.toFixed(2)} de descuento`;
      case "bundle":
        return `${promotion.discountValue}% en el segundo producto`;
      default:
        return "Oferta especial";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-rojo/20 hover:border-rojo/50">
      <div className="relative h-48 w-full">
        <Image
          src={promotion.imageSrc}
          alt={promotion.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-2 right-2">
          <Badge variant={isActive() ? "naranja" : "destructive"}>
            {isActive() ? "Activa" : "Inactiva"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{promotion.name}</CardTitle>
        <CardDescription className="mt-2 line-clamp-2 text-sm">
          {promotion.description}
        </CardDescription>

        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-rojo" />
            <span>{formatDiscountValue()}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4 text-rojo" />
            <span>
              {formatDate(promotion.startDate)} -{" "}
              {formatDate(promotion.endDate)}
            </span>
          </div>

          {promotion.code && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-rojo" />
              <span>
                Código: <strong>{promotion.code}</strong>
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="rojo" size="sm" className="w-full" asChild>
          <Link href={`/client/category/promotions/${promotion.id}`}>
            <Info className="mr-2 h-4 w-4" />
            Ver detalles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
