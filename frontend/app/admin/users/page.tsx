"use client";

import { UserApiService } from "@/api/entities/user.api";
import { AdminPageLayout } from "@/components/admin/admin-page-layout";
import { AdminSectionHeader } from "@/components/admin/admin-section-header";
import { CreateUserDialog } from "@/components/admin/users/create-user-dialog";
import { UserManagementTable } from "@/components/admin/users/user-management-table";
import { UserStats } from "@/components/admin/users/user-stats";
import { Button } from "@/components/ui/button";
import { GetUsersRequestParams, User } from "colori-platform-shared";
import { UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState<GetUsersRequestParams>({
    page: 1,
    limit: 10,
  });

  /**
   * Load users from API
   */
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await UserApiService.getUsers({
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
        role: filters.role || undefined,
      });

      console.log("Users response:", response);
      console.log("Users data:", response.data);
      setUsers(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user creation
   */
  const handleUserCreated = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    setIsCreateDialogOpen(false);
  };

  /**
   * Handle user update
   */
  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  /**
   * Handle user deletion
   */
  const handleUserDeleted = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  /**
   * Handle filter changes
   */
  const handleFiltersChange = (newFilters: GetUsersRequestParams) => {
    setFilters(newFilters);
  };

  // Load users on component mount and when filters change
  useEffect(() => {
    loadUsers();
  }, [filters]);

  // Calculate user statistics
  const userStats = {
    total: users.length,
    admins: users.filter((user) => "role" in user && user.role === "admin")
      .length,
    managers: users.filter((user) => "role" in user && user.role === "manager")
      .length,
    chefs: users.filter((user) => "role" in user && user.role === "chef")
      .length,
    servers: users.filter((user) => "role" in user && user.role === "server")
      .length,
    cashiers: users.filter((user) => "role" in user && user.role === "cashier")
      .length,
    active: users.filter((user) => "active" in user && user.active).length,
  };

  return (
    <AdminPageLayout
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios del sistema"
    >
      {/* User Statistics */}
      <section className="mb-8">
        <AdminSectionHeader
          title="Estadísticas de Usuarios"
          description="Resumen del estado actual de usuarios"
          icon={<Users className="h-6 w-6" />}
        />
        <UserStats stats={userStats} />
      </section>

      {/* User Management Section */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <AdminSectionHeader
              title="Lista de Usuarios"
              description="Gestiona todos los usuarios del sistema"
              icon={<Users className="h-6 w-6" />}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <UserPlus className="h-4 w-4" />
              <span>Crear Usuario</span>
            </Button>
          </div>
        </div>

        <UserManagementTable
          users={users}
          isLoading={isLoading}
          error={error}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
          onRefresh={loadUsers}
        />
      </section>

      {/* Create User Dialog */}
      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onUserCreated={handleUserCreated}
      />
    </AdminPageLayout>
  );
}
