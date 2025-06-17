"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Product = {
  id: string;
  name: string;
  description?: string;
  details?: string;
  price: number;
  stockQuantity: number;
  category: "masculino" | "feminino" | "infantil" | "acessório";
};

export default function CadastrarProduto() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [, setIsLoadingProducts] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function validateUser() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (!data.user?.isAdmin) router.replace("/unauthorized");
      else setIsLoadingUser(false);
    }

    async function fetchProducts() {
      try {
        setIsLoadingProducts(true);
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    validateUser();
    fetchProducts();
  }, [router]);

  if (isLoadingUser)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="text-lg font-medium text-gray-600">Carregando...</span>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !price || !stockQuantity || imageFiles.length === 0) {
      setErrorMsg("Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("category", category);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg("Produto cadastrado com sucesso!");
        setProducts((prev) => [...prev, result.product]);
        setName("");
        setDescription("");
        setDetails("");
        setPrice("");
        setStockQuantity("");
        setCategory("");
        setImageFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => setSuccessMsg(""), 1500);
      } else {
        setErrorMsg(result.error || "Erro ao cadastrar produto.");
      }
    } catch {
      setErrorMsg("Erro ao cadastrar produto.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const res = await fetch(`/api/product/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <section className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Cadastrar Produto</h2>
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="col-span-2">
              <Label htmlFor="name">Nome*</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do produto"
                required
                className="mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o produto"
                className="mt-1 h-24"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="details">Detalhes do Produto</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ex: 100% algodão, feito no Brasil, lavagem a seco..."
                className="mt-1 h-24"
              />
            </div>
            <div>
              <Label htmlFor="price">Preço* (Ex: 39.90)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="R$"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="stockQuantity">Quantidade em Estoque*</Label>
              <Input
                id="stockQuantity"
                type="number"
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="0"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria*</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border rounded-md p-2 text-gray-700"
                required
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="infantil">Infantil</option>
                <option value="acessório">Acessório</option>
              </select>
            </div>
            <div>
              <Label>Imagens do produto*</Label>
              <Input
                type="file"
                accept="image/*"
                className="mt-1"
                multiple
                ref={fileInputRef}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    const filesArray = Array.from(files);
                    setImageFiles((prev) => [...prev, ...filesArray]);
                  }
                }}
              />
              {imageFiles.length > 0 && (
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {imageFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-span-2 text-right">
              <Button
                type="submit"
                variant="default"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Cadastrar
              </Button>
            </div>
            {errorMsg && <p className="col-span-2 text-red-500">{errorMsg}</p>}
            {successMsg && (
              <p className="col-span-2 text-green-600">{successMsg}</p>
            )}
          </form>
        </section>
        <section className="p-8">
          <h3 className="text-2xl font-semibold mb-4">Produtos Cadastrados</h3>
          <div className="overflow-x-auto bg-white rounded-b-lg">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow className="bg-gray-100 sticky top-0">
                  <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase text-gray-700">
                    Nome
                  </TableHead>
                  <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase text-gray-700">
                    Descrição
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-sm font-semibold uppercase text-gray-700">
                    Preço
                  </TableHead>
                  <TableHead className="px-4 py-3 text-right text-sm font-semibold uppercase text-gray-700">
                    Estoque
                  </TableHead>
                  <TableHead className="px-4 py-3 text-center text-sm font-semibold uppercase text-gray-700">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-6 text-center text-gray-500"
                    >
                      Nenhum produto cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((item) => (
                    <TableRow
                      key={item.id}
                      className="bg-white hover:bg-gray-50 transition"
                    >
                      <TableCell className="px-4 py-4 text-sm font-medium text-gray-800">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-sm text-gray-600 truncate">
                        {item.description || "-"}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-sm text-gray-800 text-right">
                        R$ {Number(item.price).toFixed(2)}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-sm text-gray-800 text-right">
                        {item.stockQuantity}
                      </TableCell>
                      <TableCell className="px-4 py-4 text-sm text-gray-800 text-center">
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="destructive"
                          size="sm"
                          className="px-3 py-1"
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
