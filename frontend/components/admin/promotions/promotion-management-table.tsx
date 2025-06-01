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
import {
  getPromotionTypeBadgeClass,
  getPromotionTypeDisplayText,
  getStatusBadgeClass,
  getStatusDisplayText,
  getToggleStatusActionText,
} from "@/lib/utils";
import {
  GetPromotionsRequestParams,
  Promotion,
  PromotionCreate,
  PromotionType,
  UpdatePromotionRequestBody,
} from "colori-platform-shared";
import {
  CalendarCheck,
  CalendarX,
  Edit,
  Eye,
  EyeOff,
  MoreHorizontal,
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
  filters: GetPromotionsRequestParams;
  onFiltersChange: (filters: GetPromotionsRequestParams) => void;
  onPromotionUpdated: (promotion: Promotion) => void;
  onPromotionDeleted: (promotionId: string) => void;
  onRefresh: () => void;
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
      label: getStatusDisplayText("inactive"),
      badgeClass: getStatusBadgeClass("inactive"),
    };
  if (endDate < now)
    return {
      status: "expired",
      label: getStatusDisplayText("expired"),
      badgeClass: getStatusBadgeClass("expired"),
    };
  if (startDate > now)
    return {
      status: "upcoming",
      label: getStatusDisplayText("upcoming"),
      badgeClass: getStatusBadgeClass("upcoming"),
    };
  return {
    status: "active",
    label: getStatusDisplayText("active"),
    badgeClass: getStatusBadgeClass("active"),
  };
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
      const promotionData = promotion as unknown as PromotionCreate;
      const updateData = {
        active: !promotionData.active,
      };
      const updatedPromotion = await PromotionApiService.updatePromotion(
        { id: promotion.id },
        updateData as UpdatePromotionRequestBody
      );
      onPromotionUpdated(updatedPromotion);
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
    <>
      <AdminCard className="overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col gap-4 p-6 border-b">
          {/* Search and Type Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4 z-10" />
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
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value={PromotionType.DISCOUNT}>
                    Discount
                  </SelectItem>
                  <SelectItem value={PromotionType.BOGO}>
                    Buy One Get One
                  </SelectItem>
                  <SelectItem value={PromotionType.BUNDLE}>Bundle</SelectItem>
                  <SelectItem value={PromotionType.FREE_SHIPPING}>
                    Free Shipping
                  </SelectItem>
                  <SelectItem value={PromotionType.GIFT_WITH_PURCHASE}>
                    Gift with Purchase
                  </SelectItem>
                  <SelectItem value={PromotionType.SEASONAL}>
                    Seasonal
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.active?.toString() || "all"}
                onValueChange={handleActiveFilterChange}
              >
                <SelectTrigger className="w-full sm:w-40 min-w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={onRefresh}
                variant="default"
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
                <TableHead className="min-w-[200px]">Promotion</TableHead>
                <TableHead className="min-w-[120px]">Type</TableHead>
                <TableHead className="min-w-[100px] hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead className="min-w-[120px] hidden lg:table-cell">
                  Discount
                </TableHead>
                <TableHead className="min-w-[150px] hidden xl:table-cell">
                  Valid Period
                </TableHead>
                <TableHead className="min-w-[80px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      <span>Cargando promociones...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : promotions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
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
                  const promotionData = promotion as unknown as PromotionCreate;

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
                        <Badge
                          variant="secondary"
                          className={getPromotionTypeBadgeClass(
                            promotionData.type
                          )}
                        >
                          {getPromotionTypeDisplayText(promotionData.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell min-w-[100px]">
                        {(() => {
                          const status = getPromotionStatus(promotion);
                          return (
                            <Badge
                              variant={
                                status.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={status.badgeClass}
                            >
                              {status.label}
                            </Badge>
                          );
                        })()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <span className="font-medium text-sm">
                          {formatDiscountValue(promotion)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell min-w-[150px]">
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarCheck className="h-3 w-3 text-primary" />
                            <span>{formatDate(promotionData.startDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarX className="h-3 w-3 text-primary" />
                            <span>{formatDate(promotionData.endDate)}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right min-w-[80px]">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0 hover:text-primary"
                            >
                              <MoreHorizontal className="h-4 w-4 text-primary" />
                              <span className="sr-only">Abrir menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPromotion(promotion);
                                setIsEditDialogOpen(true);
                              }}
                              className="text-primary"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleTogglePromotionStatus(promotion)
                              }
                              disabled={updatingPromotion?.id === promotion.id}
                              className="text-primary"
                            >
                              {promotionData.active ? (
                                <>
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  {getToggleStatusActionText(
                                    promotionData.active,
                                    "promotion"
                                  )}
                                </>
                              ) : (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  {getToggleStatusActionText(
                                    promotionData.active,
                                    "promotion"
                                  )}
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPromotion(promotion);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600 dark:text-red-400"
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