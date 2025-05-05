"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { orderService, type Order } from "@/lib/services/orderService";
import { toast } from "sonner";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = localStorage.getItem('lastOrderId');
    console.log('ID de orden en localStorage:', orderId); // Para debugging
    if (orderId) {
      loadOrder(orderId);
    } else {
      console.log('No se encontró ID de orden en localStorage'); // Para debugging
      router.push('/client');
    }
  }, [router]);

  const loadOrder = async (orderId: string) => {
    try {
      console.log('Intentando cargar orden:', orderId); // Para debugging
      const orderData = await orderService.getOrderById(orderId);
      console.log('Orden cargada:', orderData); // Para debugging
      setOrder(orderData);
    } catch (error) {
      console.error('Error al cargar la orden:', error); // Para debugging
      toast.error("Error al cargar la orden");
      router.push('/client');
    } finally {
      setLoading(false);
    }
  };

  const handleNewOrder = () => {
    localStorage.removeItem('lastOrderId');
    router.push('/client');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-muted-foreground">No se pudo cargar la orden</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl">¡Pedido Confirmado!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-2xl font-bold">Número de Orden</p>
              <p className="text-4xl font-bold text-primary">{order.numeroOrden}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Tu pedido está siendo procesado. Por favor, espera a que tu número sea llamado.
              </p>
              <p className="text-sm text-muted-foreground">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>

            <Button
              size="lg"
              onClick={handleNewOrder}
              className="w-full"
            >
              Realizar Nuevo Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 