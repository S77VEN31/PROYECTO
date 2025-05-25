"use client";

import { KitchenStats } from "@/components/kitchen/kitchen-stats";
import { OrdersList } from "@/components/kitchen/orders-list";
import { StatusFilter } from "@/components/kitchen/status-filter";
import { useState } from "react";

// Mock data importada desde la carpeta data/mock
import { mockOrders } from "../../data/mock/orders";

export default function KitchenDashboard() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filtrar las órdenes según el estado seleccionado
  const filteredOrders = statusFilter
    ? mockOrders.filter((order) => order.status === statusFilter)
    : mockOrders;

  // Contar órdenes por estado para los filtros y estadísticas
  const pendingCount = mockOrders.filter(
    (order) => order.status === "pending"
  ).length;
  const inProgressCount = mockOrders.filter(
    (order) => order.status === "in-progress"
  ).length;
  const completedCount = mockOrders.filter(
    (order) => order.status === "completed"
  ).length;

  // Manejar acciones sobre las órdenes
  const handleOrderAction = (action: string, orderId: string) => {
    console.log(`Acción: ${action}, Orden ID: ${orderId}`);
    // Aquí iría la lógica para actualizar el estado de la orden en un entorno real
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Panel de Cocina</h1>

      <KitchenStats
        pendingOrders={pendingCount}
        completedOrders={completedCount}
        averageTime="18 min"
        totalOrders={mockOrders.length}
      />

      <StatusFilter
        activeStatus={statusFilter}
        onFilterChange={setStatusFilter}
        pendingCount={pendingCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
      />

      <OrdersList orders={filteredOrders} onOrderAction={handleOrderAction} />
    </div>
  );
}
