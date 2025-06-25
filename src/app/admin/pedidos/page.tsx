"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  totalAmount: number;
  createdAt: string;
}

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  paid: {
    label: "Pago",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  shipped: {
    label: "Enviado",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Truck,
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
  },
};

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoadingUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="text-lg font-medium text-gray-600">Carregando...</span>
      </div>
    );
  }

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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, status: newStatus as Order["status"] }
              : order
          )
        );
      } else {
        alert("Erro ao atualizar status do pedido.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status do pedido.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Pedidos</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Data do Pedido
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase w-48">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 uppercase">
                Valor (R$)
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 uppercase w-64">
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
                <td className="px-4 py-4 text-sm text-gray-800">
                  {(() => {
                    const config = statusConfig[order.status];
                    const StatusIcon = config.icon;
                    return (
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-4 py-4 text-sm  text-right font-medium text-green-600">
                  R$ {Number(order.totalAmount).toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        updateOrderStatus(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Pendente
                          </span>
                        </SelectItem>
                        <SelectItem value="paid">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Pago
                          </span>
                        </SelectItem>
                        <SelectItem value="shipped">
                          <span className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Enviado
                          </span>
                        </SelectItem>
                        <SelectItem value="cancelled">
                          <span className="flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            Cancelado
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => deleteOrder(order.id)}
                      variant="destructive"
                      size="sm"
                      className="px-3 py-1"
                    >
                      Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
