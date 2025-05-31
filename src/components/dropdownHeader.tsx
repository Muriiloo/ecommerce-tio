import { ShoppingCart, UserRoundPen, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ReactNode } from "react";

interface DropdownHeaderProps {
  icone: ReactNode;
}

const DropdownHeader = ({ icone }: DropdownHeaderProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{icone}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRoundPen size={12} />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShoppingCart size={12} />
          Meus pedidos
        </DropdownMenuItem>
        <DropdownMenuItem>
          <X size={12} className="text-red-500" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownHeader;
