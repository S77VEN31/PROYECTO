"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: "default" | "cafe" | "celeste" | "naranja" | "rosa";
}

function Checkbox({ className, variant = "default", ...props }: CheckboxProps) {
  const variantStyles = {
    default:
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary",
    cafe: "data-[state=checked]:bg-[#40041A] data-[state=checked]:text-white dark:data-[state=checked]:bg-[#F2D0D0] dark:data-[state=checked]:text-[#121212]",
    celeste:
      "data-[state=checked]:bg-[#85C5BF] data-[state=checked]:text-[#1A1A1A] dark:data-[state=checked]:bg-[#7ECBC5]",
    naranja:
      "data-[state=checked]:bg-[#F2B988] data-[state=checked]:text-[#1A1A1A] dark:data-[state=checked]:bg-[#FFB97C]",
    rosa: "data-[state=checked]:bg-[#F2D0D0] data-[state=checked]:text-[#1A1A1A]",
  };

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
