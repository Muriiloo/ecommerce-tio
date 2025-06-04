import { transformProducts } from "@/lib/transformedProducts";
import ProductCard from "@/components/productCard";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/prisma";

import Image from "next/image";

const Home = async () => {
  const images = [
    {
      src: "/teste.jpg",
      alt: "Produto em destaque 1",
      title: "Novidades da Temporada",
    },
    {
      src: "/bg2.jpg",
      alt: "Produto em destaque 2",
      title: "Ofertas Especiais",
    },
    {
      src: "/bg4.jpg",
      alt: "Produto em destaque 3",
      title: "Lançamentos",
    },
  ];

  const products = await db.product.findMany({});
  const transformedProducts = transformProducts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative">
        <Carousel className="w-full h-[500px] md:h-[600px]">
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx}>
                <Card className="border-0 rounded-none">
                  <CardContent className="relative h-[500px] md:h-[600px] w-full p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover opacity-80"
                      priority={idx === 0}
                      sizes="100vw"
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

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção cuidadosamente curada dos melhores produtos
          </p>
        </div>

        <div>
          <ProductCard product={transformedProducts} />
        </div>
      </section>
    </div>
  );
};

export default Home;
