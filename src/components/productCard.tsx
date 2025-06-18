"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    stockQuantity: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const isLowStock = product.stockQuantity < 5;

  return (
    <Card
      onClick={() => router.push(`/productPage/${product.id}`)}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
    >
      <div className="relative w-full h-56 sm:h-64 bg-gray-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-10 h-10 text-gray-300 animate-spin" />
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-blue-600 shadow-sm">
          NOVO
        </div>

        {isLowStock && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm animate-pulse">
            Últimas {product.stockQuantity}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-baseline justify-between mt-4">
          <span className="text-xl font-bold text-green-600">
            R$ {product.price.toFixed(2)}
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/productPage/${product.id}`);
            }}
            variant="default"
            className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white rounded-lg transition"
          >
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
