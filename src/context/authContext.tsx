// src/context/AuthContext.tsx
"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession, signOut, SessionProvider } from "next-auth/react";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // adicionar campos adicionais conforme necessário
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
    setUser(session?.user ?? null);
  }, [status, session]);
  const logout = () => {
    signOut({ redirect: false });
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const refreshUser = async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/users/${session.user.id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser({
            ...session.user,
            name: userData.name,
            email: userData.email,
          });
        }
      } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, updateUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth must be used dentro de AuthProviderWrapper");
  return ctx;
};
