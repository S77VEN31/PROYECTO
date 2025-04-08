"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { mockOrders } from "../../../data/mock";

export default function CheckoutPage() {
  // Use a mock order ID from our mockOrders
  const orderNumber = mockOrders[0].id;
  const estimatedTime = "15-20 minutos";

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>
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
              <h3 className="font-medium mb-1">
                Tiempo Estimado de Preparación
              </h3>
              <p className="text-foreground">{estimatedTime}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Instrucciones</h3>
              <p className="text-muted-foreground">
                Tu orden será preparada y te notificaremos cuando esté lista.
                Por favor, recoge tu pedido en el mostrador mostrando el número
                de orden.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="default" className="w-full sm:w-auto" asChild>
            <Link href="/client">Volver al Menú</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
