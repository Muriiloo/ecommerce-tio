"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const { isAuthenticated, user, login } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"perfil" | "pedidos">("perfil");

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    login({ ...user!, ...formData }); // atualiza o contexto com os novos dados
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`pb-2 border-b-2 transition-all ${
              tab === "perfil"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("perfil")}
          >
            Perfil
          </button>
          <button
            className={`pb-2 border-b-2 transition-all ${
              tab === "pedidos"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setTab("pedidos")}
          >
            Pedidos
          </button>
        </div>

        {/* Perfil */}
        {tab === "perfil" && (
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/avatar.jpg"
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border border-black"
              />
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-xl font-semibold border-b border-gray-300"
                  />
                ) : (
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                )}
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Telefone</p>
                {isEditing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  <p>{user?.phone || "Não informado"}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-400">Endereço</p>
                {isEditing ? (
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded p-1"
                  />
                ) : (
                  <p>{user?.address || "Não informado"}</p>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Editar Perfil
              </button>
            )}
          </section>
        )}

        {/* Pedidos */}
        {tab === "pedidos" && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Pedidos recentes</h2>
            <ul className="space-y-4">
              <li className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #1234</p>
                  <p className="text-gray-500 text-sm">2 itens - R$ 129,90</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Entregue</span>
              </li>
              <li className="p-4 border rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">Pedido #1233</p>
                  <p className="text-gray-500 text-sm">1 item - R$ 59,90</p>
                </div>
                <span className="text-sm text-yellow-600 font-medium">Em andamento</span>
              </li>
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
