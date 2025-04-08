"use client";

import { cn } from "@/lib/utils";

interface IconCircleProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "muted" | "secondary" | "accent";
}

export function IconCircle({
  children,
  className,
  size = "md",
  variant = "primary",
}: IconCircleProps) {
  // Sizes
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  // Variants
  const variantClasses = {
    default: "bg-background",
    primary: "bg-primary/10",
    muted: "bg-muted",
    secondary: "bg-secondary/10",
    accent: "bg-accent/10",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
