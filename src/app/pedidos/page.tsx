"use client";

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  CreditCard,
  Eye,
  Search,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  selectedSize?: string;
  selectedColor?: string;
  product?: {
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  userId: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  items?: OrderItem[];
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

const Pedidos = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  useEffect(() => {
    const fetchOrdersData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/orders?userId=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?userId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-6">
            Você precisa estar logado para ver seus pedidos
          </p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 hover:to-orange-800">
              Fazer Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-rose-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 via-amber-700 to-orange-900 rounded-3xl mb-8 shadow-2xl">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 bg-clip-text text-transparent mb-6">
              Meus Pedidos
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Acompanhe o status dos seus pedidos e histórico de compras
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por ID do pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-6 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="shipped">Enviado</option>
                  <option value="cancelled">Cancelado</option>
                </select>

                <button
                  onClick={fetchOrders}
                  className="inline-flex items-center px-4 py-4 bg-white/80 hover:bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg"
                >
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  Histórico de Pedidos
                </h2>
                <p className="text-gray-600">
                  {filteredOrders.length} pedidos encontrados
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-spin" />
                <p className="text-gray-600">Carregando pedidos...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Você ainda não fez nenhum pedido"}
                </p>
                <Link href="/produtos">
                  <Button className="bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 hover:to-orange-800">
                    Explorar Produtos
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;

                  return (
                    <div
                      key={order.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl">
                              <Package className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                Pedido #{order.id.slice(-8).toUpperCase()}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(order.createdAt)}
                                </div>
                                <div className="flex items-center gap-1">
                                  <CreditCard className="w-4 h-4" />
                                  {order.paymentMethod}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                                  statusConfig[order.status].color
                                }`}
                              >
                                <StatusIcon className="w-4 h-4" />
                                {statusConfig[order.status].label}
                              </span>

                              <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(order.totalAmount)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Link href={`/pedidos/${order.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-purple-50"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver Detalhes
                                </Button>
                              </Link>

                              {order.status === "paid" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-green-50"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Nota Fiscal
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = orders.filter(
                (order) => order.status === status
              ).length;
              const StatusIcon = config.icon;

              return (
                <div
                  key={status}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${config.color
                        .replace("text-", "text-")
                        .replace("bg-", "bg-")
                        .replace("border-", "")}`}
                    >
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {count}
                      </p>
                      <p className="text-gray-600 text-sm">{config.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
