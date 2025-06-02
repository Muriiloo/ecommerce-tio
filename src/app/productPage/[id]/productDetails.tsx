"use client";

import { useCart } from "@/context/cartContext";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/2 rounded-xl object-cover"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600 mb-6">
          R$ {product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
