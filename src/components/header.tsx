"use client";

import MiniCart from "./miniCart";

import Link from "next/link";
import {
  CircleUserRound,
  House,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBasket,
  User,
} from "lucide-react";

import DropdownHeader from "./dropdownHeader";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user.isAdmin) {
          setIsAdmin(true);
          console.log("é admin");
        } else {
          setIsAdmin(false);
          console.log("não é admin");
        }
      })
      .catch(() => setIsAdmin(false));
  }, []);

  return (
    <header className="bg-black sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <Image
                src="/logo_sem_fundo.png"
                alt="logo"
                width={100}
                height={40}
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white  hover:text-gray-300 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/produtos"
              className="text-white hover:text-gray-300 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Produtos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/sobre"
              className="text-white hover:text-gray-300 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Sobre nós
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contato"
              className="text-white hover:text-gray-300 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 relative group"
            >
              Contato
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center justify-center gap-4">
            <DropdownHeader
              icone={<User size={24} className="text-white mb-1" />}
            />
            <MiniCart />
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <DropdownHeader icone={<User className="text-white" />} />
            <div className="mt-1">
              <MiniCart />
            </div>
            <Menubar className="bg-gray-100">
              <MenubarMenu>
                <MenubarTrigger>
                  <Menu className="text-black" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <House />
                    <Link href="/">Home</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <ShoppingBasket />
                    <Link href="/produtos">Produtos</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <MessageCircle />
                    <Link href="/sobre">Sobre nós</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Phone />
                    <Link href="/contato">Contato</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  {isAdmin && (
                    <div>
                      <MenubarItem>
                        <CircleUserRound />
                        <Link href="/admin/dashboard">Admin</Link>
                      </MenubarItem>
                      <MenubarSeparator />
                    </div>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
