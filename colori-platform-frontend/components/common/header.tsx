"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ClipboardList,
  LogOut,
  Settings,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { authService } from "@/lib/services/authService";
import { toast } from "sonner";

interface HeaderProps {
  variant: "admin" | "client" | "kitchen";
  cartCount?: number;
}

interface NavLink {
  href: string;
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
  showBadge?: boolean;
}

export function Header({ variant, cartCount = 0 }: HeaderProps) {
  const pathname = usePathname();
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

  const getNavLinks = (): NavLink[] => {
    switch (variant) {
      case "admin":
        return [
          {
            href: "/admin/settings",
            icon: (
              <Settings
                className={`h-4 w-4 ${
                  pathname.includes("/admin/settings") ? "text-primary" : ""
                }`}
              />
            ),
            label: "Configuración",
            isActive: pathname.includes("/admin/settings"),
            showBadge: pathname.includes("/admin/settings"),
          },
          {
            href: "/admin",
            icon: (
              <BarChart3
                className={`h-4 w-4 ${
                  pathname === "/admin" ? "text-primary" : ""
                }`}
              />
            ),
            label: "Dashboard",
            isActive: pathname === "/admin",
          },
        ];
      case "kitchen":
        return [
          {
            href: "/kitchen/history",
            icon: (
              <ClipboardList
                className={`h-4 w-4 ${
                  pathname.includes("/kitchen/history") ? "text-primary" : ""
                }`}
              />
            ),
            label: "Historial",
            isActive: pathname.includes("/kitchen/history"),
            showBadge: pathname.includes("/kitchen/history"),
          },
        ];
      case "client":
        return [
          {
            href: "/client",
            icon: (
              <Utensils
                className={`h-4 w-4 ${
                  pathname === "/client" ? "text-primary" : ""
                }`}
              />
            ),
            label: "Menú",
            isActive: pathname === "/client",
          },
        ];
      default:
        return [];
    }
  };

  const getStatusBadge = () => {
    switch (variant) {
      case "admin":
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="celeste"
              className="h-3 w-3 rounded-full p-0 border border-white dark:border-black"
            />
            <span className="text-sm font-medium">En línea</span>
          </div>
        );
      case "kitchen":
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="celeste"
              className="h-3 w-3 rounded-full p-0 border border-white dark:border-black"
            />
            <span className="text-sm font-medium">En línea</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (variant) {
      case "admin":
        return "Admin";
      case "kitchen":
        return "Cocina";
      case "client":
        return "Home";
      default:
        return "";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-16 items-center justify-between">
        <Link href={`/${variant}`} className="flex items-center gap-2">
          <Logo width={50} height={50} linkTo={null} />
          <span className="text-xl text-muted-foreground">{getTitle()}</span>
        </Link>

        <nav className="flex items-center gap-6">
          {getStatusBadge()}

          {getNavLinks().map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-sm font-medium flex items-center gap-2 transition-colors ${
                link.isActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {variant === "client" && (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative text-foreground hover:text-primary hover:bg-background"
            >
              <Link href="/client/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="cafe"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 border border-white dark:border-black"
                  >
                    {cartCount}
                  </Badge>
                )}
                <span className="sr-only">Carrito</span>
              </Link>
            </Button>
          )}

          {(variant === "admin" || variant === "kitchen") && (
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 text-primary-foreground" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </Button>
          )}

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
