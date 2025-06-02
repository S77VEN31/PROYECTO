/**
 * Authentication Guard Component
 * Protects routes by checking authentication status
 */

"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { AuthApiService } from "@/api/entities/auth.api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { UserRole } from "colori-platform-shared";

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
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redireccionar a login si no está autenticado
        router.push(redirectTo);
      } else {
        // Verificar si el usuario está en la ruta correcta según su rol
        const userData = AuthApiService.getCurrentUser();
        
        if (userData) {
          const userRole = userData.role;
          const currentPath = pathname;
          
          // Redireccionar según el rol si la ruta actual no es adecuada
          if (userRole === UserRole.CHEF && !currentPath.startsWith('/kitchen')) {
            console.log("Redirigiendo chef a la cocina");
            router.push('/kitchen');
          } else if (userRole === UserRole.ADMIN && !currentPath.startsWith('/admin')) {
            console.log("Redirigiendo admin al panel");
            router.push('/admin');
          }
        }
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, pathname]);

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
