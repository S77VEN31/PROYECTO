/**
 * Sales Report Filters Component
 * Provides filtering options for sales reports
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "colori-platform-shared";
import { CalendarIcon, Download, Filter, RefreshCw, Search } from "lucide-react";
import { useState } from "react";

interface SalesFiltersProps {
  filters: {
    startDate?: string;
    endDate?: string;
    status?: string;
    search?: string;
  };
  onFiltersChange: (filters: Partial<SalesFiltersProps['filters']>) => void;
  onApplyFilters: () => void;
  onExportExcel: () => void;
  isLoading?: boolean;
  isExporting?: boolean;
}

/**
 * Sales filters component
 */
export function SalesFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onExportExcel,
  isLoading,
  isExporting,
}: SalesFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  /**
   * Handle filter change
   */
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    const emptyFilters = {
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      search: undefined,
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  /**
   * Get today's date in YYYY-MM-DD format
   */
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  /**
   * Get date 30 days ago in YYYY-MM-DD format
   */
  const getThirtyDaysAgoDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6 p-6 bg-background border rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Filtros de Reporte</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Fecha de Inicio</Label>
          <div className="relative">
            <Input
              id="startDate"
              type="date"
              value={localFilters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="pl-10"
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Fecha de Fin</Label>
          <div className="relative">
            <Input
              id="endDate"
              type="date"
              value={localFilters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="pl-10"
            />
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label>Estado de Orden</Label>
          <Select
            value={localFilters.status || "all"}
            onValueChange={(value) => 
              handleFilterChange("status", value === "all" ? undefined : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value={OrderStatus.COMPLETED}>Completadas</SelectItem>
              <SelectItem value={OrderStatus.PENDING}>Pendientes</SelectItem>
              <SelectItem value={OrderStatus.IN_PROGRESS}>En Progreso</SelectItem>
              <SelectItem value={OrderStatus.CANCELLED}>Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Filter */}
        <div className="space-y-2">
          <Label htmlFor="search">Buscar Cliente</Label>
          <div className="relative">
            <Input
              id="search"
              placeholder="Nombre del cliente..."
              value={localFilters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Quick Date Filters */}
      <div className="space-y-2">
        <Label>Filtros Rápidos</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newFilters = {
                ...localFilters,
                startDate: getTodayDate(),
                endDate: getTodayDate()
              };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            Hoy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];
              const newFilters = {
                ...localFilters,
                startDate: yesterdayStr,
                endDate: yesterdayStr
              };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            Ayer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date();
              const weekAgo = new Date(today);
              weekAgo.setDate(weekAgo.getDate() - 7);
              const newFilters = {
                ...localFilters,
                startDate: weekAgo.toISOString().split('T')[0],
                endDate: getTodayDate()
              };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            Última Semana
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newFilters = {
                ...localFilters,
                startDate: getThirtyDaysAgoDate(),
                endDate: getTodayDate()
              };
              setLocalFilters(newFilters);
              onFiltersChange(newFilters);
            }}
          >
            Últimos 30 Días
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <Button
          onClick={onApplyFilters}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Filter className="h-4 w-4" />
          )}
          Aplicar Filtros
        </Button>

        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={isLoading}
        >
          Limpiar Filtros
        </Button>

        <Button
          variant="secondary"
          onClick={onExportExcel}
          disabled={isLoading || isExporting}
          className="flex items-center gap-2"
        >
          {isExporting ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Exportar a Excel
        </Button>
      </div>
    </div>
  );
} 