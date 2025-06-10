'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Deseja realmente excluir este pedido?')) return;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order.id !== id));
      } else {
        alert('Erro ao excluir o pedido.');
      }
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      alert('Erro ao excluir o pedido.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      {loading ? (
        <p>Carregando pedidos...</p>
      ) : orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Usuário</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Pagamento</th>
              <th className="p-2 text-left">Criado em</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-300">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.userId}</td>
                <td className="p-2 capitalize">{order.status}</td>
                <td className="p-2">R$ {Number(order.totalAmount).toFixed(2)}</td>
                <td className="p-2">{order.paymentMethod}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
