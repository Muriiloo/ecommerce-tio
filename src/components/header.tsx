"use client";

import MiniCart from "./miniCart";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import DropdownHeader from "./dropdownHeader";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [showCompact, setShowCompact] = useState(false);
  const [isCompactClosing, setIsCompactClosing] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Verifica usuário
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setIsAdmin(Boolean(data?.user?.isAdmin)))
      .catch(() => setIsAdmin(false));
  }, []);

  // Fecha menu ao trocar de rota (garante que nada fique "pendurado")
  useEffect(() => {
    setIsMenuOpen(false);
    setIsClosing(false);
  }, [pathname]);

  // IntersectionObserver para o header compacto
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setShowCompact(true);
        else {
          setIsCompactClosing(true);
          setTimeout(() => {
            setIsCompactClosing(false);
            setShowCompact(false);
          }, 400);
        }
      },
      { threshold: 0 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header ref={headerRef} className="w-full bg-black h-20 lg:h-24 relative z-[70]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="group cursor-pointer">
                <Image
                  src="/logo_sem_fundo.png"
                  alt="logo"
                  width={110}
                  height={45}
                  className="transition-all duration-500"
                />
              </Link>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-300 link-underline pb-3">Home</Link>
              <Link href="/produtos" className="text-white hover:text-gray-300 link-underline pb-3">Produtos</Link>
              <Link href="/sobre" className="text-white hover:text-gray-300 link-underline pb-3">Sobre nós</Link>
              <Link href="/contato" className="text-white hover:text-gray-300 link-underline pb-3">Contato</Link>
              {isAdmin && (
                <Link href="/admin/dashboard" className="text-white hover:text-gray-300 link-underline pb-3">
                  Admin
                </Link>
              )}
            </nav>

            {/* Ícones Desktop */}
            <div className="hidden md:flex items-center justify-center gap-4">
              <DropdownHeader icone={<User size={24} className="text-white cursor-pointer mb-1" />} />
              <MiniCart />
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden flex items-center gap-4">
              <DropdownHeader icone={<User className="text-white cursor-pointer" />} />
              <div className="mt-1"><MiniCart /></div>
              <button onClick={() => setIsMenuOpen(true)} className="flex items-center text-white cursor-pointer">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HEADER COMPACTO */}
      {(showCompact || isCompactClosing) && (
        <div
          className={`w-full fixed top-0 z-[70] bg-black shadow-md h-14 lg:h-16 transition-all duration-500
            ${showCompact && !isCompactClosing ? "animate-slideDown" : ""}
            ${isCompactClosing ? "animate-slideUp" : ""}`}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hidden md:flex items-center text-white font-medium gap-2 cursor-pointer"
            >
              <Menu size={20} />
              MENU
            </button>

            <div>
              <Link href="/" className="group cursor-pointer">
                <Image
                  src="/logo_sem_fundo.png"
                  alt="logo"
                  width={90}
                  height={35}
                  className="transition-all duration-500 scale-90 -mt-1"
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-4">
              <DropdownHeader icone={<User size={22} className="text-white cursor-pointer" />} />
              <MiniCart />
            </div>
          </div>
        </div>
      )}

      {/* MENU LATERAL */}
      {(isMenuOpen || isClosing) && (
        <div
          className={`fixed inset-0 z-[80] flex ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Overlay (só quando aberto) */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 cursor-pointer"
              onClick={handleCloseMenu}
            />
          )}

          {/* Sidebar */}
          <div
            className={`relative w-64 bg-black text-white h-full shadow-lg p-6
              ${isClosing ? "animate-slideOut" : "animate-slideIn"} pointer-events-auto`}
            role="dialog"
            aria-modal="true"
          >
            <button onClick={handleCloseMenu} className="absolute top-4 right-4 cursor-pointer">
              <X size={24} />
            </button>

            <nav className="mt-8 flex flex-col gap-4">
              <Link href="/" onClick={handleCloseMenu}><span className="link-underline">Home</span></Link>
              <Link href="/produtos" onClick={handleCloseMenu}><span className="link-underline">Produtos</span></Link>
              <Link href="/sobre" onClick={handleCloseMenu}><span className="link-underline">Sobre nós</span></Link>
              <Link href="/contato" onClick={handleCloseMenu}><span className="link-underline">Contato</span></Link>
              {isAdmin && (
                <Link href="/admin/dashboard" onClick={handleCloseMenu}><span className="link-underline">Admin</span></Link>
              )}
            </nav>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }

        @keyframes slideUp {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
        .animate-slideUp { animation: slideUp 0.2s ease-in forwards; }

        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideOut { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        .animate-slideOut { animation: slideOut 0.3s ease-in forwards; }
      `}</style>
    </>
  );
};

export default Header;
