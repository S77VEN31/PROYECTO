"use client";

import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetPromotionsRequest, Promotion, PromotionType } from "colori-platform-shared";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Percent,
  RefreshCw,
  Search,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState } from "react";
import { EditPromotionDialog } from "./edit-promotion-dialog";
import { DeletePromotionDialog } from "./delete-promotion-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
 * Promotion management table component
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
}: PromotionManagementTableProps) {
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [deletingPromotion, setDeletingPromotion] = useState<Promotion | null>(null);

  /**
   * Handle search input change
   */
  const handleSearchChange = (value: string) => {
    onFiltersChange({
      ...filters,
      search: value || undefined,
      page: 1, // Reset to first page when searching
    });
  };

  /**
   * Handle type filter change
   */
  const handleTypeFilterChange = (value: string) => {
    onFiltersChange({
      ...filters,
      type: value === "all" ? undefined : value,
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
   * Get promotion type label
   */
  const getPromotionTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      discount: "Descuento",
      bogo: "Compra 1 Lleva 2",
      bundle: "Paquete",
      "free-shipping": "Envío Gratis",
      "gift-with-purchase": "Regalo con Compra",
      seasonal: "Estacional",
    };
    return typeLabels[type] || type;
  };

  /**
   * Get promotion status
   */
  const getPromotionStatus = (promotion: Promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (!promotion.active) return { status: "inactive", label: "Inactiva", variant: "secondary" as const };
    if (endDate < now) return { status: "expired", label: "Expirada", variant: "destructive" as const };
    if (startDate > now) return { status: "upcoming", label: "Próxima", variant: "outline" as const };
    return { status: "active", label: "Activa", variant: "default" as const };
  };

  /**
   * Toggle promotion active status
   */
  const handleToggleActive = async (promotion: Promotion) => {
    // This would typically call an API to toggle the status
    // For now, we'll just update the promotion object
    const updatedPromotion = { ...promotion, active: !promotion.active };
    onPromotionUpdated(updatedPromotion);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar promociones..."
                value={filters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select
              value={filters.type || "all"}
              onValueChange={handleTypeFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de promoción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value={PromotionType.DISCOUNT}>Descuento</SelectItem>
                <SelectItem value={PromotionType.BOGO}>Compra 1 Lleva 2</SelectItem>
                <SelectItem value={PromotionType.BUNDLE}>Paquete</SelectItem>
                <SelectItem value={PromotionType.FREE_SHIPPING}>Envío Gratis</SelectItem>
                <SelectItem value={PromotionType.GIFT_WITH_PURCHASE}>Regalo con Compra</SelectItem>
                <SelectItem value={PromotionType.SEASONAL}>Estacional</SelectItem>
              </SelectContent>
            </Select>

            {/* Active Filter */}
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
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="inactive">Inactivas</SelectItem>
              </SelectContent>
            </Select>

            {/* Refresh Button */}
            <Button onClick={onRefresh} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Promoción</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descuento</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Cargando promociones...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : promotions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Percent className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No se encontraron promociones</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  promotions.map((promotion) => {
                    const status = getPromotionStatus(promotion);
                    return (
                      <TableRow key={promotion.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{promotion.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {promotion.description}
                            </div>
                            {promotion.code && (
                              <Badge variant="outline" className="text-xs">
                                {promotion.code}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getPromotionTypeLabel(promotion.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {promotion.discountValue 
                              ? `€${promotion.discountValue.toFixed(2)}`
                              : promotion.discountPercent 
                              ? `${promotion.discountPercent}%`
                              : "N/A"
                            }
                          </div>
                          {promotion.minimumPurchase && (
                            <div className="text-xs text-muted-foreground">
                              Mín: €{promotion.minimumPurchase.toFixed(2)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              <span>{formatDate(promotion.startDate)}</span>
                            </div>
                            <div className="text-muted-foreground">
                              hasta {formatDate(promotion.endDate)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={status.variant}>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setEditingPromotion(promotion)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleActive(promotion)}
                              >
                                {promotion.active ? (
                                  <>
                                    <ToggleLeft className="h-4 w-4 mr-2" />
                                    Desactivar
                                  </>
                                ) : (
                                  <>
                                    <ToggleRight className="h-4 w-4 mr-2" />
                                    Activar
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeletingPromotion(promotion)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
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
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditPromotionDialog
        open={!!editingPromotion}
        onOpenChange={(open) => !open && setEditingPromotion(null)}
        promotion={editingPromotion}
        onPromotionUpdated={onPromotionUpdated}
      />

      {/* Delete Dialog */}
      <DeletePromotionDialog
        open={!!deletingPromotion}
        onOpenChange={(open) => !open && setDeletingPromotion(null)}
        promotion={deletingPromotion}
        onPromotionDeleted={onPromotionDeleted}
      />
    </div>
  );
} 