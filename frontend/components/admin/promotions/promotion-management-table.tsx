"use client";

import { PromotionApiService } from "@/api/entities/promotion.api";
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
import { GetPromotionsRequest, Promotion } from "colori-platform-shared";
import {
  CalendarCheck,
  CalendarX,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
  Percent,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { DeletePromotionDialog } from "./delete-promotion-dialog";
import { EditPromotionDialog } from "./edit-promotion-dialog";

/**
 * Promotion management table props
 */
interface PromotionManagementTableProps {
  promotions: Promotion[];
  isLoading: boolean;
  error: string | null;
  filters: GetPromotionsRequest;
  onFiltersChange: (filters: GetPromotionsRequest) => void;
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
  const now = new Date();
  const startDate = new Date(promotion.startDate);
  const endDate = new Date(promotion.endDate);

  if (!promotion.active)
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
      await PromotionApiService.updatePromotion(
        { id: promotion.id as string },
        {
          id: promotion.id as string,
          promotion: { ...promotion, active: !promotion.active },
        }
      );
      onPromotionUpdated({ ...promotion, active: !promotion.active });
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
   * Format discount value for display
   */
  const formatDiscountValue = (promotion: Promotion) => {
    if (promotion.discountPercent) {
      return `${promotion.discountPercent}%`;
    } else if (promotion.discountValue) {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(promotion.discountValue);
    } else {
      return "N/A";
    }
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
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Fecha Inicio
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Fecha Fin
                </TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Cargando promociones...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : promotions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
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
                  return (
                    <TableRow key={promotion.id}>
                      <TableCell className="min-w-[200px]">
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-foreground">
                            {promotion.name}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-2">
                            {promotion.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Badge variant="outline" className="text-xs">
                          {getPromotionTypeLabel(promotion.type)}
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
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(promotion.startDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarX className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(promotion.endDate)}</span>
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
                              {promotion.active ? (
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