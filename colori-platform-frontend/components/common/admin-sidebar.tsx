"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpenText,
  ClipboardList,
  LogOut,
  Package,
  Percent,
  Settings,
  ShoppingCart,
  ChefHat,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { toast } from "sonner";

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
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success("Sesión cerrada exitosamente");
      router.push("/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
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
              href="/admin/menu"
              label="Gestión de Menú"
              icon={<BookOpenText className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/orders"
              label="Pedidos"
              icon={<ShoppingCart className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/kitchen"
              label="Panel de Cocina"
              icon={<ChefHat className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/inventory"
              label="Inventario"
              icon={<Package className="h-4 w-4" />}
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
              label="Informes"
              icon={<ClipboardList className="h-4 w-4" />}
            />
          </li>
          <li>
            <SidebarLink
              href="/admin/settings"
              label="Configuración"
              icon={<Settings className="h-4 w-4" />}
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
        >
          <LogOut className="h-4 w-4 mr-2 text-primary-foreground" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}
