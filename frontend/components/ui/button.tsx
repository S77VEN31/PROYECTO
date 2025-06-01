import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",

        // CategoryVariant-based colors using CSS variables
        coffee:
          "bg-[var(--color-coffee)] text-white hover:bg-[var(--color-coffee)]/90",
        skyblue:
          "bg-[var(--color-skyblue)] text-black hover:bg-[var(--color-skyblue)]/90",
        orange:
          "bg-[var(--color-orange)] text-black hover:bg-[var(--color-orange)]/90",
        red: "bg-[var(--color-red)] text-white hover:bg-[var(--color-red)]/90",
        pink: "bg-[var(--color-pink)] text-black hover:bg-[var(--color-pink)]/90",

        /* Status variants */
        all: "bg-primary text-primary-foreground hover:bg-primary/80 border-primary",
        pending:
          "bg-[var(--status-pending)] text-[var(--status-pending-foreground)] hover:bg-[var(--status-pending)]/80 border-[var(--status-pending)]",
        "in-progress":
          "bg-[var(--status-inprogress)] text-[var(--status-inprogress-foreground)] hover:bg-[var(--status-inprogress)]/80 border-[var(--status-inprogress)]",
        completed:
          "bg-[var(--status-completed)] text-[var(--status-completed-foreground)] hover:bg-[var(--status-completed)]/80 border-[var(--status-completed)]",
        cancelled:
          "bg-[var(--status-cancelled)] text-[var(--status-cancelled-foreground)] hover:bg-[var(--status-cancelled)]/80 border-[var(--status-cancelled)]",
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

