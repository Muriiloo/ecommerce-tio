"use client";

import { useState } from "react";

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
        setFretes(data.results || []);
      }
    } catch {
      setErro("Erro de conexão ao calcular o frete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm max-w-md bg-white">
      <h2 className="text-lg font-semibold mb-2">Calcular Frete</h2>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-md text-sm"
        />
        <button
          onClick={calcularFrete}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </div>

      {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

      {fretes.length > 0 && (
        <ul className="space-y-3">
          {fretes.map((frete, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md border"
            >
              <div>
                <p className="font-medium">{frete.empresa} - {frete.nome}</p>
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
