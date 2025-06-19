"use client";

import { useState, useEffect } from "react";
import { MapPin, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface AddressManagerProps {
  userId: string;
  selectedAddress: Address | null;
  onAddressSelect: (address: Address) => void;
}

const AddressManager = ({
  userId,
  selectedAddress,
  onAddressSelect,
}: AddressManagerProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });
  useEffect(() => {
    const loadAddresses = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/addresses?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);

          const defaultAddress = data.find((addr: Address) => addr.isDefault);
          if (defaultAddress && !selectedAddress) {
            onAddressSelect(defaultAddress);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar endereços:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [userId, selectedAddress, onAddressSelect]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (response.ok) {
        const newAddress = await response.json();
        setAddresses([...addresses, newAddress]);
        setFormData({
          name: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: "",
          isDefault: false,
        });
        setShowForm(false);

        if (newAddress.isDefault) {
          onAddressSelect(newAddress);
        }
      }
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.number}${
      address.complement ? `, ${address.complement}` : ""
    } - ${address.neighborhood}, ${address.city}/${address.state} - CEP: ${
      address.zipCode
    }`;
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Endereço de Entrega
        </h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Endereço
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedAddress?.id === address.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 bg-white/60 hover:border-purple-300"
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {address.name}
                  </span>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Padrão
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {formatAddress(address)}
                </p>
              </div>

              {selectedAddress?.id === address.id && (
                <Check className="w-5 h-5 text-purple-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Nenhum endereço cadastrado</p>
          <p className="text-sm">Adicione um endereço para continuar</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="border-t pt-4 space-y-4">
          <h4 className="font-medium text-gray-900">Novo Endereço</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do endereço (ex: Casa, Trabalho)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="CEP"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="Rua/Avenida"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="Número"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="Complemento (opcional)"
              value={formData.complement}
              onChange={(e) =>
                setFormData({ ...formData, complement: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={(e) =>
                setFormData({ ...formData, neighborhood: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="text"
              placeholder="Cidade"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <select
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Selecione o Estado</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Definir como endereço padrão
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Salvar Endereço
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressManager;
