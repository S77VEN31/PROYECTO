"use client";

import { Button } from "@/components/ui/button";
import { BookOpenText, Gift, Users, FileText } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      label: "Gestionar Menú",
      href: "/admin/products",
      variant: "default" as const,
      icon: <BookOpenText className="h-5 w-5 mr-2" />,
      description: "Administra productos y categorías"
    },
    {
      label: "Gestionar Promociones",
      href: "/admin/promotions",
      variant: "secondary" as const,
      icon: <Gift className="h-5 w-5 mr-2" />,
      description: "Crea y edita ofertas especiales"
    },
    {
      label: "Gestionar Usuarios",
      href: "/admin/users",
      variant: "outline" as const,
      icon: <Users className="h-5 w-5 mr-2" />,
      description: "Administra el equipo del restaurante"
    },
    {
      label: "Ver Reportes",
      href: "/admin/reports",
      variant: "default" as const,
      icon: <FileText className="h-5 w-5 mr-2" />,
      description: "Analiza ventas y estadísticas"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          asChild
          variant={action.variant}
          className="h-auto py-6 hover:shadow-md transition-all shadow-sm flex-col items-start text-left"
        >
          <Link href={action.href} className="w-full">
            <div className="flex items-center mb-2">
              {action.icon}
              <span className="font-semibold">{action.label}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {action.description}
            </p>
          </Link>
        </Button>
      ))}
    </div>
  );
}
