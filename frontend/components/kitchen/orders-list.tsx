"use client";

import { OrderCard } from "@/components/common/cards/order-card";
import { Order } from "@/types/orders";
import { Loader2 } from "lucide-react";

interface OrdersListProps {
  orders: Order[];
  onOrderAction: (action: string, orderId: string, productId?: string) => void;
  isLoading?: boolean;
}

export function OrdersList({ orders, onOrderAction, isLoading = false }: OrdersListProps) {
  if (isLoading && orders.length === 0) {
    return (
      <div className="col-span-full text-center py-20 border border-dashed rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onAction={onOrderAction} />
      ))}

      {orders.length === 0 && !isLoading && (
        <div className="col-span-full text-center py-10 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No hay órdenes con el estado seleccionado
          </p>
        </div>
      )}
    </div>
  );
}
