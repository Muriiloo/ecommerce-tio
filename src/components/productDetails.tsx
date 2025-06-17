"use client";

import { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import type { Swiper as SwiperClass } from "swiper";
import ProductFreteCalculator from "@/components/freteCalculator";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    images: string[];
    details: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-8">
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

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600 mb-6">
            R$ {product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <p className="font-semibold mb-3">Escolha a cor:</p>
            <div className="flex gap-3">
              {["bege", "branco", "preto"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">Escolha o tamanho:</p>
            <div className="flex gap-3">
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

          <button
            onClick={handleAddToCart}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition mb-6"
          >
            Adicionar à Sacola
          </button>

          {/* Novo componente de cálculo de frete */}
          <ProductFreteCalculator />
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold mb-4 italic">Descrição Longa</h2>
          <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 italic">Detalhes do Produto</h2>
          <div className="text-gray-700 whitespace-pre-line">{product.details}</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tabela de Medidas</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Tamanho</th>
              <th className="border px-4 py-2">Altura (cm)</th>
              <th className="border px-4 py-2">Largura (cm)</th>
            </tr>
          </thead>
          <tbody>
            {[["P", "68", "50"], ["M", "70", "52"], ["G", "72", "54"], ["GG", "74", "56"]].map(
              ([size, height, width]) => (
                <tr key={size}>
                  <td className="border px-4 py-2">{size}</td>
                  <td className="border px-4 py-2">{height}</td>
                  <td className="border px-4 py-2">{width}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Avaliações</h2>
        <div className="space-y-4">
          {[{ name: "João S.", rating: "⭐⭐⭐⭐⭐", comment: "Muito boa! Chegou antes do prazo e a qualidade é ótima." },
            { name: "Ana P.", rating: "⭐⭐⭐⭐", comment: "Gostei bastante, mas achei a modelagem um pouco grande." }].map(
            (review, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <p className="font-semibold">{review.name}</p>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Produtos Relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ name: "Camiseta Branca", image: "/camiseta-branca.jpg" },
            { name: "Camiseta Preta", image: "/camiseta-preta.jpg" },
            { name: "Camiseta Bege", image: "/camiseta-bege.jpg" },
            { name: "Camiseta Verde", image: "/camiseta-verde.jpg" }].map((item) => (
            <div key={item.name} className="border rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="object-cover w-full"
              />
              <div className="p-2">
                <p className="font-semibold">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Garantia e Entrega</h2>
        <p className="text-gray-700">
          ✔ Entrega garantida em todo o Brasil.<br />
          ✔ Você pode solicitar troca ou devolução em até 7 dias após o recebimento.<br />
          ✔ Produto com garantia contra defeitos de fabricação.
        </p>
      </div>
    </div>
  );
}
