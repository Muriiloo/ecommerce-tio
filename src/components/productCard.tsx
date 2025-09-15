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
    isFeatured?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const isLowStock = product.stockQuantity < 5;

  const handleCardClick = () => {
    router.push(`/productPage/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden cursor-pointer border-0 bg-gray-50"
    >
      {/* Imagem */}
      <div className="relative w-full aspect-[3/4]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        )}

        {product.isFeatured && (
          <span className="absolute top-2 bg-yellow-400 text-black text-[10px] font-light px-2 py-1 uppercase">
            Lançamento
          </span>
        )}

        {isLowStock && (
          <span className="absolute top-2 right-0 bg-red-600 text-white text-[10px] font-light px-2 py-1">
            Últimas {product.stockQuantity}
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <CardContent className="flex flex-col items-center text-center py-4 px-0">
        <h3 className="text-xs font-medium text-gray-800 mb-2 min-h-[2rem]">
          {product.name}
        </h3>

        {/* Preços */}
        <div className="flex flex-col items-center text-sm pb-4">
          <p className="text-lg font-semibold text-gray-900">
            R$ {(product.price * 0.88).toFixed(2)} <span className="text-xs">no pix</span>
          </p>
          <p className="text-gray-500 text-xs">
            <span className="text-sm">R$ {Number(product.price).toFixed(2)}</span> em até 12x de R$ {(product.price / 12).toFixed(2)}
          </p>
        </div>

        {/* Botão */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/productPage/${product.id}`);
          }}
          className="mt-4 w-full bg-black text-white rounded-xs cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-300"
        >
          EU QUERO
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
