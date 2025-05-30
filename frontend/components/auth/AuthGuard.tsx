/**
 * Authentication Guard Component
 * Protects routes by checking authentication status
 */

"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * Auth guard props
 */
interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * Authentication guard component
 * @param props - Component props
 * @returns JSX element or null
 */
export function AuthGuard({
  children,
  redirectTo = "/login",
  fallback = <div>Loading...</div>,
}: AuthGuardProps): React.JSX.Element | null {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading state
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
}
