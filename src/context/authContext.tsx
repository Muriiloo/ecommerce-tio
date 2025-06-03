"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define a interface para o usuário
interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

// Define o formato do contexto
interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Cria o contexto com valor inicial undefined
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider para encapsular a aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Simula login com dados de usuário
  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Limpa dados de usuário
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
