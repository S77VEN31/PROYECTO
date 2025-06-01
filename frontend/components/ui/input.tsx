import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "coffee" | "skyblue" | "orange" | "pink";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "border-input focus-visible:ring-primary/30 focus-visible:border-primary",
      coffee:
        "border-[var(--color-coffee)] focus-visible:ring-[var(--color-coffee)]/30 focus-visible:border-[var(--color-coffee)]",
      skyblue:
        "border-[var(--color-skyblue)] focus-visible:ring-[var(--color-skyblue)]/30 focus-visible:border-[var(--color-skyblue)]",
      orange:
        "border-[var(--color-orange)] focus-visible:ring-[var(--color-orange)]/30 focus-visible:border-[var(--color-orange)]",
      pink: "border-[var(--color-pink)] focus-visible:ring-[var(--color-pink)]/30 focus-visible:border-[var(--color-pink)]",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

