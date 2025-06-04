"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef } from "react";

const Produtos = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !price || !stockQuantity || !imageFile) {
      setErrorMsg("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    //Upload da imagem para o Supabase Storage
    let imageUrl = "";
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(filePath, imageFile);

      if (!uploadError) {
        setErrorMsg("Erro ao fazer upload da imagem.");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("produtos")
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    } catch (error) {
      setErrorMsg("Erro ao fazer upload da imagem." + error);
      return;
    }

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          stockQuantity: Number(stockQuantity),
          imageUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMsg("Produto cadastrado com sucesso!");
        setTimeout(() => {
          setSuccessMsg("");
          router.refresh();
        }, 1500);
        setName("");
        setDescription("");
        setPrice("");
        setStockQuantity("");
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setErrorMsg(result.error || "Erro ao cadastrar produto.");
      }
    } catch (error) {
      setErrorMsg(`Erro ao cadastrar produto. ${error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Cadastrar Produto
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Nome*</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            required
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
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Imagem do produto*</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 text-white">
          Cadastrar produto
        </Button>
        {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
        {successMsg && (
          <div className="text-green-600 text-sm">{successMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Produtos;
