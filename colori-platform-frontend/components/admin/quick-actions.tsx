"use client";

import { Button } from "@/components/ui/button";
import { BookOpenText, ClipboardList, ShoppingCart, ChefHat } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      label: "Gestionar Menú",
      href: "/admin/menu",
      variant: "default" as const,
      icon: <BookOpenText className="h-5 w-5 mr-2" />,
    },
    {
      label: "Ver Pedidos",
      href: "/admin/orders",
      variant: "secondary" as const,
      icon: <ShoppingCart className="h-5 w-5 mr-2" />,
    },
    {
      label: "Panel de Cocina",
      href: "/admin/kitchen",
      variant: "naranja" as const,
      icon: <ChefHat className="h-5 w-5 mr-2" />,
    },
    {
      label: "Generar Informes",
      href: "/admin/reports",
      variant: "cafe" as const,
      icon: <ClipboardList className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          asChild
          variant={action.variant}
          className="h-auto py-4 hover:shadow-md transition-all shadow-sm"
        >
          <Link href={action.href}>
            {action.icon}
            {action.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}
