"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpenText,
  ClipboardList,
  LogOut,
  Menu,
  Package,
  Percent,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClose: () => void;
}

function MobileLink({ href, label, icon, onClose }: MobileLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-md",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted hover:text-primary/80"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function AdminMobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-72 border-r border-border bg-background"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="text-left flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Colori</span>
            <span className="text-lg text-muted-foreground">Admin</span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-4 px-3">
          <nav>
            <ul className="space-y-2">
              <li>
                <MobileLink
                  href="/admin"
                  label="Dashboard"
                  icon={<BarChart3 className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/menu"
                  label="Gestión de Menú"
                  icon={<BookOpenText className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/orders"
                  label="Pedidos"
                  icon={<ShoppingCart className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/inventory"
                  label="Inventario"
                  icon={<Package className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/promotions"
                  label="Promociones"
                  icon={<Percent className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/reports"
                  label="Informes"
                  icon={<ClipboardList className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
              <li>
                <MobileLink
                  href="/admin/settings"
                  label="Configuración"
                  icon={<Settings className="h-4 w-4" />}
                  onClose={() => {}}
                />
              </li>
            </ul>
          </nav>
          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="default" className="w-full">
              <LogOut className="h-4 w-4 mr-2 text-primary-foreground" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
