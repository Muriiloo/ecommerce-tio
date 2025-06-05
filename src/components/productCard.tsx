"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {product.map((item) => (
        <Card
          key={item.id}
          className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl"
        >
          <CardContent className="p-0">
            <div className="relative h-56 bg-gradient-to-br from-blue-100 via-white to-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-400 opacity-30 select-none">
                  <ShoppingCart size={60} />
                </span>
              </div>
              <span className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow">
                NOVO
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition">
                  {item.name}
                </h3>
                <button
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  className="rounded-full bg-blue-50 p-2 shadow hover:bg-blue-600 hover:text-white transition-colors"
                  title="Adicionar ao carrinho"
                >
                  <ShoppingCart className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-500 mb-6 min-h-[48px]">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-extrabold text-green-600 drop-shadow">
                  R$ {item.price.toFixed(2)}
                </span>
                <Button
                  onClick={() => router.push(`/productPage/${item.id}`)}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow transition-all"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none group-hover:bg-blue-50/20 transition" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
