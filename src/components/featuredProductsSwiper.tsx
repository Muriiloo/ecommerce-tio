"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/productCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "@prisma/client";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProductsSwiperProps {
  products: Product[];
}

const FeaturedProductsSwiper = ({ products }: FeaturedProductsSwiperProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (
      swiperInstance &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation !== "boolean" &&
      prevRef.current &&
      nextRef.current
    ) {
      const navigation = swiperInstance.params.navigation;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  if (!products.length) return null;

  return (
    <section className="container mx-auto px-4 py-16 mt-48">
      <div className="text-center mb-10">
        <h2 className="font-century text-3xl md:text-4xl font-semibold text-gray-900 mb-1 uppercase">
          lançamentos
        </h2>
        <p className="font-century text-lg text-gray-600 max-w-2xl mx-auto">
          Produtos selecionados especialmente para você
        </p>
      </div>

      {/* Setas acima do swiper */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          ref={prevRef}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          ref={nextRef}
          className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Navigation]}
        onSwiper={setSwiperInstance}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((produto) => (
          <SwiperSlide key={produto.id}>
            <ProductCard
              product={{
                id: produto.id,
                name: produto.name,
                image: produto.imageUrl,
                description: produto.description,
                price: Number(produto.price),
                stockQuantity: produto.stockQuantity,
                isFeatured: produto.isFeatured,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botão para ver todos os destaques */}
      <div className="flex justify-center mt-4">
        <Link
          href="/produtos?featured=true"
          className="px-10 py-2 bg-black text-white hover:bg-gray-800 transition uppercase text-sm"
        >
          Ver todos os lançamentos
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProductsSwiper;
