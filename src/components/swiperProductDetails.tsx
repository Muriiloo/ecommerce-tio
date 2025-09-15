"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

interface SwiperProductDetailsProps {
  name: string;
  imageUrl: string;
  images: string[];
}

export default function SwiperProductDetails({
  name,
  imageUrl,
  images,
}: SwiperProductDetailsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const galleryImages = [imageUrl, ...images];

  // estados do zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex items-start gap-6">
        {/* THUMBS - escondido no mobile */}
        <div className="hidden md:block">
          <Swiper
            onSwiper={(s) => setThumbsSwiper(s)}
            direction="vertical"
            spaceBetween={2}
            slidesPerView={7}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className="w-14 h-[550px]"
          >
            {galleryImages.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="cursor-pointer [&.swiper-slide-thumb-active>div]:border-black"
              >
                <div
                  className="
                  w-full aspect-[3/4] overflow-hidden 
                  border border-transparent hover:border-black
                  transition-colors duration-300
                  flex items-center justify-center p-1 bg-white
                "
                >
                  <Image
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    width={500}
                    height={500}
                    className="thumb-image object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* IMAGEM PRINCIPAL */}
        <div className="flex-1 min-w-0">
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#111827",
                "--swiper-pagination-color": "#111827",
              } as React.CSSProperties
            }
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, FreeMode]}
            className="h-[550px] rounded-md overflow-hidden"
          >
            {galleryImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="w-full h-[550px] flex items-center justify-center bg-white overflow-hidden relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                >
                  <Image
                    src={img}
                    alt={`${name} - ${idx + 1}`}
                    width={1200}
                    height={1600}
                    className="object-fill w-full transition-transform duration-200"
                    style={{
                      transform: isZoomed ? "scale(2)" : "scale(1)",
                      transformOrigin: transformOrigin,
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
