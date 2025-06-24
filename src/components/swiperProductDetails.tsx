"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const galleryImages = [imageUrl, ...images];

  return (
    <div className="w-full">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-xl"
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[450px] md:h-[500px] lg:h-[550px]">
              <Image
                src={img}
                alt={`${name} - ${index + 1}`}
                width={1920}
                height={1080}
                className="object-contain w-full h-full rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mt-4"
      >
        {galleryImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full aspect-square">
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-md border"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
