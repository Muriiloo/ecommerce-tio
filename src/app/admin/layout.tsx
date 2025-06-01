import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-black text-white shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Painel Admin
          </h2>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              Dashboard
            </Link>

            <Link
              href="/admin/produtos"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              Produtos
            </Link>

            <Link
              href="/admin/pedidos"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
            >
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              Pedidos
            </Link>

            <Link
              href="/admin/usuarios"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
            >
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              Usuários
            </Link>
            <Link
              href="/"
              className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200 font-medium group"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              Voltar ao site
            </Link>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
