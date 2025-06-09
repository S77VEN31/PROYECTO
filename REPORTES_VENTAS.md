# Reportes de Ventas - Documentación

## Descripción General

Se ha implementado un sistema completo de reportes de ventas que permite visualizar, filtrar y exportar datos de órdenes completadas. La funcionalidad incluye estadísticas detalladas, filtros avanzados y exportación a Excel.

## Características Principales

### 🔍 Filtros Avanzados
- **Rango de fechas**: Fecha de inicio y fin
- **Estado de orden**: Completadas, pendientes, en progreso, canceladas
- **Número de mesa**: Filtrar por mesa específica
- **Búsqueda por cliente**: Buscar por nombre del cliente
- **Filtros rápidos**: Hoy, ayer, última semana, últimos 30 días

### 📊 Estadísticas Detalladas
- **Métricas principales**:
  - Total de ventas (cantidad de órdenes)
  - Ingresos totales
  - Valor promedio por orden
  - Propinas totales
- **Análisis por categorías**:
  - Órdenes por estado
  - Órdenes por método de pago
- **Información fiscal**:
  - Subtotal, impuestos y total

### 📋 Tabla de Órdenes
- **Paginación**: 10 órdenes por página (configurable)
- **Columnas mostradas**:
  - Número de orden
  - Cliente
  - Mesa
  - Estado
  - Método de pago
  - Subtotal, impuestos, propina y total
  - Fecha de creación
- **Responsive**: Se adapta a diferentes tamaños de pantalla

### 📥 Exportación a Excel
- **Múltiples hojas**:
  - Órdenes: Datos detallados de todas las órdenes
  - Estadísticas: Métricas y análisis
  - Ventas Diarias: Resumen por día
  - Filtros Aplicados: Configuración utilizada
- **Sin paginación**: Exporta todos los datos que coinciden con los filtros
- **Formato profesional**: Columnas ajustadas y datos formateados

## Estructura Técnica

### Backend

#### Nuevos Endpoints
```
GET /orders/reports/sales
- Obtiene reportes de ventas con paginación
- Parámetros: page, limit, status, tableNumber, search, startDate, endDate

GET /orders/reports/sales/export  
- Obtiene todos los datos para exportación (sin paginación)
- Parámetros: status, tableNumber, search, startDate, endDate
```

#### Servicios Agregados
- `OrderService.getSalesReport()`: Reportes con paginación
- `OrderService.getSalesReportForExport()`: Datos completos para exportación
- `OrderService.calculateSalesStatistics()`: Cálculo de estadísticas

### Frontend

#### Nuevos Componentes
- `SalesFilters`: Componente de filtros con validación
- `SalesStats`: Visualización de estadísticas con cards
- `SalesTable`: Tabla paginada con datos de órdenes
- `SalesReportsPage`: Página principal que integra todo

#### Utilidades
- `excel-export.ts`: Funciones para generar archivos Excel con múltiples hojas

### Shared

#### Nuevos Tipos
```typescript
interface GetSalesReportRequest extends PaginationParams {
  status?: string;
  tableNumber?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

interface SalesStatistics {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalTips: number;
  totalTax: number;
  ordersByStatus: Record<string, number>;
  ordersByPaymentMethod: Record<string, number>;
  dailySales: Array<{ date: string; orders: number; revenue: number }>;
}
```

## Navegación

### Acceso desde Admin
La nueva página de reportes está disponible en:
- **Sidebar**: Sección "Reportes" con ícono de documento
- **URL**: `/admin/reports`
- **Mobile**: Incluido en el menú móvil

## Uso

### 1. Aplicar Filtros
1. Seleccionar rango de fechas (opcional)
2. Elegir estado de órdenes (por defecto: completadas)
3. Filtrar por mesa específica (opcional)
4. Buscar por nombre de cliente (opcional)
5. Usar filtros rápidos para rangos comunes
6. Hacer clic en "Aplicar Filtros"

### 2. Visualizar Estadísticas
- Las estadísticas se actualizan automáticamente con los filtros aplicados
- Incluyen totales, promedios y distribuciones por categorías

### 3. Navegar por la Tabla
- Usar los controles de paginación en la parte inferior
- Ver detalles de cada orden en las columnas
- La tabla se actualiza automáticamente al cambiar de página

### 4. Exportar a Excel
1. Configurar los filtros deseados
2. Hacer clic en "Exportar a Excel"
3. El archivo se descarga automáticamente con timestamp
4. Incluye todas las órdenes que coinciden con los filtros (sin paginación)

## Consideraciones de Rendimiento

- **Paginación**: Solo se cargan 10 órdenes por página en la vista
- **Filtros optimizados**: Las consultas incluyen índices en campos clave
- **Exportación eficiente**: Se obtienen todos los datos en una sola consulta
- **Cálculo de estadísticas**: Se realiza en el backend para mejor rendimiento

## Seguridad

- **Autenticación**: Requiere estar logueado como administrador
- **Validación**: Todos los parámetros son validados en backend
- **Sanitización**: Los datos se sanitizan antes de mostrar

## Futuras Mejoras

- [ ] Gráficos interactivos con Chart.js
- [ ] Reportes programados por email
- [ ] Comparación entre períodos
- [ ] Filtros por productos específicos
- [ ] Exportación a PDF
- [ ] Dashboard en tiempo real 