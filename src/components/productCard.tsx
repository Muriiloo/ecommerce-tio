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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {product.map((item) => (
        <Card
          key={item.id}
          className="group hover:shadow-lg transition-shadow duration-300"
        >
          <CardContent className="p-0">
            <div className="relative h-64 bg-gray-200 overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-gray-600 font-medium">Produto</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <button onClick={() => addToCart({ ...item, quantity: 1 })}>
                  <ShoppingCart className="hover:text-blue-600 transition" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  R$ {item.price.toFixed(2)}
                </span>
                <Button
                  onClick={() => router.push(`/productPage/${item.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
