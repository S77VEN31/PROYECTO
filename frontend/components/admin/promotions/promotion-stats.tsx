"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  CalendarCheck, 
  CalendarX, 
  Percent, 
  TrendingUp 
} from "lucide-react";

interface PromotionStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    expired: number;
    upcoming: number;
  };
}

/**
 * Promotion statistics component
 * Displays key metrics about promotions
 */
export function PromotionStats({ stats }: PromotionStatsProps) {
  const activePercentage = stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
  const upcomingPercentage = stats.total > 0 ? Math.round((stats.upcoming / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Promotions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Promociones
          </CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Promociones registradas
          </p>
        </CardContent>
      </Card>

      {/* Active Promotions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Activas
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {activePercentage}%
            </Badge>
            <p className="text-xs text-muted-foreground">del total</p>
          </div>
        </CardContent>
      </Card>

      {/* Inactive Promotions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Inactivas
          </CardTitle>
          <CalendarX className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Promociones pausadas
          </p>
        </CardContent>
      </Card>

      {/* Expired Promotions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Expiradas
          </CardTitle>
          <CalendarX className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Promociones vencidas
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Promotions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Próximas
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {upcomingPercentage}%
            </Badge>
            <p className="text-xs text-muted-foreground">del total</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 