import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-white dark:hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cafe: "bg-[#40041A] text-white hover:bg-[#40041A]/90 dark:bg-[#F2D0D0] dark:text-[#121212] dark:hover:bg-[#F2D0D0]/90",
        celeste:
          "bg-[#85C5BF] text-[#1A1A1A] hover:bg-[#85C5BF]/90 dark:bg-[#7ECBC5] dark:hover:bg-[#7ECBC5]/90",
        naranja:
          "bg-[#F2B988] text-[#1A1A1A] hover:bg-[#F2B988]/90 dark:bg-[#FFB97C] dark:hover:bg-[#FFB97C]/90",
        rojo: "bg-[#F29991] text-white hover:bg-[#F29991]/90 dark:bg-[#FF7A70] dark:text-[#121212] dark:hover:bg-[#FF7A70]/90",
        rosa: "bg-[#F2D0D0] text-[#1A1A1A] hover:bg-[#F2D0D0]/90",
        orange:
          "bg-[#F2B988] text-[#1A1A1A] hover:bg-[#F2B988]/90 dark:bg-[#FFB97C] dark:hover:bg-[#FFB97C]/90",
        blue: "bg-[#85C5BF] text-[#1A1A1A] hover:bg-[#85C5BF]/90 dark:bg-[#7ECBC5] dark:hover:bg-[#7ECBC5]/90",
        green:
          "bg-[#40041A] text-white hover:bg-[#40041A]/90 dark:bg-[#F2D0D0] dark:text-[#121212] dark:hover:bg-[#F2D0D0]/90",

        /* Status variants */
        all: "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-white dark:hover:text-primary-foreground border-primary",
        pending:
          "bg-[var(--status-pending)] text-[var(--status-pending-foreground)] hover:bg-[var(--status-pending)]/80 hover:text-white dark:hover:text-[var(--status-pending-foreground)] border-[var(--status-pending)]",
        "in-progress":
          "bg-[var(--status-inprogress)] text-[var(--status-inprogress-foreground)] hover:bg-[var(--status-inprogress)]/80 hover:text-white dark:hover:text-[var(--status-inprogress-foreground)] border-[var(--status-inprogress)]",
        completed:
          "bg-[var(--status-completed)] text-[var(--status-completed-foreground)] hover:bg-[var(--status-completed)]/80 hover:text-white dark:hover:text-[var(--status-completed-foreground)] border-[var(--status-completed)]",
        cancelled:
          "bg-[var(--status-cancelled)] text-[var(--status-cancelled-foreground)] hover:bg-[var(--status-cancelled)]/80 hover:text-white dark:hover:text-[var(--status-cancelled-foreground)] border-[var(--status-cancelled)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
