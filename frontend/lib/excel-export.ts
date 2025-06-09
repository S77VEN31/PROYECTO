/**
 * Excel Export Utility
 * Provides functions to export data to Excel files
 */

import { Order, OrderStatus, PaymentMethod } from "colori-platform-shared";
import * as XLSX from "xlsx";

/**
 * Format currency for Excel (without currency symbol)
 */
const formatCurrencyForExcel = (amount: number) => {
  return amount;
};

/**
 * Format date for Excel
 */
const formatDateForExcel = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-CR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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
    case PaymentMethod.CREDIT_CARD:
      return "Tarjeta de Crédito";
    case PaymentMethod.DEBIT_CARD:
      return "Tarjeta de Débito";
    default:
      return method;
  }
};

/**
 * Export sales report to Excel
 */
export const exportSalesReportToExcel = (
  orders: Order[],
  statistics: {
    totalSales: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalTips: number;
    totalTax: number;
    ordersByStatus: Record<string, number>;
    ordersByPaymentMethod: Record<string, number>;
    dailySales: Array<{ date: string; orders: number; revenue: number }>;
  },
  filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
    tableNumber?: number;
    search?: string;
  }
) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Prepare orders data
  const ordersData = orders.map((order, index) => ({
    "#": index + 1,
    "Número de Orden": order.reference || order.id.slice(-6),
    "Cliente": order.customerName,
    "Mesa": order.tableNumber,
    "Estado": getStatusDisplayText(order.status),
    "Método de Pago": getPaymentMethodDisplayText(order.paymentMethod || null),
    "Productos": order.products?.length || 0,
    "Subtotal (₡)": formatCurrencyForExcel(order.subtotal || 0),
    "Impuestos (₡)": formatCurrencyForExcel(order.tax || 0),
    "Propina (₡)": formatCurrencyForExcel(order.tip || 0),
    "Total (₡)": formatCurrencyForExcel(order.total || 0),
    "Fecha de Creación": formatDateForExcel(order.createdAt),
  }));

  // Create orders worksheet
  const ordersWorksheet = XLSX.utils.json_to_sheet(ordersData);

  // Set column widths for orders sheet
  const ordersColWidths = [
    { wch: 5 },   // #
    { wch: 15 },  // Número de Orden
    { wch: 20 },  // Cliente
    { wch: 8 },   // Mesa
    { wch: 12 },  // Estado
    { wch: 18 },  // Método de Pago
    { wch: 10 },  // Productos
    { wch: 12 },  // Subtotal
    { wch: 12 },  // Impuestos
    { wch: 12 },  // Propina
    { wch: 12 },  // Total
    { wch: 18 },  // Fecha
  ];
  ordersWorksheet["!cols"] = ordersColWidths;

  // Add orders sheet to workbook
  XLSX.utils.book_append_sheet(workbook, ordersWorksheet, "Órdenes");

  // Prepare statistics data
  const statisticsData = [
    { "Métrica": "Total de Ventas", "Valor": statistics.totalSales },
    { "Métrica": "Ingresos Totales (₡)", "Valor": formatCurrencyForExcel(statistics.totalRevenue) },
    { "Métrica": "Valor Promedio por Orden (₡)", "Valor": formatCurrencyForExcel(statistics.averageOrderValue) },
    { "Métrica": "Propinas Totales (₡)", "Valor": formatCurrencyForExcel(statistics.totalTips) },
    { "Métrica": "Impuestos Totales (₡)", "Valor": formatCurrencyForExcel(statistics.totalTax) },
    { "Métrica": "", "Valor": "" }, // Empty row
    { "Métrica": "ÓRDENES POR ESTADO", "Valor": "" },
    ...Object.entries(statistics.ordersByStatus).map(([status, count]) => ({
      "Métrica": `  ${getStatusDisplayText(status as OrderStatus)}`,
      "Valor": count,
    })),
    { "Métrica": "", "Valor": "" }, // Empty row
    { "Métrica": "ÓRDENES POR MÉTODO DE PAGO", "Valor": "" },
    ...Object.entries(statistics.ordersByPaymentMethod).map(([method, count]) => ({
      "Métrica": `  ${getPaymentMethodDisplayText(method as PaymentMethod)}`,
      "Valor": count,
    })),
  ];

  // Create statistics worksheet
  const statisticsWorksheet = XLSX.utils.json_to_sheet(statisticsData);

  // Set column widths for statistics sheet
  const statsColWidths = [
    { wch: 30 }, // Métrica
    { wch: 15 }, // Valor
  ];
  statisticsWorksheet["!cols"] = statsColWidths;

  // Add statistics sheet to workbook
  XLSX.utils.book_append_sheet(workbook, statisticsWorksheet, "Estadísticas");

  // Prepare daily sales data if available
  if (statistics.dailySales && statistics.dailySales.length > 0) {
    const dailySalesData = statistics.dailySales.map((day) => ({
      "Fecha": day.date,
      "Órdenes": day.orders,
      "Ingresos (₡)": formatCurrencyForExcel(day.revenue),
    }));

    const dailySalesWorksheet = XLSX.utils.json_to_sheet(dailySalesData);

    // Set column widths for daily sales sheet
    const dailySalesColWidths = [
      { wch: 12 }, // Fecha
      { wch: 10 }, // Órdenes
      { wch: 15 }, // Ingresos
    ];
    dailySalesWorksheet["!cols"] = dailySalesColWidths;

    // Add daily sales sheet to workbook
    XLSX.utils.book_append_sheet(workbook, dailySalesWorksheet, "Ventas Diarias");
  }

  // Prepare filters data
  const filtersData = [
    { "Filtro": "Fecha de Inicio", "Valor": filters.startDate || "No especificada" },
    { "Filtro": "Fecha de Fin", "Valor": filters.endDate || "No especificada" },
    { "Filtro": "Estado", "Valor": filters.status ? getStatusDisplayText(filters.status as OrderStatus) : "Todos" },
    { "Filtro": "Mesa", "Valor": filters.tableNumber || "Todas" },
    { "Filtro": "Búsqueda", "Valor": filters.search || "Sin filtro" },
    { "Filtro": "", "Valor": "" },
    { "Filtro": "Fecha de Exportación", "Valor": new Date().toLocaleDateString("es-CR") },
    { "Filtro": "Hora de Exportación", "Valor": new Date().toLocaleTimeString("es-CR") },
  ];

  // Create filters worksheet
  const filtersWorksheet = XLSX.utils.json_to_sheet(filtersData);

  // Set column widths for filters sheet
  const filtersColWidths = [
    { wch: 20 }, // Filtro
    { wch: 25 }, // Valor
  ];
  filtersWorksheet["!cols"] = filtersColWidths;

  // Add filters sheet to workbook
  XLSX.utils.book_append_sheet(workbook, filtersWorksheet, "Filtros Aplicados");

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
  const filename = `reporte-ventas-${timestamp}.xlsx`;

  // Write and download the file
  XLSX.writeFile(workbook, filename);

  return filename;
}; 