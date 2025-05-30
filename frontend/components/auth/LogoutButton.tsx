/**
 * Logout Button Component
 * Provides a reusable logout button that uses centralized authentication
 */

"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import React from "react";

/**
 * Logout button props
 */
interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Logout button component
 * @param props - Component props
 * @returns JSX element
 */
export function LogoutButton({
  variant = "outline",
  size = "default",
  showIcon = true,
  children,
  className,
}: LogoutButtonProps): React.JSX.Element {
  const { logout, isLoading } = useAuthContext();

  /**
   * Handle logout click
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {showIcon && <LogOut className="w-4 h-4 mr-2" />}
      {children || "Cerrar Sesión"}
    </Button>
  );
}
