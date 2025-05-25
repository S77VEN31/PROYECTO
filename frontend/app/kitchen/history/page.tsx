"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { mockOrders } from "../../../data/mock/orders";

export default function KitchenHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Simulamos que solo las órdenes completadas son parte del historial
  const completedOrders = mockOrders.filter(
    (order) => order.status === "completed"
  );

  // Filtrar órdenes por búsqueda
  const filteredOrders = searchQuery
    ? completedOrders.filter(
        (order) =>
          order.id.includes(searchQuery) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : completedOrders;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Historial de Órdenes</h1>
          <p className="text-muted-foreground mt-1">
            Revisa las órdenes completadas
          </p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar por ID o cliente..."
              className="w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="p-4 bg-muted/50 flex flex-row items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Orden #{order.id}</CardTitle>
                  <Badge variant="completed">Completada</Badge>
                </div>
                <CardDescription>
                  Cliente: {order.customerName} | Mesa: {order.tableNumber}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={order.createdAt}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-sm">
                <p className="font-medium mb-2">Productos:</p>
                <ul className="space-y-1">
                  {order.products.map((item) => (
                    <li key={item.product.id} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <p className="font-medium">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Ver detalles completos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No se encontraron órdenes</p>
          </div>
        )}
      </div>
    </div>
  );
}
