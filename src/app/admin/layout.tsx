"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Botão de menu mobile */}
      <div className="md:hidden bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow">
        <h2 className="text-xl font-bold">Painel Admin</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gradient-to-b from-gray-900 to-black text-white shadow-xl`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Painel Admin
          </h2>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            {[
              {
                href: "/admin/dashboard",
                label: "Dashboard",
                color: "bg-blue-400",
              },
              {
                href: "/admin/produtos",
                label: "Produtos",
                color: "bg-green-400",
              },
              { 
                href: "/admin/pedidos", 
                label: "Pedidos", 
                color: "bg-orange-400" 
              },
              {
                href: "/admin/usuarios",
                label: "Usuários",
                color: "bg-purple-400",
              },
              { 
                href: "/", 
                label: "Voltar ao site", 
                color: "bg-red-400" 
              },
            ].map(({ href, label, color }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
              >
                <span
                  className={`w-2 h-2 ${color} rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                />
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
