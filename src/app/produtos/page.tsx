import { transformProducts } from "@/lib/transformedProducts";
import Footer from "@/components/footer";
import ProductCard from "@/components/productCard";
import { db } from "@/lib/prisma";

const ProdutosPage = async () => {
  const products = await db.product.findMany({});
  const transformedProducts = transformProducts(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produtos Disponíveis
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção cuidadosamente curada dos melhores produtos
          </p>
        </div>

        <div>
          <ProductCard product={transformedProducts} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProdutosPage;
