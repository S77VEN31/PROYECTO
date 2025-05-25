"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Check } from "lucide-react";
import Link from "next/link";

interface OrderConfirmationProps {
  orderNumber: string;
  estimatedTime: string;
  instructions?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function OrderConfirmation({
  orderNumber,
  estimatedTime,
  instructions = "Tu orden será preparada y te notificaremos cuando esté lista. Por favor, recoge tu pedido en el mostrador mostrando el número de orden.",
  actionLabel = "Volver al Menú",
  actionHref = "/client",
}: OrderConfirmationProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center space-y-2">
        <IconCircle variant="primary" className="mx-auto">
          <Check className="h-8 w-8 text-primary" />
        </IconCircle>
        <CardTitle className="text-2xl font-bold">
          ¡Pedido Confirmado!
        </CardTitle>
        <p className="text-muted-foreground">
          Tu pedido ha sido enviado a cocina
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-primary/10 border border-primary/10 rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium mb-1">Número de Orden</h2>
          <p className="text-3xl font-bold text-primary">{orderNumber}</p>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4 border-border">
            <h3 className="font-medium mb-1">Tiempo Estimado de Preparación</h3>
            <p className="text-foreground">{estimatedTime}</p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Instrucciones</h3>
            <p className="text-muted-foreground">{instructions}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button variant="default" className="w-full sm:w-auto" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
