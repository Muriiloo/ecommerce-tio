"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import ProductCard from "@/components/productCard";
import type { Swiper as SwiperClass } from "swiper";
import DialogTable from "@/components/dialogTable";
import ProductFreteCalculator from "@/components/freteCalculator";
import { Button } from "./ui/button";

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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<
    ProductDetailsProps["product"][]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const res = await fetch(`/api/related-products?id=${product.id}`);
      const data = await res.json();
      setRelatedProducts(data);
    };

    fetchRelatedProducts();
  }, [product.id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError("Por favor, selecione o tamanho e a cor.");
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

    setError("");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Carrossel de imagens */}
        <div className="w-full md:w-1/2">
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              } as React.CSSProperties
            }
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="rounded-xl"
          >
            {[product.imageUrl, ...product.images].map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`${product.name} - ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="object-cover w-full h-auto rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-4"
          >
            {[product.imageUrl, ...product.images].map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-auto rounded-md border"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Detalhes e seleção */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">{product.name}</h1>

          <p className="text-2xl font-semibold text-blue-500">
            R$ {product.price.toFixed(2)}
          </p>
          <div className="w-full h-px bg-gray-300 my-8" />
          <div className="mb-12">
            <p className="font-semibold mb-3">Escolha a cor:</p>
            <div className="flex gap-3">
              {["bege", "branco", "preto"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-3">Escolha o tamanho:</p>
            <div className="flex gap-3 items-center flex-wrap">
              {["P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded border cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <DialogTable product={product} />
          </div>
          <div className="w-full h-px bg-gray-300 my-8" />
          <div>
            <Button
              onClick={handleAddToCart}
              className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 cursor-pointer"
            >
              <span className="p-4">Adicionar à Sacola</span>
            </Button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>

          <div className="mt-6">
            <ProductFreteCalculator />
          </div>
        </div>
      </div>

      {/* Descrição e detalhes */}
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4 italic">Descrição Longa</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {product.description}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 italic">
            Detalhes do Produto
          </h2>
          <div className="text-gray-700 whitespace-pre-line">
            {product.details}
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
        <div className="space-y-4">
          {[
            {
              name: "João S.",
              rating: "⭐⭐⭐⭐⭐",
              comment:
                "Muito boa! Chegou antes do prazo e a qualidade é ótima.",
            },
            {
              name: "Ana P.",
              rating: "⭐⭐⭐⭐",
              comment:
                "Gostei bastante, mas achei a modelagem um pouco grande.",
            },
          ].map((review, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <p className="font-semibold">{review.name}</p>
              <p>{review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Produtos relacionados */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Produtos Relacionados</h2>
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

      {/* Garantia */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Garantia e Entrega</h2>
        <p className="text-gray-700">
          ✔ Entrega garantida em todo o Brasil.
          <br />
          ✔ Você pode solicitar troca ou devolução em até 7 dias após o
          recebimento.
          <br />✔ Produto com garantia contra defeitos de fabricação.
        </p>
      </div>
    </div>
  );
}
