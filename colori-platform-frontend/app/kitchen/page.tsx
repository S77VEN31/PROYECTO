"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, ChefHat } from "lucide-react";
import { orderService, Order } from "@/lib/services/orderService";
import { toast } from "sonner";

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // Actualizar pedidos cada 30 segundos
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      toast.error("Error al cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: 'PENDIENTE' | 'PREPARANDO' | 'LISTO' | 'ENTREGADO') => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success("Estado del pedido actualizado");
      fetchOrders();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.error("Error al actualizar el estado del pedido");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDIENTE':
        return <Badge variant="pending">Pendiente</Badge>;
      case 'PREPARANDO':
        return <Badge variant="in-progress">En Preparación</Badge>;
      case 'LISTO':
        return <Badge variant="completed">Listo</Badge>;
      case 'ENTREGADO':
        return <Badge variant="completed">Entregado</Badge>;
      default:
        return null;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Panel de Cocina</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <Card key={order._id}>
            <CardHeader className="p-4 space-y-2 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Orden #{order.numeroOrden}
                    {getStatusBadge(order.estado)}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(order.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hace {getTimeSince(order.createdAt)}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {order.productos.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.producto.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.cantidad}
                      </p>
                      {item.notas && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Notas: {item.notas}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                {order.estado === 'PENDIENTE' && (
                  <Button
                    variant="pending"
                    className="w-full"
                    onClick={() => handleUpdateStatus(order._id, 'PREPARANDO')}
                  >
                    <ChefHat className="h-4 w-4 mr-2" />
                    Comenzar Preparación
                  </Button>
                )}

                {order.estado === 'PREPARANDO' && (
                  <Button
                    variant="completed"
                    className="w-full"
                    onClick={() => handleUpdateStatus(order._id, 'LISTO')}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Marcar como Listo
                  </Button>
                )}

                {order.estado === 'LISTO' && (
                  <Button
                    variant="completed"
                    className="w-full"
                    onClick={() => handleUpdateStatus(order._id, 'ENTREGADO')}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Marcar como Entregado
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No hay pedidos pendientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
