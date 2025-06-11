import { transformProducts } from "@/lib/transformedProducts";
import ProductCard from "@/components/productCard";
import { db } from "@/lib/prisma";
import {
  Sparkles,
  Filter,
  Grid3X3,
  List,
  Search,
  Tag,
  Shirt,
  Heart,
} from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    category?: string;
  };
};

const ProdutosPage = async ({ searchParams }: Props) => {
  const activeCategory = searchParams.category?.toLowerCase() as
    | "feminino"
    | "masculino"
    | "infantil"
    | "acessório"
    | undefined;

  const products = await db.product.findMany({
    where: activeCategory ? { category: activeCategory } : {},
  });

  const transformedProducts = transformProducts(products);

  const categories = [
    {
      name: "Feminino",
      key: "feminino",
      count: 120,
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Masculino",
      key: "masculino",
      count: 80,
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Infantil",
      key: "infantil",
      count: 45,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Acessórios",
      key: "acessório",
      count: 35,
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-rose-400/15 to-pink-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 via-amber-700 to-orange-900 rounded-3xl mb-8 shadow-2xl">
              <Shirt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 bg-clip-text text-transparent mb-6">
              Nossa Coleção
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Descubra peças únicas e tendências da moda que combinam com seu
              estilo pessoal
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg border border-white/20">
                <Tag className="w-4 h-4 mr-2" />
                Novidades Semanais
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg border border-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Qualidade Garantida
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-lg border border-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Melhores Preços
              </span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="flex gap-3">
                <button className="inline-flex items-center px-6 py-4 bg-gradient-to-r from-yellow-500 via-amber-700 to-orange-900 hover:to-orange-800 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </button>
                <button className="inline-flex items-center px-4 py-4 bg-white/80 hover:bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg">
                  <Grid3X3 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="inline-flex items-center px-4 py-4 bg-white/80 hover:bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg">
                  <List className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Filtro de categorias */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
            <Link href="/produtos" scroll={false}>
              <div
                className={`group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border ${
                  !activeCategory
                    ? "border-purple-500 ring-2 ring-purple-400"
                    : "border-white/20"
                } hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3
                  className={`font-bold text-lg mb-1 ${
                    !activeCategory ? "text-purple-700" : "text-gray-900"
                  }`}
                >
                  Todos
                </h3>
                <p className="text-gray-600 text-sm">Exibir tudo</p>
              </div>
            </Link>
            {categories.map((category, index) => {
              const isActive = activeCategory === category.key;

              return (
                <Link
                  key={index}
                  href={`?category=${category.key}`}
                  scroll={false}
                >
                  <div
                    className={`group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border ${
                      isActive
                        ? "border-purple-500 ring-2 ring-purple-400"
                        : "border-white/20"
                    } hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Shirt className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3
                      className={`font-bold text-lg mb-1 ${
                        isActive ? "text-purple-700" : "text-gray-900"
                      }`}
                    >
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.count} produtos
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Lista de Produtos */}
        <section className="container mx-auto px-6 pb-20">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  Produtos em Destaque
                </h2>
                <p className="text-gray-600">
                  {transformedProducts.length} produtos encontrados
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select className="px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700">
                  <option>Mais Recentes</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                  <option>Mais Vendidos</option>
                </select>
              </div>
            </div>

            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              {transformedProducts.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                  Nenhum produto encontrado.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {transformedProducts.map((produto) => (
                    <ProductCard key={produto.id} product={produto} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-rose-600/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-white/20">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Fique por Dentro das Novidades
              </h3>
              <p className="text-white/90 text-lg mb-8">
                Receba em primeira mão os lançamentos e promoções exclusivas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-105">
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProdutosPage;
