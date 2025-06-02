/**
 * Authentication Context
 * Provides centralized authentication state management across the application
 */

"use client";

import { AuthApiService } from "@/api/entities/auth.api";
import { setupApiInterceptors } from "@/api/interceptors";
import { User } from "colori-platform-shared";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Authentication context type
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
  forceLogout: () => void;
}

/**
 * Authentication context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication provider component
 * @param props - Provider props
 * @returns JSX element
 */
export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Handle centralized logout event
   */
  const handleLogoutEvent = () => {
    setUser(null);
    router.push("/login");
  };

  /**
   * Initialize authentication state and set up event listeners
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = AuthApiService.getCurrentUser();
        const isAuth = AuthApiService.isAuthenticated();

        if (isAuth && currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize auth state
    initAuth();

    // Setup API interceptors for automatic auth handling
    setupApiInterceptors();

    // Set up centralized logout event listener
    window.addEventListener("auth:logout", handleLogoutEvent);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, [router]);

  /**
   * Login user with email and password
   * @param email - User email
   * @param password - User password
   */
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const authResponse = await AuthApiService.login({ email, password });
      setUser(authResponse.user);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.log("Ejecutando API logout...");
      await AuthApiService.logout();
      console.log("API logout exitoso");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      // Forzar limpieza de datos para asegurar desconexión completa
      AuthApiService.forceLogout();
      router.push("/login");
    } finally {
      // Asegurar que el estado de carga se actualice siempre
      setIsLoading(false);
    }
  };

  /**
   * Force logout - clears auth data and triggers logout event
   * Used for centralized logout from anywhere in the application
   */
  const forceLogout = (): void => {
    AuthApiService.forceLogout();
    // The handleLogoutEvent will be triggered by the custom event
  };

  /**
   * Refresh user data from localStorage
   */
  const refreshUser = (): void => {
    const currentUser = AuthApiService.getCurrentUser();
    setUser(currentUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && AuthApiService.isAuthenticated(),
    isLoading,
    login,
    logout,
    refreshUser,
    forceLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * @returns Authentication context
 * @throws Error if used outside AuthProvider
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
