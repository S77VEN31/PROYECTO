import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "cafe" | "celeste" | "naranja" | "rosa";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "border-input focus-visible:ring-ring",
      cafe: "border-[#40041A] focus-visible:ring-[#40041A]/30 focus-visible:border-[#40041A] dark:border-[#F2D0D0] dark:focus-visible:ring-[#F2D0D0]/30 dark:focus-visible:border-[#F2D0D0]",
      celeste:
        "border-[#85C5BF] focus-visible:ring-[#85C5BF]/30 focus-visible:border-[#85C5BF] dark:border-[#7ECBC5] dark:focus-visible:ring-[#7ECBC5]/30 dark:focus-visible:border-[#7ECBC5]",
      naranja:
        "border-[#F2B988] focus-visible:ring-[#F2B988]/30 focus-visible:border-[#F2B988] dark:border-[#FFB97C] dark:focus-visible:ring-[#FFB97C]/30 dark:focus-visible:border-[#FFB97C]",
      rosa: "border-[#F2D0D0] focus-visible:ring-[#F2D0D0]/30 focus-visible:border-[#F2D0D0]",
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
