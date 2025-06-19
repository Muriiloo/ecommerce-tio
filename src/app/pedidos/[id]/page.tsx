"use client";

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  CreditCard,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  selectedSize?: string;
  selectedColor?: string;
  product: {
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
  deliveryStreet?: string;
  deliveryNumber?: string;
  deliveryComplement?: string;
  deliveryNeighborhood?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryZipCode?: string;
  deliveryPhone?: string;
  items: OrderItem[];
}

const statusConfig = {
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    description: "Aguardando confirmação do pagamento",
  },
  paid: {
    label: "Pago",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    description: "Pagamento confirmado, preparando para envio",
  },
  shipped: {
    label: "Enviado",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Truck,
    description: "Pedido enviado, acompanhe o rastreamento",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    description: "Pedido cancelado",
  },
};

const DetalhePedido = () => {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !params.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          router.push("/pedidos");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do pedido:", error);
        router.push("/pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, params.id, router]);
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
            Você precisa estar logado para ver este pedido
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600">Carregando detalhes do pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pedido não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            O pedido solicitado não foi encontrado
          </p>
          <Link href="/pedidos">
            <Button className="bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 hover:to-orange-800">
              Voltar aos Pedidos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-rose-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-6 py-20">
          <div className="mb-8">
            <Link href="/pedidos">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Pedidos
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-yellow-500 via-amber-700 to-orange-900 p-4 rounded-2xl shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 bg-clip-text text-transparent">
                  Pedido #{order.id.slice(-8).toUpperCase()}
                </h1>
                <p className="text-gray-600">
                  Realizado em {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Status do Pedido
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-2xl ${
                      statusConfig[order.status].color
                    }`}
                  >
                    <StatusIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {statusConfig[order.status].label}
                    </h3>
                    <p className="text-gray-600">
                      {statusConfig[order.status].description}
                    </p>
                  </div>
                </div>

                {order.status === "shipped" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-bold text-blue-900 mb-2">
                      Código de Rastreamento
                    </h4>
                    <p className="text-blue-700 font-mono text-lg mb-3">
                      BR123456789BR
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Truck className="w-4 h-4 mr-2" />
                      Rastrear Pedido
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Produtos do Pedido
                </h2>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-white/20"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {item.selectedSize && (
                            <span>Tamanho: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span>Cor: {item.selectedColor}</span>
                          )}
                          <span>Qtd: {item.quantity}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {formatPrice(item.priceAtPurchase)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x {formatPrice(item.priceAtPurchase)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Resumo do Pedido
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">Forma de Pagamento:</span>
                  </div>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>

                {order.status === "paid" && (
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Nota Fiscal
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Comprovante de Pagamento
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Entrega
                </h2>{" "}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Endereço de Entrega
                      </p>
                      {order.deliveryStreet ? (
                        <p className="text-gray-600 text-sm">
                          {order.deliveryStreet}, {order.deliveryNumber}
                          {order.deliveryComplement &&
                            `, ${order.deliveryComplement}`}
                          <br />
                          {order.deliveryNeighborhood} - {order.deliveryCity},{" "}
                          {order.deliveryState}
                          <br />
                          CEP: {order.deliveryZipCode}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Endereço não informado
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Telefone</p>
                      <p className="text-gray-600 text-sm">
                        {order.deliveryPhone || "Não informado"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-rose-600/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-2">
                  Precisa de Ajuda?
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Nossa equipe está pronta para te ajudar
                </p>
                <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                  <Mail className="w-4 h-4 mr-2" />
                  Falar com Suporte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhePedido;
