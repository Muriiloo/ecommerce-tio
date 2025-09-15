'use client';

import { useState, useEffect } from "react";
import ProductCard from "@/components/productCard";
import { transformProducts } from "@/lib/transformedProducts";
import {
  ChevronDown,
  Filter,
  Grid3X3,
  Search,
} from "lucide-react";

import { Decimal } from "@prisma/client/runtime/library";

type Product = {
  id: string;
  name: string;
  description: string;
  details: string | null;
  price: Decimal;
  stockQuantity: number;
  size: string | null;
  color: string | null;
  imageUrl: string;
  category: "masculino" | "feminino" | "infantil" | "acessorio" | "calcado";
  shoeSize: Decimal | null;
  isFeatured: boolean;
  createdAt: Date;
};

type Props = {
  searchParams: {
    category?: string;
    featured?: string;
  };
};

const ProdutosPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("name");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { key: "all", name: "Todas as Categorias" },
    { key: "masculino", name: "Masculino" },
    { key: "feminino", name: "Feminino" },
    { key: "infantil", name: "Infantil" },
    { key: "acessorio", name: "Acessórios" },
    { key: "calcado", name: "Calçados" },
  ];

  const sortOptions = [
    { key: "name", name: "Nome A-Z" },
    { key: "price_asc", name: "Menor Preço" },
    { key: "price_desc", name: "Maior Preço" },
    { key: "featured", name: "Destaques" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortOrder, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOrder) {
      case "price_asc":
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "featured":
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                {selectedCategory === "all" 
                  ? "Todos os Produtos" 
                  : categories.find(c => c.key === selectedCategory)?.name
                }
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} produtos encontrados
              </p>
            </div>    
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Nenhum produto encontrado</p>
            <p className="text-gray-400">Tente alterar os filtros ou buscar por outros termos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {transformProducts(filteredProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdutosPage;
