"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { cn } from "@/lib/utils";

export interface StatItem {
  label: string;
  value: string | number;
  change: string | number;
  positive: boolean;
  // Campos extendidos
  type?: "sales" | "orders" | "products" | "customers" | "generic";
  icon?: React.ReactNode;
  color?: string;
  colorClass?: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  // Format currency appropriately
  const formatValue = (label: string, value: string | number) => {
    // Si es un número y se trata de ventas, ingresos o valor monetario
    if (typeof value === "number") {
      if (
        label.toLowerCase().includes("venta") ||
        label.toLowerCase().includes("ingreso") ||
        label.toLowerCase().includes("valor") ||
        label.toLowerCase().includes("precio")
      ) {
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 2,
        }).format(value);
      }
      return value.toString();
    }

    // Si es un string, verificar si podría ser un valor monetario
    if (typeof value === "string" && value.startsWith("$")) {
      // Si es un valor monetario con signo de dólar, formatearlo correctamente
      try {
        const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 2,
        }).format(numericValue);
      } catch {
        return value; // Si falla el parsing, devolver el valor original
      }
    }
    return value;
  };

  // Formatear el cambio para mostrar
  const formatChange = (change: string | number, positive: boolean): string => {
    // Para números, aplicar formato de porcentaje o monetario según el contexto
    if (typeof change === "number") {
      // Si es un número pequeño (probablemente porcentaje)
      if (change < 10) {
        return `${positive ? "+" : "-"}${Math.abs(change).toFixed(1)}%`;
      }
      // Si es un valor monetario grande
      return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 2,
      }).format(Math.abs(change));
    }

    // Para strings, eliminar los signos +/- para agregarlos manualmente
    return change.replace(/^[+\-]/, "");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const formattedValue = formatValue(stat.label, stat.value);
        const formattedChange = formatChange(stat.change, stat.positive);

        // Determinar si debería tener borde superior
        // Las tarjetas de "Pedidos" y "Productos" siempre tendrán borde
        const shouldHaveBorder =
          stat.label.includes("Pedidos") ||
          stat.label.includes("Productos") ||
          index % 2 === 0;

        return (
          <AdminCard
            key={index}
            contentClassName="p-5"
            className={cn("hover:shadow-lg transition-shadow", stat.colorClass)}
            flat={!shouldHaveBorder} // Si shouldHaveBorder es true, flat será false
          >
            <div className="flex flex-col">
              {stat.icon && <div className="mb-2">{stat.icon}</div>}
              <p className="text-sm text-muted-foreground font-medium mb-2">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mb-1 text-primary">
                {formattedValue}
              </p>
              <p
                className={cn(
                  "text-sm flex items-center",
                  stat.positive ? "text-primary" : "text-destructive"
                )}
              >
                <span className="mr-1">{stat.positive ? "+" : "-"}</span>
                {formattedChange} desde ayer
              </p>
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
}
