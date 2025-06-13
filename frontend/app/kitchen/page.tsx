"use client";

import { OrderApiService } from "@/api/entities/order.api";
import { ProductApiService } from "@/api/entities/product.api";
import { KitchenStats } from "@/components/kitchen/kitchen-stats";
import { OrdersList } from "@/components/kitchen/orders-list";
import { PaymentMethodDialog } from "@/components/kitchen/payment-method-dialog";
import { StatusFilter } from "@/components/kitchen/status-filter";
import { Order, OrderProduct, ProductOrderStatus } from "@/types/orders";
import { Product } from "@/types/products";
import { OrderStatus, PaymentMethod } from "colori-platform-shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Adaptador para convertir órdenes de API a formato frontend
const adaptOrderFromApi = async (apiOrder: any): Promise<Order> => {
  // Usar la referencia de la orden (número de orden) si está disponible
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
      image: productInfo.image || apiProduct.image || "/placeholder.jpg", // Para compatibilidad
      available: productInfo.available !== undefined ? productInfo.available : true
    };

    // Crear OrderProduct compatible con el frontend
    return {
      product,
      quantity: apiProduct.quantity,
      specialInstructions: apiProduct.specialInstructions || "",
      // Usar el estado del producto si existe, o "pending" como fallback
      status: (apiProduct.status as ProductOrderStatus) || "pending"
    };
  });
  
  // Esperar a que todas las consultas de productos terminen
  const products: OrderProduct[] = await Promise.all(productPromises);

  // Crear objeto Order compatible con el frontend
  return {
    id: apiOrder.id, // Mantener el ID original para las actualizaciones
    customerName: apiOrder.customerName || "Cliente",
    tableNumber: apiOrder.tableNumber || 0,
    products,
    status: apiOrder.status || "pending",
    subtotal: apiOrder.subtotal || 0,
    tax: apiOrder.tax || 0,
    total: apiOrder.total || 0,
    tip: apiOrder.tip || null,
    paymentMethod: apiOrder.paymentMethod || null,
    createdAt: apiOrder.createdAt || new Date().toISOString(),
    updatedAt: apiOrder.updatedAt || new Date().toISOString(),
    completedAt: apiOrder.completedAt || null,
    serverName: apiOrder.serverName || "Sistema",
    // Agregar referencia para mostrar como número de orden
    reference: apiOrder.reference || orderId
  };
};

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Payment method dialog state
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [orderToComplete, setOrderToComplete] = useState<Order | null>(null);

  // Filtrar y ordenar las órdenes según el estado seleccionado y prioridad
  // Excluir órdenes completadas ya que van al historial
  const filteredOrders = (() => {
    // Filtrar solo órdenes pendientes y en progreso
    const activeOrders = orders.filter((order) => 
      order.status === "pending" || order.status === "in-progress"
    );
    
    // Si hay un filtro de estado, aplicarlo a las órdenes activas
    const filtered = statusFilter
      ? activeOrders.filter((order) => order.status === statusFilter)
      : activeOrders;
    
    // Ordenar según prioridad: primero en preparación, luego pendientes
    return [...filtered].sort((a, b) => {
      // Definir prioridad para cada estado
      const getPriority = (status: string): number => {
        switch (status) {
          case "in-progress": return 1; // Prioridad más alta
          case "pending": return 2;
          default: return 3;
        }
      };
      
      // Comparar prioridades
      const priorityA = getPriority(a.status);
      const priorityB = getPriority(b.status);
      
      // Ordenar por prioridad (ascendente)
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // Si tienen la misma prioridad, ordenar por fecha (más recientes primero)
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  })();

  // Contar órdenes por estado para los filtros y estadísticas
  // Solo contar órdenes activas (pendientes y en progreso)
  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;
  
  const inProgressCount = orders.filter(
    (order) => order.status === "in-progress"
  ).length;
  
  // Para las estadísticas, mantener el conteo de completadas
  const completedCount = orders.filter(
    (order) => order.status === "completed"
  ).length;

  // Calcular tiempo promedio de preparación (en minutos)
  const calculateAverageTime = () => {
    const completedOrders = orders.filter(
      (order) => order.status === "completed" && order.completedAt
    );
    
    if (completedOrders.length === 0) return "N/A";
    
    const totalMinutes = completedOrders.reduce((sum, order) => {
      const created = new Date(order.createdAt).getTime();
      const completed = new Date(order.completedAt!).getTime();
      return sum + (completed - created) / (1000 * 60); // Convertir a minutos
    }, 0);
    
    const average = totalMinutes / completedOrders.length;
    return `${Math.round(average)} min`;
  };

  // Cargar órdenes desde la API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log("Obteniendo órdenes...");
      
      // Simplificar la consulta para obtener todas las órdenes sin filtros
      const response = await OrderApiService.getOrders({
        // Sin filtros para asegurar que obtenemos todas las órdenes
        limit: 100
      });
      console.log("Respuesta API órdenes:", response);
      
      if (response && response.orders) {
        console.log(`Se encontraron ${response.orders.length} órdenes`);
        
        // Adaptar las órdenes al formato frontend (ahora es async)
        const frontendOrdersPromises = response.orders.map(adaptOrderFromApi);
        const frontendOrders = await Promise.all(frontendOrdersPromises);
        
        console.log("Órdenes adaptadas:", frontendOrders);
        setOrders(frontendOrders);
        setError(null);
      } else {
        console.error("Respuesta de API inválida:", response);
        setError("No se pudieron cargar las órdenes");
      }
    } catch (err) {
      console.error("Error al cargar órdenes:", err);
      setError(`Error al cargar las órdenes: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar el estado de una orden
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus, paymentMethod?: PaymentMethod | null) => {
    try {
      console.log(`Actualizando orden ${orderId} a estado ${newStatus}`);
      
      // Si se está completando la orden y no se especificó método de pago, mostrar modal
      if (newStatus === OrderStatus.COMPLETED && paymentMethod === undefined) {
        const orderToComplete = orders.find(o => o.id === orderId);
        if (orderToComplete) {
          setOrderToComplete(orderToComplete);
          setPaymentDialogOpen(true);
          return; // Salir aquí, la actualización continuará después del modal
        }
      }
      
      // Actualización optimista: actualizar UI inmediatamente
      const updatedOrdersCopy = [...orders];
      const orderIndex = updatedOrdersCopy.findIndex(o => o.id === orderId);
      
      if (orderIndex === -1) {
        toast.error(`Orden #${orderId} no encontrada en el estado`);
        return;
      }
      
      // Crear objeto de orden actualizado para UI
      const updatedOrder = {
        ...updatedOrdersCopy[orderIndex],
        status: newStatus,
        ...(newStatus === OrderStatus.COMPLETED ? { 
          completedAt: new Date().toISOString(),
          paymentMethod: paymentMethod as any || null
        } : {})
      };
      
      // Actualizar el estado local inmediatamente
      updatedOrdersCopy[orderIndex] = updatedOrder;
      setOrders(updatedOrdersCopy);
      
      // Enviar actualización al API
      const result = await OrderApiService.updateOrder(orderId, {
        status: newStatus,
        // Si la orden se completa, agregar la fecha de completado y método de pago
        ...(newStatus === OrderStatus.COMPLETED ? { 
          completedAt: new Date().toISOString(),
          paymentMethod: paymentMethod || null
        } : {})
      });
      
      if (result && result.updated) {
        console.log(`API confirmó actualización de orden ${orderId}:`, result);
        toast.success(`Orden #${orderId} actualizada a ${getStatusText(newStatus)}`);
      } else {
        console.error(`Fallo en actualización API de orden ${orderId}:`, result);
        toast.error(`No se pudo actualizar la orden #${orderId}`);
        
        // Revertir cambios optimistas si la API falla
        fetchOrders();
      }
    } catch (err) {
      console.error(`Error al actualizar la orden ${orderId}:`, err);
      toast.error(`Error al actualizar la orden #${orderId}`);
      
      // Revertir cambios optimistas si hay error
      fetchOrders();
    }
  };

  // Actualizar el estado de un producto específico en una orden
  const updateProductStatus = async (orderId: string, productId: string, newStatus: ProductOrderStatus) => {
    try {
      // Primero, encontrar la orden actual
      const currentOrder = orders.find(order => order.id === orderId);
      if (!currentOrder) {
        toast.error(`Orden #${orderId} no encontrada`);
        return;
      }
      
      console.log(`Actualizando producto ${productId} en orden ${orderId} a estado ${newStatus}`);
      
      // Crear una copia del estado actual para actualización optimista de UI
      const updatedOrdersCopy = [...orders];
      const orderIndex = updatedOrdersCopy.findIndex(o => o.id === orderId);
      
      if (orderIndex === -1) {
        toast.error(`Orden #${orderId} no encontrada en el estado`);
        return;
      }
      
      // Actualizar localmente el estado del producto para UI inmediata
      const updatedProducts = currentOrder.products.map(product => {
        if (product.product.id === productId) {
          console.log(`Encontrado producto ${productId} - Actualizando estado a ${newStatus}`);
          return {
            ...product,
            status: newStatus
          };
        }
        return product;
      });
      
      // Determinar si todos los productos están completados o en progreso
      const allCompleted = updatedProducts.every(p => p.status === "completed");
      const anyInProgress = updatedProducts.some(p => p.status === "in-progress");
      
      // Determinar el nuevo estado de la orden basado en los productos
      let orderStatus = currentOrder.status as OrderStatus;
      if (allCompleted && currentOrder.status !== OrderStatus.COMPLETED) {
        // Si todos los productos están completados y la orden no estaba completada antes,
        // mostrar el modal de método de pago
        setOrderToComplete(currentOrder);
        setPaymentDialogOpen(true);
        return; // Salir aquí, la actualización continuará después del modal
      } else if (anyInProgress) {
        orderStatus = OrderStatus.IN_PROGRESS;
      }
      
      // Actualizar UI inmediatamente (optimista)
      const optimisticallyUpdatedOrder = {
        ...currentOrder,
        products: updatedProducts,
        status: orderStatus
      };
      
      updatedOrdersCopy[orderIndex] = optimisticallyUpdatedOrder;
      setOrders(updatedOrdersCopy);
      
      // Mapear los productos al formato de la API
      const apiProducts = updatedProducts.map(p => ({
        productId: p.product.id,
        quantity: p.quantity,
        specialInstructions: p.specialInstructions,
        status: p.status
      }));
      
      // Actualizar la orden con los productos actualizados y posiblemente un nuevo estado
      console.log(`Enviando actualización al API: Orden ${orderId}, Estado: ${orderStatus}`);
      console.log('Productos actualizados:', apiProducts);
      
      const result = await OrderApiService.updateOrder(orderId, {
        status: orderStatus,
        products: apiProducts,
        ...(orderStatus === OrderStatus.COMPLETED ? { completedAt: new Date().toISOString() } : {})
      });
      
      if (result && result.updated) {
        console.log(`API confirmó actualización de orden ${orderId}:`, result);
        toast.success(`Producto en orden #${orderId} actualizado`);
      } else {
        console.error(`Fallo en actualización API de orden ${orderId}:`, result);
        toast.error(`No se pudo actualizar el producto en la orden #${orderId}`);
        
        // Revertir cambios optimistas si la API falla
        fetchOrders();
      }
    } catch (err) {
      console.error(`Error al actualizar producto en orden ${orderId}:`, err);
      toast.error(`Error al actualizar producto en orden #${orderId}`);
      
      // Revertir cambios optimistas si hay error
      fetchOrders();
    }
  };

  /**
   * Handle payment method confirmation
   */
  const handlePaymentMethodConfirm = (paymentMethod: PaymentMethod | null) => {
    if (orderToComplete) {
      // Continuar con la actualización de la orden con el método de pago seleccionado
      updateOrderStatus(orderToComplete.id, OrderStatus.COMPLETED, paymentMethod);
    }
    
    // Cerrar modal y limpiar estado
    setPaymentDialogOpen(false);
    setOrderToComplete(null);
  };

  // Manejar acciones sobre las órdenes
  const handleOrderAction = (action: string, orderId: string, productId?: string) => {
    if (action === "start-order") {
      updateOrderStatus(orderId, OrderStatus.IN_PROGRESS);
    } else if (action === "complete-order") {
      updateOrderStatus(orderId, OrderStatus.COMPLETED);
    } else if (action === "start-product" && productId) {
      updateProductStatus(orderId, productId, "in-progress");
    } else if (action === "complete-product" && productId) {
      updateProductStatus(orderId, productId, "completed");
    } else if (action === "details") {
      // Aquí se podría implementar mostrar detalles de la orden
      console.log(`Ver detalles de orden: ${orderId}`);
    }
  };

  // Función auxiliar para obtener texto de estado
  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      [OrderStatus.PENDING]: "Pendiente",
      [OrderStatus.IN_PROGRESS]: "En Preparación",
      [OrderStatus.COMPLETED]: "Completada",
      [OrderStatus.CANCELLED]: "Cancelada"
    };
    return statusMap[status] || status;
  };

  // Cargar órdenes al montar el componente y cada 30 segundos
  useEffect(() => {
    fetchOrders();
    
    // Configurar intervalo para actualizar órdenes cada 30 segundos
    const intervalId = setInterval(fetchOrders, 30000);
    
    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Cocina</h1>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-sm text-muted-foreground">Actualizando...</span>
          )}
          <a 
            href="/kitchen/history"
            className="text-sm px-3 py-1 bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground rounded-md transition-colors"
          >
            Ver Historial
          </a>
          <button 
            onClick={fetchOrders}
            className="text-sm px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <KitchenStats
        pendingOrders={pendingCount}
        completedOrders={completedCount}
        averageTime={calculateAverageTime()}
        totalOrders={orders.length}
      />

      <StatusFilter
        activeStatus={statusFilter}
        onFilterChange={setStatusFilter}
        pendingCount={pendingCount}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
      />

      <OrdersList 
        orders={filteredOrders} 
        onOrderAction={handleOrderAction} 
        isLoading={loading}
      />

      {/* Payment Method Dialog */}
      {orderToComplete && (
        <PaymentMethodDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          onConfirm={handlePaymentMethodConfirm}
          orderNumber={orderToComplete.reference || orderToComplete.id}
          customerName={orderToComplete.customerName}
          total={orderToComplete.total}
        />
      )}
    </div>
  );
}
