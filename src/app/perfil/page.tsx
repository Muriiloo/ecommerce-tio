"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Package,
  Settings,
  Heart,
  CreditCard,
  Shield,
  Camera,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AddressManager from "@/components/AddressManager";
import Link from "next/link";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

interface Order {
  id: string;
  status: "pending" | "paid" | "shipped" | "cancelled";
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
}

interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export default function PerfilPage() {
  const { isAuthenticated, user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "perfil" | "enderecos" | "pedidos" | "configuracoes"
  >("perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const fetchUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/users/${user.id}`);
      if (response.ok) {
        const userData = await response.json();
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          street: userData.street || "",
          number: userData.number || "",
          complement: userData.complement || "",
          neighborhood: userData.neighborhood || "",
          city: userData.city || "",
          state: userData.state || "",
          zipCode: userData.zipCode || "",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }, [user?.id]);

  const fetchOrders = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`/api/orders?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  }, [user?.id]);
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      fetchUserData();
      if (activeTab === "pedidos") {
        fetchOrders();
      }
    }
  }, [isAuthenticated, activeTab, router, fetchOrders, fetchUserData]);

  if (!isAuthenticated) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUserData = await response.json();

        updateUser({
          name: updatedUserData.name,
          email: updatedUserData.email,
        });

        await fetchUserData();

        setIsEditing(false);

        alert("Perfil atualizado com sucesso!");
      } else {
        const error = await response.json();
        console.error("Erro ao salvar perfil:", error);
        alert("Erro ao salvar perfil: " + (error.error || "Erro desconhecido"));
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "paid":
        return "Pago";
      case "shipped":
        return "Enviado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const tabs = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "enderecos", label: "Endereços", icon: MapPin },
    { id: "pedidos", label: "Pedidos", icon: Package },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 via-amber-700 to-orange-900 rounded-3xl mb-8 shadow-2xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 bg-clip-text text-transparent mb-6">
              Meu Perfil
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 sticky top-6">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <User className="w-10 h-10 text-purple-600" />
                    </div>
                    <button className="cursor-pointer absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {user?.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() =>
                          setActiveTab(
                            tab.id as
                              | "perfil"
                              | "enderecos"
                              | "pedidos"
                              | "configuracoes"
                          )
                        }
                        className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 text-white shadow-lg"
                            : "text-gray-700 hover:bg-white/60"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                {activeTab === "perfil" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                        Informações Pessoais
                      </h2>
                      {!isEditing && (
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Nome Completo
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              <p className="font-medium text-gray-900">
                                {formData.name || "Não informado"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">E-mail</p>
                            {isEditing ? (
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              <p className="font-medium text-gray-900">
                                {formData.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>{" "}
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Telefone</p>
                            {isEditing ? (
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(11) 99999-9999"
                                className="w-full mt-1 px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              <p className="font-medium text-gray-900">
                                {formData.phone || "Não informado"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Status da Conta
                            </p>{" "}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                Verificada
                              </span>
                            </div>
                          </div>
                        </div>{" "}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                          Endereço Principal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CEP
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              placeholder="00000-000"
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rua/Avenida
                            </label>
                            <input
                              type="text"
                              name="street"
                              value={formData.street}
                              onChange={handleChange}
                              placeholder="Nome da rua"
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Número
                            </label>
                            <input
                              type="text"
                              name="number"
                              value={formData.number}
                              onChange={handleChange}
                              placeholder="123"
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Complemento
                            </label>
                            <input
                              type="text"
                              name="complement"
                              value={formData.complement}
                              onChange={handleChange}
                              placeholder="Apto, Bloco, etc."
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bairro
                            </label>
                            <input
                              type="text"
                              name="neighborhood"
                              value={formData.neighborhood}
                              onChange={handleChange}
                              placeholder="Nome do bairro"
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Cidade
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Nome da cidade"
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>

                          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Estado
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="">Selecione o Estado</option>
                              <option value="SP">São Paulo</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="PR">Paraná</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="BA">Bahia</option>
                              <option value="GO">Goiás</option>
                              <option value="PE">Pernambuco</option>
                              <option value="CE">Ceará</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-gradient-to-r from-green-600 to-emerald-500"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? "Salvando..." : "Salvar Alterações"}
                          </Button>
                          <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "enderecos" && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                        Meus Endereços
                      </h2>
                      <p className="text-gray-600">
                        Gerencie seus endereços de entrega
                      </p>
                    </div>

                    {user?.id && (
                      <AddressManager
                        userId={user.id}
                        selectedAddress={selectedAddress}
                        onAddressSelect={setSelectedAddress}
                      />
                    )}
                  </div>
                )}

                {activeTab === "pedidos" && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                          Meus Pedidos
                        </h2>
                        <p className="text-gray-600">
                          {orders.length} pedidos encontrados
                        </p>
                      </div>
                      <Link href="/pedidos">
                        <Button variant="outline">Ver Todos os Pedidos</Button>
                      </Link>
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-20">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Nenhum pedido encontrado
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Você ainda não fez nenhum pedido
                        </p>
                        <Link href="/produtos">
                          <Button className="cursor-pointer bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900">
                            Explorar Produtos
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div
                            key={order.id}
                            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                                  <Package className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900">
                                    Pedido #{order.id.slice(-8).toUpperCase()}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(order.createdAt)} •{" "}
                                    {order.items.length}{" "}
                                    {order.items.length === 1
                                      ? "item"
                                      : "itens"}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-lg text-gray-900">
                                  {formatPrice(order.totalAmount)}
                                </p>
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusLabel(order.status)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "configuracoes" && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                        Configurações
                      </h2>
                      <p className="text-gray-600">
                        Gerencie suas preferências e configurações da conta
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Notificações por E-mail
                              </h3>
                              <p className="text-sm text-gray-600">
                                Receber atualizações sobre pedidos
                              </p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                              <Heart className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Lista de Desejos
                              </h3>
                              <p className="text-sm text-gray-600">
                                Salvar produtos favoritos
                              </p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                Métodos de Pagamento
                              </h3>
                              <p className="text-sm text-gray-600">
                                Gerenciar cartões salvos
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar
                          </Button>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-2xl p-6 border border-red-200 mt-8">
                        <h3 className="font-medium text-red-900 mb-2">
                          Fazer logout
                        </h3>
                        <p className="text-sm text-red-700 mb-4">
                          Deseja sair da sua conta?
                        </p>
                        <Button
                          onClick={logout}
                          variant="destructive"
                          size="sm"
                        >
                          Sair
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
