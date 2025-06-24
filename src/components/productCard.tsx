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

  console.log(product);

  return (
    <Card
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.010] cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="relative h-90 flex items-center justify-center">
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

          {/* Badge de DESTAQUE */}
          {product.isFeatured && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
              DESTAQUE
            </span>
          )}

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

        <div className="p-6 text-center">
          <h3 className="text-md font-medium text-gray-700 min-h-[3rem] leading-tight">
            {product.name}
          </h3>

          {/* Linha separadora */}
          <div className="w-full h-px bg-gray-300 my-2" />

          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-blue-500 drop-shadow">
              R$ {Number(product.price).toFixed(2)}
            </span>

            <div className="flex justify-center mt-4 w-full">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/productPage/${product.id}`);
                }}
                className="bg-gradient-to-r transition-colors duration-300 from-blue-500 to-teal-400 group-hover:from-blue-700 text-white px-4 py-2 rounded font-semibold w-full cursor-pointer"
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
