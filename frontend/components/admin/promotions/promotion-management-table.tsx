"use client";

import { AdminCard } from "@/components/admin/admin-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetPromotionsRequestParams,
  Promotion,
  PromotionCreate,
  TimeStamps,
} from "colori-platform-shared";
import {
  CalendarCheck,
  CalendarX,
  Clock,
  Code,
  Edit,
  Eye,
  EyeOff,
  Hash,
  MoreHorizontal,
  Package,
  Percent,
  RefreshCw,
  Search,
  ShoppingCart,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { DeletePromotionDialog } from "./delete-promotion-dialog";
import { EditPromotionDialog } from "./edit-promotion-dialog";

/**
 * Extended Promotion interface with explicit TimeStamps properties
 * This ensures TypeScript recognizes the createdAt and updatedAt properties
 */
interface PromotionWithTimestamps extends Promotion, TimeStamps {}

/**
 * Promotion management table props
 */
interface PromotionManagementTableProps {
  promotions: Promotion[];
  isLoading: boolean;
  error: string | null;
  filters: GetPromotionsRequestParams;
  onFiltersChange: (filters: GetPromotionsRequestParams) => void;
  onPromotionUpdated: (promotion: Promotion) => void;
  onPromotionDeleted: (promotionId: string) => void;
  onRefresh: () => void;
}

/**
 * Get promotion type label
 */
function getPromotionTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    discount: "Descuento",
    bogo: "Compra 1 Lleva 2",
    bundle: "Paquete",
    "free-shipping": "Envío Gratis",
    "gift-with-purchase": "Regalo con Compra",
    seasonal: "Estacional",
  };
  return typeLabels[type] || type;
}

/**
 * Get promotion status
 */
function getPromotionStatus(promotion: Promotion) {
  // Cast to PromotionCreate to access the properties we need
  const promotionData = promotion as unknown as PromotionCreate;
  const now = new Date();
  const startDate = new Date(promotionData.startDate);
  const endDate = new Date(promotionData.endDate);

  if (!promotionData.active)
    return {
      status: "inactive",
      label: "Inactiva",
      variant: "secondary" as const,
    };
  if (endDate < now)
    return {
      status: "expired",
      label: "Expirada",
      variant: "destructive" as const,
    };
  if (startDate > now)
    return {
      status: "upcoming",
      label: "Próxima",
      variant: "outline" as const,
    };
  return { status: "active", label: "Activa", variant: "default" as const };
}

/**
 * Promotion management table component
 * @param props - Component props
 * @returns JSX element
 */
