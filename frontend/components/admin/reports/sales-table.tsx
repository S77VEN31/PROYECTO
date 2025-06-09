/**
 * Sales Report Table Component
 * Displays sales orders in a paginated table format
 */

"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus, PaymentMethod } from "colori-platform-shared";
import { Clock, RefreshCw, User } from "lucide-react";

interface SalesTableProps {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  isLoading?: boolean;
  error?: string | null;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

/**
 * Format currency for display
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
  }).format(amount);
};

/**
 * Format date for display
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get status badge variant
 */
const getStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.COMPLETED:
      return "default";
    case OrderStatus.PENDING:
      return "secondary";
    case OrderStatus.IN_PROGRESS:
      return "outline";
    case OrderStatus.CANCELLED:
      return "destructive";
    default:
      return "secondary";
  }
};

/**
 * Get status display text
 */
const getStatusDisplayText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.COMPLETED:
      return "Completada";
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.IN_PROGRESS:
      return "En Progreso";
    case OrderStatus.CANCELLED:
      return "Cancelada";
    default:
      return status;
  }
};

/**
 * Get payment method display text
 */
const getPaymentMethodDisplayText = (method: PaymentMethod | null) => {
  if (!method) return "Sin especificar";
  
  switch (method) {
    case PaymentMethod.CASH:
      return "Efectivo";
    case PaymentMethod.CARD:
      return "Tarjeta";
    case PaymentMethod.SINPE_MOVIL:
      return "SINPE Móvil";
    default:
      return method;
  }
};

/**
 * Sales table component
 */
export function SalesTable({
  orders,
  total,
  page,
  limit,
  isLoading,
  error,
  onPageChange,
  onRefresh,
}: SalesTableProps) {
  const totalPages = Math.ceil(total / limit);

  if (error) {
    return (
      <AdminCard title="Error">
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </AdminCard>
    );
  }

  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Orden</TableHead>
              <TableHead className="min-w-[150px]">Cliente</TableHead>
              <TableHead className="min-w-[80px]">Mesa</TableHead>
              <TableHead className="min-w-[100px]">Estado</TableHead>
              <TableHead className="min-w-[120px]">Método de Pago</TableHead>
              <TableHead className="min-w-[100px] text-right">Subtotal</TableHead>
              <TableHead className="min-w-[80px] text-right">Impuestos</TableHead>
              <TableHead className="min-w-[80px] text-right">Propina</TableHead>
              <TableHead className="min-w-[100px] text-right">Total</TableHead>
              <TableHead className="min-w-[150px]">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                    <span>Cargando reportes...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="text-muted-foreground">
                    <p className="text-lg font-medium mb-2">
                      No se encontraron órdenes
                    </p>
                    <p className="text-sm">
                      Intenta ajustar los filtros de búsqueda
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-mono">
                        #{order.reference || order.id.slice(-6)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{order.products?.length || 0} productos</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      Mesa {order.tableNumber}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {getStatusDisplayText(order.status)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">
                      {getPaymentMethodDisplayText(order.paymentMethod || null)}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-right font-medium">
                    {formatCurrency(order.subtotal || 0)}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    {formatCurrency(order.tax || 0)}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    {order.tip ? formatCurrency(order.tip) : "-"}
                  </TableCell>
                  
                  <TableCell className="text-right font-bold text-primary">
                    {formatCurrency(order.total || 0)}
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(order.createdAt)}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && total > 0 && (
        <div className="border-t p-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </AdminCard>
  );
} 