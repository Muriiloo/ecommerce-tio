import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WhatsappButton from "@/components/whatsappButton";
import { db } from "@/lib/prisma";
import { ShoppingCart } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <WhatsappButton />
      <Header />

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
                    {/* Overlay com gradiente para melhor legibilidade */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-64 bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Produto</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <ShoppingCart />
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      R$ {item.price.toFixed(2)}
                    </span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para fazer seu pedido?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco pelo WhatsApp e tire todas suas dúvidas
          </p>
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Falar no WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
