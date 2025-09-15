"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

type Frete = {
  nome: string;
  valor: string;
  prazo: number;
  empresa: string;
  logo: string;
};

export default function ProductFreteCalculator() {
  const [cep, setCep] = useState("");
  const [fretes, setFretes] = useState<Frete[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const calcularFrete = async () => {
    setErro("");
    setFretes([]);
    if (!cep.match(/^\d{5}-?\d{3}$/)) {
      setErro("CEP inválido. Use o formato 00000-000.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/frete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cep }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao calcular o frete.");
      } else {
        // Filtra apenas os fretes da empresa Correios
        const apenasCorreios = (data.results || []).filter((frete: Frete) =>
          frete.empresa.toLowerCase().includes("correios")
        );
        setFretes(apenasCorreios);
      }
    } catch {
      setErro("Erro de conexão ao calcular o frete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mt-12">
      {/* Título com ícone */}
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-7 h-7" />
        <span>Frete e prazo</span>
      </div>

      {/* Campo de CEP + botão */}
      <div className="flex border border-black rounded-xs overflow-hidden">
        <input
          type="text"
          placeholder="Insira seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="flex-1 px-3 py-4 text-sm placeholder-gray-400 outline-none"
        />
        <button
          onClick={calcularFrete}
          disabled={loading}
          className="px-4 text-sm text-gray-500 cursor-pointer disabled:opacity-50 hover:bg-black hover:text-white transition-colors duration-300"
        >
          {loading ? "..." : "calcular"}
        </button>
      </div>

      {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

      {fretes.length > 0 && (
        <ul className="space-y-3 mt-3">
          {fretes.map((frete, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-xs border border-black"
            >
              <div>
                <p className="font-medium">
                  {frete.empresa} - {frete.nome}
                </p>
                <p className="text-sm text-gray-600">
                  Entrega em até {frete.prazo} dias úteis
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">R$ {frete.valor}</p>
                <img
                  src={frete.logo}
                  alt={frete.empresa}
                  className="h-6 mt-1"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
