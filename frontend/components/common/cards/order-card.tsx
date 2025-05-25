"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Order } from "@/types/orders";
import { Check, ChefHat, Clock, MoreHorizontal } from "lucide-react";

export interface OrderCardProps {
  order: Order;
  onAction: (action: string, orderId: string, productId?: string) => void;
  showProductActions?: boolean;
  showOrderActions?: boolean;
  className?: string;
}

export function OrderCard({
  order,
  onAction,
  showProductActions = true,
  showOrderActions = true,
  className = "",
}: OrderCardProps) {
  // Format order time
  const orderTime = new Date(order.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getTimeSince = (dateString: string) => {
    const orderDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - orderDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Ahora";
    if (diffMins === 1) return "1 minuto";
    return `${diffMins} minutos`;
  };

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      pending: "Pendiente",
      "in-progress": "En Preparación",
      completed: "Completada",
      cancelled: "Cancelada",
    };
    return statusMap[status];
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader className="p-4 space-y-2 border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              Orden #{order.id}
              <Badge variant={order.status}>
                {getStatusText(order.status)}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Mesa: {order.tableNumber}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{orderTime}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Hace {getTimeSince(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Cliente: {order.customerName}</span>
          <span>Mesero: {order.serverName}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 max-h-[calc(100vh-400px)] overflow-y-auto">
        <h3 className="font-medium mb-2">Productos:</h3>
        <div className="space-y-3">
          {order.products.map((orderProduct, index) => (
            <div
              key={index}
              className="border-b border-border pb-3 last:pb-0 last:border-0"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Badge
                    variant={orderProduct.status}
                    className="w-5 h-5 flex items-center justify-center p-0 rounded-full"
                  >
                    {orderProduct.status === "completed" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <span>{orderProduct.quantity}</span>
                    )}
                  </Badge>
                  <span className="font-medium">
                    {orderProduct.product.name}
                  </span>
                </div>
                {showProductActions && (
                  <div>
                    {orderProduct.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() =>
                          onAction(
                            "start-product",
                            order.id,
                            orderProduct.product.id
                          )
                        }
                      >
                        Preparar
                      </Button>
                    )}
                    {orderProduct.status === "in-progress" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() =>
                          onAction(
                            "complete-product",
                            order.id,
                            orderProduct.product.id
                          )
                        }
                      >
                        Completar
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {orderProduct.specialInstructions && (
                <p className="text-xs text-muted-foreground mt-1 ml-7">
                  {orderProduct.specialInstructions}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {showOrderActions && (
        <CardFooter className="p-4 border-t flex gap-2">
          {order.status === "pending" && (
            <Button
              variant="pending"
              className="flex-1"
              onClick={() => onAction("start-order", order.id)}
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Comenzar Preparación
            </Button>
          )}

          {order.status === "in-progress" && (
            <Button
              variant="completed"
              className="flex-1"
              onClick={() => onAction("complete-order", order.id)}
            >
              <Check className="h-4 w-4 mr-2" />
              Completar Orden
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() => onAction("details", order.id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
