"use client";

import { AdminCard } from "@/components/admin/admin-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Product } from "@/types/products";

export interface PopularItem {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  category?: string;
  profit?: number;
  stock?: number;
  // Permite asociación opcional con el producto original
  product?: Product;
}

interface PopularItemsProps {
  items: PopularItem[];
}

export function PopularItems({ items }: PopularItemsProps) {
  // Format currency consistently
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Determine color classes based on sales rank
  const getSalesRankClass = (index: number): string => {
    switch (index) {
      case 0:
        return "font-bold text-primary";
      case 1:
        return "font-semibold text-primary/90";
      case 2:
        return "font-medium text-primary/80";
      default:
        return "text-foreground";
    }
  };

  return (
    <AdminCard
      title="Top Productos"
      contentClassName="p-0"
      titleClassName="text-xl px-5 py-4"
      headerClassName="pb-0 pt-4 px-5"
      className="overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/10 hover:bg-primary/15">
            <TableHead className="font-semibold pl-5">Producto</TableHead>
            <TableHead className="font-semibold text-center">
              Categoría
            </TableHead>
            <TableHead className="font-semibold text-center">Ventas</TableHead>
            <TableHead className="font-semibold text-right pr-5">
              Ingresos
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              className={cn(
                "transition-colors",
                index % 2 === 0 ? "bg-muted/20" : "",
                "hover:bg-primary/5"
              )}
            >
              <TableCell
                className={cn(
                  "font-medium py-3 border-l-2 pl-5",
                  index === 0 ? "border-l-primary" : "border-l-transparent"
                )}
              >
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.category || "Sin categoría"}
              </TableCell>
              <TableCell
                className={cn("text-center", getSalesRankClass(index))}
              >
                {item.sales}
              </TableCell>
              <TableCell className="text-right font-medium text-primary pr-5">
                {formatCurrency(item.revenue)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminCard>
  );
}
