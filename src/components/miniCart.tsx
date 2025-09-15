"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const MiniCart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative">
        <ShoppingCart className="text-white" size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <div
        className={`absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-50 p-4 transition-all duration-200 transform ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">Minha Sacola</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-center py-8">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
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
                      disabled={item.quantity >= item.stockQuantity}
                      className={`px-2 py-1 rounded ${
                        item.quantity >= item.stockQuantity
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gray-200"
                      }`}
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
        )}

        {cart.length > 0 && (
          <div className="mt-4">
            <p className="font-bold">Total: R${total.toFixed(2)}</p>
            <Link href="/carrinho">
              <button className="w-full mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Finalizar Compra
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
