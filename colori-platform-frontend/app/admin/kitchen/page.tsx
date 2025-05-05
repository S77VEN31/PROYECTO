"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/lib/services/orderService";
import { Order } from "@/lib/services/orderService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Clock, ChefHat, CheckCircle } from "lucide-react";

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO') => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success("Estado actualizado correctamente");
      fetchOrders(); // Recargar pedidos
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error al actualizar el estado");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDIENTE":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "PREPARANDO":
        return <Badge variant="naranja">En Preparación</Badge>;
      case "LISTO":
        return <Badge variant="cafe">Listo</Badge>;
      case "ENTREGADO":
        return <Badge variant="default">Entregado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Contadores de pedidos por estado
  const pedidosPendientes = orders.filter(order => order.estado === "PENDIENTE").length;
  const pedidosEnPreparacion = orders.filter(order => order.estado === "PREPARANDO").length;
  const pedidosListos = orders.filter(order => order.estado === "LISTO").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Cocina</h1>
        <div className="flex gap-4">
          <Card className="bg-secondary/20">
            <CardContent className="p-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-2xl font-bold">{pedidosPendientes}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-naranja/20">
            <CardContent className="p-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-naranja" />
              <div>
                <p className="text-sm text-muted-foreground">En Preparación</p>
                <p className="text-2xl font-bold">{pedidosEnPreparacion}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-cafe/20">
            <CardContent className="p-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-cafe" />
              <div>
                <p className="text-sm text-muted-foreground">Listos</p>
                <p className="text-2xl font-bold">{pedidosListos}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order._id} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                Pedido #{order.numeroOrden}
              </CardTitle>
              {getStatusBadge(order.estado)}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  {order.productos.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.producto.nombre}</p>
                        {item.toppings && item.toppings.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Toppings: {item.toppings.map(t => t.nombre).join(", ")}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">x{item.cantidad}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  {order.estado === "PENDIENTE" && (
                    <Button
                      onClick={() => handleUpdateStatus(order._id, "PREPARANDO")}
                      variant="default"
                    >
                      Iniciar Preparación
                    </Button>
                  )}
                  {order.estado === "PREPARANDO" && (
                    <Button
                      onClick={() => handleUpdateStatus(order._id, "LISTO")}
                      variant="cafe"
                    >
                      Marcar como Listo
                    </Button>
                  )}
                  {order.estado === "LISTO" && (
                    <Button
                      onClick={() => handleUpdateStatus(order._id, "ENTREGADO")}
                      variant="default"
                    >
                      Marcar como Entregado
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 