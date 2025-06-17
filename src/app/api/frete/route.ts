// app/api/frete/route.ts

import { NextRequest, NextResponse } from "next/server";

type FreteResponseItem = {
  name: string;
  price: string;
  delivery_time: number;
  company: {
    name: string;
    picture: string;
  };
  error?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { cep } = await request.json();

    if (!cep || typeof cep !== "string") {
      return NextResponse.json({ error: "CEP inválido." }, { status: 400 });
    }

    console.log("[REQUISIÇÃO FRETE - MELHOR ENVIO]", cep);

    const token = process.env.MELHOR_ENVIO_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Token da API não configurado." },
        { status: 500 }
      );
    }

    const payload = {
      from: {
        postal_code: "86182-110",
      },
      to: {
        postal_code: cep,
      },
      products: [
        {
          id: "1",
          width: 15,
          height: 10,
          length: 20,
          weight: 1,
          insurance_value: 50,
          quantity: 1,
        },
      ],
    };

    const response = await fetch(
      "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Aplicação (nmsolucoeseinovacoes@gmail.com)", // Substitua por um email real
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      let errorMessage: string;

      try {
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
          const json = await response.json();
          errorMessage = JSON.stringify(json);
        } else {
          errorMessage = await response.text();
        }
      } catch {
        errorMessage = `Erro HTTP ${response.status} sem corpo de resposta.`;
      }

      console.error("[ERRO MELHOR ENVIO]", errorMessage);

      return NextResponse.json(
        { error: "Erro ao consultar frete no Melhor Envio." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as FreteResponseItem[];

    const results = data
      .map((item) => ({
        nome: item.name,
        valor: item.price,
        prazo: item.delivery_time,
        empresa: item.company.name,
        logo: item.company.picture,
        erro: item.error,
      }))
      .filter((item) => !item.erro);

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Nenhum serviço disponível para o CEP informado." },
        { status: 400 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[ERRO FRETE - MELHOR ENVIO]", error);
    return NextResponse.json(
      { error: "Erro ao consultar o frete." },
      { status: 500 }
    );
  }
}
