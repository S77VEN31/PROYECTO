"use client";

import { OrderApiService } from "@/api/entities/order.api";
import { ProductApiService } from "@/api/entities/product.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/types/orders";
import { Product } from "@/types/products";
import { Calendar, ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Adaptador para convertir órdenes de API a formato frontend
 */
const adaptOrderFromApi = async (apiOrder: any): Promise<Order> => {
  const orderId = apiOrder.reference ? apiOrder.reference : apiOrder.id;
  
  // Extraer productos de la orden API y convertirlos al formato frontend
  const productPromises = apiOrder.products.map(async (apiProduct: any) => {
    let productInfo: Partial<Product> = {};
    
    // Intentar obtener información del producto desde la API
    try {
      const fetchedProduct = await ProductApiService.getProductById({ id: apiProduct.productId });
      if (fetchedProduct) {
        productInfo = fetchedProduct;
      }
    } catch (err) {
      console.warn(`No se pudo obtener información para producto ${apiProduct.productId}:`, err);
    }
    
    // Crear objeto Product compatible con el frontend
    const product: Product = {
      id: apiProduct.productId,
      name: productInfo.name || apiProduct.name || "Producto sin nombre",
      description: productInfo.description || apiProduct.description || "",
      price: productInfo.price || apiProduct.price || 0,
      imageSrc: productInfo.imageSrc || productInfo.image || apiProduct.image || "/placeholder.jpg",
      image: productInfo.image || apiProduct.image || "/placeholder.jpg",
      available: productInfo.available !== undefined ? productInfo.available : true
    };

    return {
      product,
      quantity: apiProduct.quantity,
      specialInstructions: apiProduct.specialInstructions || "",
      status: apiProduct.status || "completed"
    };
  });
  
  // Esperar a que todas las consultas de productos terminen
  const products = await Promise.all(productPromises);

  return {
    id: apiOrder.id,
    customerName: apiOrder.customerName || "Cliente",
    tableNumber: apiOrder.tableNumber || 0,
    products,
    status: apiOrder.status || "completed",
    subtotal: apiOrder.subtotal || 0,
    tax: apiOrder.tax || 0,
    total: apiOrder.total || 0,
    tip: apiOrder.tip || null,
    paymentMethod: apiOrder.paymentMethod || null,
    createdAt: apiOrder.createdAt || new Date().toISOString(),
    updatedAt: apiOrder.updatedAt || new Date().toISOString(),
    completedAt: apiOrder.completedAt || null,
    serverName: apiOrder.serverName || "Sistema",
    reference: apiOrder.reference || orderId
  };
};

/**
 * Formatear precio en colones costarricenses
 */
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Traducir método de pago al español
 */
const translatePaymentMethod = (method: string | null): string => {
  if (!method) return "";
  
  const translations: Record<string, string> = {
    'cash': 'Efectivo',
    'card': 'Tarjeta',
    'sinpe': 'Sinpe Móvil',
    'sinpe_movil': 'Sinpe Móvil',
    'transfer': 'Transferencia'
  };
  
  return translations[method.toLowerCase()] || method;
};

/**
 * Obtener fechas para filtros rápidos
 */
const getDateFilters = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const lastMonth = new Date(today);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  return {
    today: today.toISOString().split('T')[0],
    yesterday: yesterday.toISOString().split('T')[0],
    lastWeek: lastWeek.toISOString().split('T')[0],
    lastMonth: lastMonth.toISOString().split('T')[0],
  };
};

