"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useCart } from "@/context/cartContext";
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

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const isLowStock = product.stockQuantity < 5;

  const handleCardClick = () => {
    router.push(`/productPage/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="relative h-90 bg-gradient-to-br from-blue-100 via-white to-gray-100 flex items-center justify-center">
          {/* Imagem */}
          <div className="absolute inset-0 flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            )}
          </div>

          {/* Badge de NOVO */}
          <span className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow">
            NOVO
          </span>

          {/* Badge de ESTOQUE BAIXO */}
          {isLowStock && (
            <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse">
              Últimas {product.stockQuantity} unidades!
            </span>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800">
            {product.name}
          </h3>

          <div className="flex flex-col gap-4 mt-6">
            <span className="text-lg font-semibold text-red-700 drop-shadow">
              R$ {product.price.toFixed(2)}
            </span>

            <div className="flex items-center justify-between gap-4 mt-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/productPage/${product.id}`);
                }}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold w-[75%]"
              >
                Ver detalhes
              </Button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    id: product.id,
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                  });
                }}
                className="bg-black text-white p-2 rounded hover:bg-gray-800 transition w-full items-center justify-center flex"
                title="Adicionar ao carrinho"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none group-hover:bg-blue-50/20 transition" />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
