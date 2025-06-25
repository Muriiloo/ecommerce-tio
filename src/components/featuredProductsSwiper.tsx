"use client";

import { useRef, useEffect, useState } from "react";
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
      // Fazendo cast de tipo seguro
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
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold italic text-gray-900 mb-1">
          Destaques
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
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
    </section>
  );
};

export default FeaturedProductsSwiper;
