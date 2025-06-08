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
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // adicione mais campos do session.user se precisar
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  // Envolva o NextAuth SessionProvider aqui
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
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
