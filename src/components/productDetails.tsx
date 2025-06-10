"use client";

import { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor, selecione o tamanho e a cor.");
      return;
    }

    addToCart({
      id: product.id + selectedSize + selectedColor,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
      selectedSize,
      selectedColor,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/2 rounded-xl object-cover"
        width={1920}
        height={1080}
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Cores */}
        <div className="mb-4">
          <p className="font-semibold mb-2">Escolha a cor:</p>
          <div className="flex gap-2">
            {["bege", "branco", "preto"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Tamanhos */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Escolha o tamanho:</p>
          <div className="flex gap-2">
            {["P", "M", "G", "GG"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded border ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <p className="text-2xl font-semibold text-green-600 mb-6">
          R$ {product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Adicionar à Sacola
        </button>
      </div>
    </div>
  );
}
