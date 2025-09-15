"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import ProductCard from "@/components/productCard";
import ProductFreteCalculator from "@/components/freteCalculator";
import SwiperProductDetails from "@/components/swiperProductDetails";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    imageUrl: string;
    images: string[];
    details: string;
    stockQuantity: number;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    ProductDetailsProps["product"][]
  >([]);
  const [error, setError] = useState<string | null>(null);

  // Modal de pagamento
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Estado da quantidade
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const res = await fetch(`/api/related-products?id=${product.id}`);
      const data = await res.json();
      setRelatedProducts(data);
    };

    fetchRelatedProducts();
  }, [product.id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Por favor, selecione o tamanho.");
      return;
    }

    addToCart({
      id: product.id + selectedSize,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.imageUrl,
      selectedSize,
      stockQuantity: product.stockQuantity,
    });

    setError("");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl">
          {/* Carrossel de imagens */}
          <div className="w-full md:w-1/2">
            <SwiperProductDetails
              name={product.name}
              imageUrl={product.imageUrl}
              images={product.images}
            />
          </div>

          {/* Detalhes e seleção */}
          <div className="flex-1">
            <h1 className="text-3xl mb-6">{product.name}</h1>
            <p className="text-xs whitespace-pre-line max-w-[70%]">
              {product.description}
            </p>
            <div className="w-full h-px bg-gray-300 my-8" />

            <div>
              <p className="text-sm mb-3">Escolha o tamanho:</p>
              <div className="flex gap-2 items-center flex-wrap">
                {["P", "M", "G", "GG"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 text-sm ${
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

            {/* Preços */}
            <div className="flex flex-col items-start mt-6">
              <p className="text-2xl font-semibold text-gray-900">
                R$ {(product.price * 0.88).toFixed(2)}{" "}
                <span className="text-sm">no pix</span>
              </p>
              <p className="text-gray-500 text-sm">
                <span className="line-through">
                  R$ {product.price.toFixed(2)}
                </span>{" "}
                em até 12x de R$ {(product.price / 12).toFixed(2)}
              </p>

              {/* Botão Formas de Pagamento */}
              <button
                onClick={() => setShowPaymentModal(true)}
                className="relative text-sm text-gray-600 mt-2 cursor-pointer link-underline after:!bg-black"
              >
                Formas de pagamento
              </button>
            </div>

            <div className="w-full h-px bg-gray-300 my-8" />

            {/* Quantidade + Botão + Aviso */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* Controle de quantidade */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || product.stockQuantity === 0}
                    className="px-3 py-1 rounded-xs transition-colors duration-300 cursor-pointer 
                   hover:bg-black hover:text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>

                  <span className="w-6 text-center">{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stockQuantity, q + 1))
                    }
                    disabled={
                      quantity >= product.stockQuantity ||
                      product.stockQuantity === 0
                    }
                    className="px-3 py-1 rounded-xs transition-colors duration-300 cursor-pointer 
                   hover:bg-black hover:text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>

                {/* Botão Adicionar / Esgotado */}
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                  className={`font-medium px-4 py-2 transition-colors duration-300 rounded-xs 
                    ${
                      product.stockQuantity === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-700 cursor-pointer"
                    }`}
                >
                  <span className="p-4 uppercase">
                    {product.stockQuantity === 0 ? "Esgotado" : "Eu Quero"}
                  </span>
                </Button>
              </div>

              {/* Aviso de estoque baixo */}
              {product.stockQuantity > 0 && product.stockQuantity < 5 && (
                <div className="w-full bg-black text-white text-center text-sm rounded-full py-2">
                  Corra antes que acabe! Últimas {product.stockQuantity}{" "}
                  unidades
                </div>
              )}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-6">
              <ProductFreteCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      <div className="mt-38">
        <h2 className="text-2xl text-center font-semibold mb-4 uppercase">
          Veja também
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p className="text-gray-600">
              Nenhum produto relacionado encontrado.
            </p>
          )}
        </div>
      </div>

      {/* Modal de Formas de Pagamento */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-xs shadow-lg w-[90%] max-w-md p-6 pb-12 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowPaymentModal(false)}
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>

            <h2 className="text-center text-lg font-medium mb-6">
              Formas de pagamento
            </h2>

            {/* Pix */}
            <div className="mb-6">
              <h3 className="text-sm mb-2 text-center">Pix</h3>
              <p className="border p-2 text-center rounded-xs border-t-2 border-t-black">
                R$ {(product.price * 0.88).toFixed(2)}
              </p>
            </div>

            {/* Cartão */}
            <div>
              <h3 className="text-sm mb-2 text-center">Cartão de crédito</h3>
              <div className="border rounded-xs border-t-2 border-t-black">
                {[...Array(12)].map((_, i) => {
                  const installment = i + 1;
                  const installmentValue = (
                    product.price / installment
                  ).toFixed(2);
                  return (
                    <p
                      key={installment}
                      className="px-4 py-2 text-sm text-center"
                    >
                      {installment}x de R$ {installmentValue}{" "}
                      {installment === 1 ? "sem juros" : "com juros"}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
