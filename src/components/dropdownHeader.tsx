"use client";

import { ShoppingCart, UserRoundPen, X, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

interface DropdownHeaderProps {
  icone: ReactNode;
}

const DropdownHeader = ({ icone }: DropdownHeaderProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{icone}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-[80] mr-10">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>Olá, {user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => goTo("/perfil")}>
              <UserRoundPen size={14} className="mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => goTo("/pedidos")}>
              <ShoppingCart size={14} className="mr-2" />
              Meus pedidos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <X size={14} className="mr-2 text-red-500" />
              Sair
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => goTo("/login")}>
            <LogIn size={14} className="mr-2 text-blue-500" />
            Fazer login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownHeader;
