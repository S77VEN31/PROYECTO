"use client";

import { OrderCard } from "@/components/common/cards/order-card";
import { Order } from "@/types/orders";

interface OrdersListProps {
  orders: Order[];
  onOrderAction: (action: string, orderId: string, productId?: string) => void;
}

export function OrdersList({ orders, onOrderAction }: OrdersListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onAction={onOrderAction} />
      ))}

      {orders.length === 0 && (
        <div className="col-span-full text-center py-10 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No hay órdenes con el estado seleccionado
          </p>
        </div>
      )}
    </div>
  );
}
