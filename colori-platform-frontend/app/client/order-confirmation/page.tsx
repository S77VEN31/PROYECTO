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
      const orderData = await orderService.getOrder(orderId);
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
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No se pudo cargar la orden.</p>
            <Button onClick={handleNewOrder} className="mt-4">
              Realizar nuevo pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center">¡Pedido Realizado con Éxito!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Número de Orden: #{order.numeroOrden}</p>
              <p className="text-muted-foreground">Gracias por tu pedido</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Detalles del Pedido:</h3>
              {order.productos.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>{item.producto.nombre} x{item.cantidad}</span>
                  <span>${(item.producto.precio * item.cantidad).toFixed(2)}</span>
                  {item.toppings && item.toppings.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Toppings:</p>
                      {item.toppings.map((topping, index) => (
                        <div key={index} className="flex justify-between py-1 text-sm">
                          <span>{topping.nombre}</span>
                          <span>${(topping.precio || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t mt-2 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="p-6 border-t">
          <Button onClick={handleNewOrder} className="w-full">
            Realizar nuevo pedido
          </Button>
        </div>
      </Card>
    </div>
  );
} 