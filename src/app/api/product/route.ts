// src/app/api/product/route.ts

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    // 1) Extrai o FormData inteiro
    const formData = await request.formData();

    // 2) Pega os campos de texto
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString() || "";
    const price = Number(formData.get("price") || 0);
    const stockQuantity = Number(formData.get("stockQuantity") || 0);

    // 3) Pega o arquivo enviado (campo <input type="file" name="image" />)
    const imageFile = formData.get("image") as File | null;
    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: "Imagem não enviada." },
        { status: 400 }
      );
    }

    // 4) Converte o File (Web Blob) em Buffer para poder salvar no disco
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5) Gera o diretório "public/uploads" (caso ainda não exista)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // 6) Cria um nome único para o arquivo (timestamp + nome original)
    const safeFileName = `${Date.now()}_${path.basename(imageFile.name)}`;
    const filePath = path.join(uploadsDir, safeFileName);

    // 7) Grava o arquivo no disco
    await fs.writeFile(filePath, buffer);

    // 8) Monta a URL pública que será salva no banco
    const imageUrl = `/uploads/${safeFileName}`;

    const created = await db.product.create({
      data: {
        name: name || "",
        description,
        price,
        stockQuantity,
        imageUrl,
      },
    });

    return NextResponse.json(
      { success: true, product: created },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Route POST /api/product] erro:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao processar formulário." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const products = await db.product.findMany({});
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos", err },
      { status: 500 }
    );
  }
};
