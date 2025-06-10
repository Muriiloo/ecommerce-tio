"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Deseja realmente excluir este pedido?")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert("Erro ao excluir o pedido.");
      }
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      alert("Erro ao excluir o pedido.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Pedidos</h1>

      {loading ? (
        <p className="text-gray-500">Carregando pedidos...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Nenhum pedido encontrado.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                  Data do Pedido
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 uppercase">
                  Valor (R$)
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 capitalize">
                    {order.status}
                  </td>
                  <td className="px-4 py-4 text-sm  text-right font-medium text-green-600">
                    R$ {Number(order.totalAmount).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 text-center">
                    <Button
                      onClick={() => deleteOrder(order.id)}
                      variant="destructive"
                      size="sm"
                      className="px-3 py-1"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
