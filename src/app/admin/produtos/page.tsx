"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CadastrarProduto() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !price || !stockQuantity || !imageFile) {
      setErrorMsg("Preencha todos os campos obrigatórios.");
      return;
    }

    // 1) Monta o FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("image", imageFile);

    try {
      // 2) Envia para /api/product
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData, // NUNCA defina headers ao enviar FormData
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg("Produto cadastrado com sucesso!");
        setTimeout(() => {
          setSuccessMsg("");
          router.refresh();
        }, 1500);
        // limpa campos
        setName("");
        setDescription("");
        setPrice("");
        setStockQuantity("");
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setErrorMsg(result.error || "Erro ao cadastrar produto.");
      }
    } catch (err) {
      console.error("Front fetch error:", err);
      setErrorMsg("Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Cadastrar Produto
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="name"
          >
            Nome*
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="description"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="price"
          >
            Preço* (Ex: 39.90)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="stockQuantity"
          >
            Quantidade em Estoque*
          </label>
          <input
            id="stockQuantity"
            type="number"
            min="0"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="image"
          >
            Imagem do produto*
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
            ref={fileInputRef}
            className="mt-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Cadastrar produto
        </button>

        {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
        {successMsg && (
          <div className="text-green-600 text-sm">{successMsg}</div>
        )}
      </form>
    </div>
  );
}
