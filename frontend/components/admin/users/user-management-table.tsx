/**
 * User Management Table Component
 * Displays users in a table with management capabilities
 */

"use client";

import { UserApiService } from "@/api/entities/user.api";
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
import { User, UserFilterOptions, UserRole } from "colori-platform-shared";
import {
  Edit,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { DeleteUserDialog } from "./delete-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";

/**
 * User management table props
 */
interface UserManagementTableProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  filters: UserFilterOptions;
  onFiltersChange: (filters: UserFilterOptions) => void;
  onUserUpdated: (user: User) => void;
  onUserDeleted: (userId: string) => void;
  onRefresh: () => void;
}

/**
 * Get role badge variant
 */
function getRoleBadgeVariant(
  role: UserRole
): "default" | "secondary" | "destructive" | "outline" {
  switch (role) {
    case UserRole.ADMIN:
      return "destructive";
    case UserRole.MANAGER:
      return "default";
    case UserRole.CHEF:
      return "secondary";
    default:
      return "outline";
  }
}

/**
 * Get role display name
 */
function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrador";
    case UserRole.MANAGER:
      return "Gerente";
    case UserRole.CHEF:
      return "Chef";
    case UserRole.SERVER:
      return "Mesero";
    case UserRole.CASHIER:
      return "Cajero";
    default:
      return role;
  }
}

/**
 * User management table component
 * @param props - Component props
 * @returns JSX element
 */
export function UserManagementTable({
  users,
  isLoading,
  error,
  filters,
  onFiltersChange,
  onUserUpdated,
  onUserDeleted,
  onRefresh,
}: UserManagementTableProps): React.JSX.Element {
  console.log("UserManagementTable - users:", users);
  console.log("UserManagementTable - users.length:", users.length);
  console.log("UserManagementTable - isLoading:", isLoading);
  console.log("UserManagementTable - error:", error);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

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
   * Handle role filter change
   */
  const handleRoleFilterChange = (role: string) => {
    onFiltersChange({
      ...filters,
      role: role === "all" ? undefined : role,
      page: 1, // Reset to first page when filtering
    });
  };

  /**
   * Handle user status toggle
   */
  const handleToggleUserStatus = async (user: User) => {
    try {
      const updatedUser = await UserApiService.updateUser(user.id as string, {
        active: !user.active,
      });
      onUserUpdated(updatedUser);
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  /**
   * Handle edit user
   */
  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  /**
   * Handle delete user
   */
  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
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
      <AdminCard>
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search and Role Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Select
                value={filters.role || "all"}
                onValueChange={handleRoleFilterChange}
              >
                <SelectTrigger className="w-full sm:w-48 min-w-[180px]">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
                  <SelectItem value={UserRole.MANAGER}>Gerente</SelectItem>
                  <SelectItem value={UserRole.CHEF}>Chef</SelectItem>
                  <SelectItem value={UserRole.SERVER}>Mesero</SelectItem>
                  <SelectItem value={UserRole.CASHIER}>Cajero</SelectItem>
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
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Usuario</TableHead>
                  <TableHead className="min-w-[200px] hidden sm:table-cell">Email</TableHead>
                  <TableHead className="min-w-[120px]">Rol</TableHead>
                  <TableHead className="min-w-[100px] hidden md:table-cell">Estado</TableHead>
                  <TableHead className="min-w-[130px] hidden lg:table-cell">Último Acceso</TableHead>
                  <TableHead className="text-right min-w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        Cargando usuarios...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">
                        No se encontraron usuarios
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id as string}>
                      <TableCell className="min-w-[150px]">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.name}
                          </p>
                          {/* Show email on mobile when email column is hidden */}
                          <p className="text-xs text-muted-foreground sm:hidden">
                            {user.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell min-w-[200px]">
                        <span className="text-sm">{user.email}</span>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                          {getRoleDisplayName(user.role)}
                        </Badge>
                        {/* Show status on mobile when status column is hidden */}
                        <div className="md:hidden mt-1">
                          <Badge variant={user.active ? "default" : "secondary"} className="text-xs">
                            {user.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell min-w-[100px]">
                        <Badge variant={user.active ? "default" : "secondary"} className="text-xs">
                          {user.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell min-w-[130px]">
                        <span className="text-sm">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString("es-ES")
                            : "Nunca"}
                        </span>
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
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => handleEditUser(user)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleUserStatus(user)}
                              className="cursor-pointer"
                            >
                              {user.active ? (
                                <>
                                  <UserX className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>Desactivar</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>Activar</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminCard>

      {/* Edit User Dialog */}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open: boolean) => !open && setEditingUser(null)}
          onUserUpdated={onUserUpdated}
        />
      )}

      {/* Delete User Dialog */}
      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          open={!!deletingUser}
          onOpenChange={(open: boolean) => !open && setDeletingUser(null)}
          onUserDeleted={onUserDeleted}
        />
      )}
    </>
  );
}