export function PromotionManagementTable({
  promotions,
  isLoading,
  error,
  filters,
  onFiltersChange,
  onPromotionUpdated,
  onPromotionDeleted,
  onRefresh,
}: PromotionManagementTableProps): React.JSX.Element {
  console.log("PromotionManagementTable - promotions:", promotions);
  console.log(
    "PromotionManagementTable - promotions.length:",
    promotions.length
  );
  console.log("PromotionManagementTable - isLoading:", isLoading);
  console.log("PromotionManagementTable - error:", error);

  // State for dialogs and loading
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatingPromotion, setUpdatingPromotion] = useState<Promotion | null>(
    null
  );

  /**
   * Handle promotion status toggle
   */
  const handleTogglePromotionStatus = async (promotion: Promotion) => {
    try {
      setUpdatingPromotion(promotion);

      // Note: Since 'active' is not part of PromotionUpdate, we would need to handle this differently
      // For now, we'll comment this out until the backend supports updating active status
      console.warn(
        "Active status toggle not implemented - active field not in PromotionUpdate type"
      );

      // await PromotionApiService.updatePromotion(
      //   { id: promotion.id },
      //   { /* active field not available in PromotionUpdate */ }
      // );
      // onPromotionUpdated({ ...promotion, active: !promotionData.active } as Promotion);
    } catch (error) {
      console.error("Error toggling promotion status:", error);
    } finally {
      setUpdatingPromotion(null);
    }
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFiltersChange({
      ...filters,
      search: value || undefined,
      page: 1, // Reset to first page when searching
    });
  };

  /**
   * Handle type filter change
   */
  const handleTypeFilterChange = (type: string) => {
    onFiltersChange({
      ...filters,
      type: type === "all" ? undefined : type,
      page: 1, // Reset to first page when filtering
    });
  };

  /**
   * Handle active filter change
   */
  const handleActiveFilterChange = (value: string) => {
    let activeValue: boolean | undefined;
    if (value === "active") activeValue = true;
    else if (value === "inactive") activeValue = false;
    else activeValue = undefined;

    onFiltersChange({
      ...filters,
      active: activeValue,
      page: 1, // Reset to first page when filtering
    });
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Format date and time for display
   */
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Format discount value for display
   */
  const formatDiscountValue = (promotion: Promotion) => {
    const promotionData = promotion as unknown as PromotionCreate;
    if (promotionData.discountPercent) {
      return `${promotionData.discountPercent}%`;
    }
    if (promotionData.discountValue) {
      return `€${promotionData.discountValue.toFixed(2)}`;
    }
    return "N/A";
  };

  /**
   * Format minimum purchase for display
   */
  const formatMinimumPurchase = (promotion: Promotion) => {
    const promotionData = promotion as unknown as PromotionCreate;
    if (promotionData.minimumPurchase) {
      return `€${promotionData.minimumPurchase.toFixed(2)}`;
    }
    return "-";
  };

  /**
   * Format usage limit for display
   */
  const formatUsageLimit = (promotion: Promotion) => {
    const promotionData = promotion as unknown as PromotionCreate;
    if (promotionData.usageLimit) {
      return promotionData.usageLimit.toString();
    }
    return "Ilimitado";
  };

  /**
   * Get applicable products count
   */
  const getApplicableProductsCount = (promotion: Promotion) => {
    const promotionData = promotion as unknown as PromotionCreate;
    return promotionData.applicableProducts?.length || 0;
  };

  /**
   * Get applicable categories count
   */
  const getApplicableCategoriesCount = (promotion: Promotion) => {
    const promotionData = promotion as unknown as PromotionCreate;
    return promotionData.applicableCategories?.length || 0;
  };

  if (error) {
    return (
      <AdminCard title="Error">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </div>
      </AdminCard>
    );
  }

  return (
    <>
      <AdminCard className="overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col gap-4 p-6 border-b">
          {/* Search and Type Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                placeholder="Buscar promociones..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Select
                value={filters.type || "all"}
                onValueChange={handleTypeFilterChange}
              >
                <SelectTrigger className="w-full sm:w-48 min-w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="discount">Descuento</SelectItem>
                  <SelectItem value="bogo">Compra 1 Lleva 2</SelectItem>
                  <SelectItem value="bundle">Paquete</SelectItem>
                  <SelectItem value="free-shipping">Envío Gratis</SelectItem>
                  <SelectItem value="gift-with-purchase">
                    Regalo con Compra
                  </SelectItem>
                  <SelectItem value="seasonal">Estacional</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={
                  filters.active === true
                    ? "active"
                    : filters.active === false
                    ? "inactive"
                    : "all"
                }
                onValueChange={handleActiveFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40 min-w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="inactive">Inactivas</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={onRefresh}
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                title="Actualizar lista"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Promoción</TableHead>
                <TableHead className="min-w-[120px]">Tipo</TableHead>
                <TableHead className="min-w-[100px]">Descuento</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">
                  Estado
                </TableHead>
                <TableHead className="min-w-[100px] hidden lg:table-cell">
                  Código
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Compra Mín.
                </TableHead>
                <TableHead className="min-w-[100px] hidden xl:table-cell">
                  Límite Uso
                </TableHead>
                <TableHead className="min-w-[100px] hidden xl:table-cell">
                  Productos
                </TableHead>
                <TableHead className="min-w-[100px] hidden xl:table-cell">
                  Categorías
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Fecha Inicio
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Fecha Fin
                </TableHead>
                <TableHead className="min-w-[120px] hidden 2xl:table-cell">
                  Creado
                </TableHead>
                <TableHead className="min-w-[120px] hidden 2xl:table-cell">
                  Actualizado
                </TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Cargando promociones...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : promotions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8">
                    <div className="text-muted-foreground">
                      <p className="text-lg font-medium mb-2">
                        No se encontraron promociones
                      </p>
                      <p className="text-sm">
                        {filters.search ||
                        filters.type ||
                        filters.active !== undefined
                          ? "Intenta ajustar los filtros de búsqueda"
                          : "Comienza creando tu primera promoción"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                promotions.map((promotion) => {
                  const status = getPromotionStatus(promotion);
                  const promotionData = promotion as unknown as PromotionCreate;
                  const productsCount = getApplicableProductsCount(promotion);
                  const categoriesCount =
                    getApplicableCategoriesCount(promotion);

                  return (
                    <TableRow key={promotion.id}>
                      <TableCell className="min-w-[200px]">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-foreground">
                            {promotionData.name}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {promotionData.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Badge variant="outline" className="text-xs">
                          {getPromotionTypeLabel(promotionData.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[100px]">
                        <div className="flex items-center gap-1">
                          <Percent className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">
                            {formatDiscountValue(promotion)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell min-w-[100px]">
                        <Badge variant={status.variant} className="text-xs">
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[100px]">
                        {promotionData.code ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Code className="h-3 w-3 text-muted-foreground" />
                            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                              {promotionData.code}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                          <span>{formatMinimumPurchase(promotion)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell min-w-[100px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{formatUsageLimit(promotion)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell min-w-[100px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          <span
                            className={
                              productsCount > 0
                                ? "font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {productsCount > 0 ? productsCount : "Todos"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell min-w-[100px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          <span
                            className={
                              categoriesCount > 0
                                ? "font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {categoriesCount > 0 ? categoriesCount : "Todas"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(promotionData.startDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarX className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(promotionData.endDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden 2xl:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {(promotion as PromotionWithTimestamps).createdAt
                              ? formatDateTime(
                                  (promotion as PromotionWithTimestamps)
                                    .createdAt
                                )
                              : "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden 2xl:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <Hash className="h-3 w-3 text-muted-foreground" />
                          <span>
                            {(promotion as PromotionWithTimestamps).updatedAt
                              ? formatDateTime(
                                  (promotion as PromotionWithTimestamps)
                                    .updatedAt
                                )
                              : "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right min-w-[80px]">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPromotion(promotion);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleTogglePromotionStatus(promotion)
                              }
                              disabled={updatingPromotion?.id === promotion.id}
                            >
                              {promotionData.active ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Desactivar
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Activar
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPromotion(promotion);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </AdminCard>

      {/* Edit Promotion Dialog */}
      {selectedPromotion && (
        <EditPromotionDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          promotion={selectedPromotion}
          onPromotionUpdated={(updatedPromotion) => {
            onPromotionUpdated(updatedPromotion);
            setIsEditDialogOpen(false);
            setSelectedPromotion(null);
          }}
        />
      )}

      {/* Delete Promotion Dialog */}
      {selectedPromotion && (
        <DeletePromotionDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          promotion={selectedPromotion}
          onPromotionDeleted={(promotionId) => {
            onPromotionDeleted(promotionId);
            setIsDeleteDialogOpen(false);
            setSelectedPromotion(null);
          }}
        />
      )}
    </>
  );
} 