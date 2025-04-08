import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",

        // Estado de pedidos usando las variables CSS
        pending:
          "border-transparent bg-[var(--status-pending)] text-[var(--status-pending-foreground)]",
        "in-progress":
          "border-transparent bg-[var(--status-inprogress)] text-[var(--status-inprogress-foreground)]",
        completed:
          "border-transparent bg-[var(--status-completed)] text-[var(--status-completed-foreground)]",
        cancelled:
          "border-transparent bg-[var(--status-cancelled)] text-[var(--status-cancelled-foreground)]",

        // Nuestra paleta de colores
        cafe: "border-transparent bg-[#40041A] text-white dark:bg-[#F2D0D0] dark:text-[#121212]",
        celeste: "border-transparent bg-[#B0D9D5] text-[#1A1A1A]",
        naranja: "border-transparent bg-[#F2B988] text-[#1A1A1A]",
        rojo: "border-transparent bg-[#F29991] text-white",
        rosa: "border-transparent bg-[#F2D0D0] text-[#1A1A1A]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
