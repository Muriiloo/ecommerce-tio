import { transformProducts } from "@/lib/transformedProducts";
import ProductCard from "@/components/productCard";
import FeaturedProductsSwiper from "@/components/featuredProductsSwiper";

import { db } from "@/lib/prisma";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Home = async () => {
  const products = await db.product.findMany({});
  const transformedProducts = transformProducts(products);
  const featuredProducts = products.filter((p) => p.isFeatured);

  const images = [
    { src: "/teste.jpg", alt: "Produto 1", title: "Novidades da Temporada" },
    { src: "/bg2.jpg", alt: "Produto 2", title: "Ofertas Especiais" },
    { src: "/bg4.jpg", alt: "Produto 3", title: "Lançamentos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <Carousel className="w-full h-[500px] md:h-[600px]">
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx}>
                <Card className="border-0 rounded-none">
                  <CardContent className="relative h-[500px] md:h-[790px] w-full p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover opacity-80"
                      priority={idx === 0}
                      sizes="100vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                          {image.title}
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                          Descubra nossa coleção exclusiva com os melhores
                          produtos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      <FeaturedProductsSwiper products={featuredProducts} />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold font-century uppercase text-gray-900 mb-1">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-century">
            Explore nossa seleção cuidadosamente curada dos melhores produtos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {transformedProducts.length ? (
            transformedProducts
              .filter((product) => !product.isFeatured) // 🔥 remove os destaques
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Nenhum produto encontrado.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