export default function KitchenHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 15;

  const dateFilters = getDateFilters();

  /**
   * Obtener parámetros de fecha según el filtro seleccionado
   */
  const getDateParams = () => {
    const today = dateFilters.today;
    
    switch (dateFilter) {
      case "today":
        return { startDate: today, endDate: today };
      case "yesterday":
        return { startDate: dateFilters.yesterday, endDate: dateFilters.yesterday };
      case "lastWeek":
        return { startDate: dateFilters.lastWeek, endDate: today };
      case "lastMonth":
        return { startDate: dateFilters.lastMonth, endDate: today };
      default:
        return {};
    }
  };

  /**
   * Cargar órdenes completadas desde la API
   */
  const fetchCompletedOrders = async (page: number = 1, search: string = "") => {
    try {
      setLoading(true);
      setError(null);
      
      const dateParams = getDateParams();
      
      // Si hay búsqueda, obtener todas las órdenes que coincidan
      const searchParams = search ? {
        search: search,
        status: "completed",
        ...dateParams,
        limit: search ? 1000 : itemsPerPage, // Sin límite para búsqueda
        page: search ? 1 : page,
        sortBy: "createdAt",
        sortOrder: "desc" as const
      } : {
        status: "completed",
        ...dateParams,
        limit: itemsPerPage,
        page: page,
        sortBy: "createdAt",
        sortOrder: "desc" as const
      };

      console.log("Obteniendo historial de órdenes con parámetros:", searchParams);
      
      const response = await OrderApiService.getOrders(searchParams);
      
      if (response && response.orders) {
        // Adaptar las órdenes al formato frontend (ahora es async)
        const frontendOrdersPromises = response.orders.map(adaptOrderFromApi);
        const adaptedOrders = await Promise.all(frontendOrdersPromises);
        
        if (search) {
          // Para búsqueda, mostrar todos los resultados sin paginación
          setOrders(adaptedOrders);
          setTotalOrders(adaptedOrders.length);
          setTotalPages(1);
          setCurrentPage(1);
        } else {
          // Para navegación normal, usar paginación
          setOrders(adaptedOrders);
          setTotalOrders(response.total);
          setTotalPages(Math.ceil(response.total / itemsPerPage));
          setCurrentPage(page);
        }
        
        console.log(`Historial cargado: ${adaptedOrders.length} órdenes completadas`);
      } else {
        setOrders([]);
        setTotalOrders(0);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error al cargar historial de órdenes:", err);
      setError("Error al cargar el historial de órdenes");
      toast.error("Error al cargar el historial");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejar cambio de página
   */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      fetchCompletedOrders(newPage, searchQuery);
    }
  };

  /**
   * Manejar cambio de búsqueda
   */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // No llamar fetchCompletedOrders aquí, el useEffect se encargará
  };

  /**
   * Manejar cambio de filtro de fecha
   */
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    setCurrentPage(1);
    // No llamar fetchCompletedOrders aquí, el useEffect se encargará
  };

  /**
   * Obtener texto del filtro de fecha
   */
  const getDateFilterText = (filter: string) => {
    switch (filter) {
      case "today": return "Hoy";
      case "yesterday": return "Ayer";
      case "lastWeek": return "Última Semana";
      case "lastMonth": return "Último Mes";
      default: return "Todas las fechas";
    }
  };

  // Cargar órdenes cuando cambie el filtro de fecha o la búsqueda
  useEffect(() => {
    fetchCompletedOrders(1, searchQuery);
  }, [dateFilter, searchQuery]); // Depende de dateFilter y searchQuery

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Historial de Órdenes</h1>
          <p className="text-muted-foreground mt-1">
            Revisa las órdenes completadas ({totalOrders} total)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Filtro de fecha */}
          <Select value={dateFilter} onValueChange={handleDateFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las fechas</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="yesterday">Ayer</SelectItem>
              <SelectItem value="lastWeek">Última Semana</SelectItem>
              <SelectItem value="lastMonth">Último Mes</SelectItem>
            </SelectContent>
          </Select>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por ID o cliente..."
              className="w-full sm:w-[300px] pl-10"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filtro activo */}
      {dateFilter !== "all" && (
        <div className="mb-4">
          <Badge variant="secondary" className="text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            Mostrando: {getDateFilterText(dateFilter)}
          </Badge>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Lista de órdenes */}
      <div className="space-y-4">
        {loading && orders.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-muted-foreground">Cargando historial...</p>
            </div>
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="p-4 bg-muted/50 flex flex-row items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      Orden #{order.reference || order.id}
                    </CardTitle>
                    <Badge variant="completed">Completada</Badge>
                  </div>
                  <CardDescription>
                    Cliente: {order.customerName}
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
                    {order.products.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.product.name}
                        </span>
                        <span>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-2 border-t space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    {order.tax > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Impuestos:</span>
                        <span>{formatPrice(order.tax)}</span>
                      </div>
                    )}
                    {order.tip && order.tip > 0 && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Propina:</span>
                        <span>{formatPrice(order.tip)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        {order.paymentMethod && (
                          <span>Pago: {translatePaymentMethod(order.paymentMethod)}</span>
                        )}
                      </div>
                      <p className="font-medium text-lg">
                        Total: {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No se encontraron órdenes que coincidan con "${searchQuery}"`
                : "No hay órdenes completadas en este período"
              }
            </p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {!searchQuery && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages} ({totalOrders} órdenes total)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Indicador de búsqueda activa */}
      {searchQuery && (
        <div className="mt-4 text-center">
          <Badge variant="outline" className="text-xs">
            Mostrando todos los resultados para "{searchQuery}"
          </Badge>
        </div>
      )}
    </div>
  );
}
