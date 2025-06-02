"use client";

import { useCart } from "@/context/cartContext";

const CarrinhoPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            <p className="text-xl font-bold">Total: R${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="mt-2 text-sm text-red-600 underline"
            >
              Limpar carrinho
            </button>
            <button className="block w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
              Prosseguir com Pagamento
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
