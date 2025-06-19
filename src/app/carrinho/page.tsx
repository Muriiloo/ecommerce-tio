"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import AddressManager from "@/components/AddressManager";

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
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CarrinhoPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handlePayment = async () => {
    if (!paymentMethod) {
      setErrorMsg("Selecione uma forma de pagamento.");
      return;
    }

    if (!selectedAddress) {
      setErrorMsg("Selecione um endereço de entrega.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const orderRes = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          totalAmount: total,
          paymentMethod,
          items: cart,
          address: selectedAddress,
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        if (errorData.error) {
          setErrorMsg(errorData.error);
          return;
        }
      }
      const { orderId } = await orderRes.json();

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!checkoutRes.ok) {
        setErrorMsg("Erro ao iniciar o pagamento.");
        return;
      }

      if (checkoutRes.ok) {
        clearCart();
      }

      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      setErrorMsg("Erro inesperado! Tente novamente." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <Link href={`/productPage/${item.id}`} className="block">
                    <h2 className="font-semibold">{item.name}</h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {item.quantity}x R${item.price.toFixed(2)}
                  </p>
                  {item.selectedSize && (
                    <p className="text-xs text-gray-500">
                      Tamanho: {item.selectedSize}
                    </p>
                  )}
                  {item.selectedColor && (
                    <p className="text-xs text-gray-500">
                      Cor: {item.selectedColor}
                    </p>
                  )}
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600"
                >
                  Remover
                </button>
              </li>
            ))}{" "}
          </ul>{" "}
          {user?.id && (
            <div className="mt-6">
              <AddressManager
                userId={user.id}
                selectedAddress={selectedAddress}
                onAddressSelect={setSelectedAddress}
              />
            </div>
          )}
          <div className="mt-6">
            <div className="flex justify-between">
              <p className="text-xl font-bold">Total: R${total.toFixed(2)}</p>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-[230px]">
                  <SelectValue placeholder="Forma de pagamento..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pagamento</SelectLabel>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="credito">Cartão de crédito</SelectItem>
                    <SelectItem value="debito">Cartão de débito</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={clearCart}
              variant="ghost"
              className="mt-2 text-sm text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 font-medium transition rounded"
            >
              Limpar carrinho
            </Button>

            <Button
              onClick={handlePayment}
              disabled={!paymentMethod || loading}
              className="flex items-center justify-center gap-2 w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl shadow-md hover:brightness-110 transition-all font-semibold text-lg"
            >
              {loading ? (
                "Aguarde…"
              ) : (
                <>
                  <CreditCard size={20} />
                  Prosseguir com Pagamento
                </>
              )}
            </Button>
            {errorMsg && (
              <div className="text-red-600 text-sm text-center mt-4">
                {errorMsg}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
