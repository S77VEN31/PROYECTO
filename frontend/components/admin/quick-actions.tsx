"use client";

import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      label: "Gestionar Menú",
      href: "/admin/products",
      variant: "default" as const,
      icon: <BookOpenText className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
