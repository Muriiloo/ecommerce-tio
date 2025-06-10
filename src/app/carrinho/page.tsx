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
import { CreditCard } from "lucide-react";
import { useState } from "react";

const CarrinhoPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          totalAmount: total,
          paymentMethod,
          items: cart,
        }),
      });

      if (response.ok) {
        setSuccessMsg("Pedido realizado com sucesso!");
        setTimeout(() => {
          clearCart();
          setSuccessMsg("");
        }, 2000);
        return;
      } else {
        setErrorMsg("Erro ao gravar pedido.");
      }
    } catch (err) {
      alert("Erro ao conectar com o server" + err);
      setErrorMsg("Erro de servidor.");
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
                  <h2 className="font-semibold">{item.name}</h2>
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
            ))}
          </ul>

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
              className="flex items-center justify-center gap-2 w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl shadow-md hover:brightness-110 transition-all font-semibold text-lg"
            >
              <CreditCard size={20} />
              Prosseguir com Pagamento
            </Button>
            {errorMsg && (
              <div className="text-red-600 text-sm text-center mt-4">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="text-green-600 text-sm text-center mt-4">
                {successMsg}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
