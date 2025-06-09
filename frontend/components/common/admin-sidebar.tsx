"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  FolderOpen,
  LogOut,
  Package,
  Percent,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SidebarLink({ href, label, icon }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-md",
        isActive
          ? "bg-primary/10 text-primary border-l-2 border-l-primary"
          : "text-foreground hover:bg-muted hover:text-primary/80 border-l-2 border-l-transparent"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const { logout, isLoading } = useAuthContext();

  /**
   * Handle logout click
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="hidden md:flex w-64 flex-col h-full bg-background border-r border-border">
      <div className="px-6 py-5 flex-shrink-0 border-b border-border">
        <h3 className="font-semibold text-foreground">Navegación</h3>
      </div>

      <nav className="flex-1 overflow-auto py-4 px-3">
        <ul className="space-y-1">
          <li>
            <SidebarLink
              href="/admin"
              label="Dashboard"
              icon={<BarChart3 className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/users"
              label="Usuarios"
              icon={<Users className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/products"
              label="Productos"
              icon={<Package className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/categories"
              label="Categorías"
              icon={<FolderOpen className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/promotions"
              label="Promociones"
              icon={<Percent className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/reports"
              label="Reportes"
              icon={<FileText className="h-4 w-4" />}
            />
          </li>
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <Button
          variant="default"
          className="w-full"
          size="sm"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4 mr-2 text-primary-foreground" />
          {isLoading ? "Cerrando..." : "Cerrar Sesión"}
        </Button>
      </div>
    </aside>
  );
}
