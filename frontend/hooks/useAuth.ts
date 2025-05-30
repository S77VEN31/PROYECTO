/**
 * Authentication hook
 * Provides authentication state and methods
 */

import { UserApiService } from "@/api/entities/user.api";
import { User } from "colori-platform-shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Authentication hook return type
 */
interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

/**
 * Custom hook for authentication management
 * @returns Authentication state and methods
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize authentication state from localStorage
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = UserApiService.getCurrentUser();
        const isAuth = UserApiService.isAuthenticated();

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

    initAuth();
  }, []);

  /**
   * Login user with email and password
   * @param email - User email
   * @param password - User password
   */
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const authResponse = await UserApiService.login({ email, password });
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
      await UserApiService.logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh user data from localStorage
   */
  const refreshUser = (): void => {
    const currentUser = UserApiService.getCurrentUser();
    setUser(currentUser);
  };

  return {
    user,
    isAuthenticated: !!user && UserApiService.isAuthenticated(),
    isLoading,
    login,
    logout,
    refreshUser,
  };
}
