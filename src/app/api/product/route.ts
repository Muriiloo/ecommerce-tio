import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();

    // Campos do formulário
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString() || "";
    const details = formData.get("details")?.toString() || "";
    const price = Number(formData.get("price") || 0);
    const stockQuantity = Number(formData.get("stockQuantity") || 0);
    const category = formData.get("category")?.toString() as
      | "masculino"
      | "feminino"
      | "infantil"
      | "acessório";

    // Verificações básicas
    const files = formData.getAll("images") as File[];
    if (!name || !price || !stockQuantity || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Campos obrigatórios ou imagens ausentes." },
        { status: 400 }
      );
    }

    // Diretório de uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Salva as imagens no disco e gera URLs
    const imageUrls: string[] = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const safeFileName = `${Date.now()}_${path.basename(file.name)}`;
      const filePath = path.join(uploadsDir, safeFileName);
      await fs.writeFile(filePath, buffer);
      imageUrls.push(`/uploads/${safeFileName}`);
    }

    // A primeira imagem será a imagem principal
    const imageUrl = imageUrls[0];

    // Criação do produto no banco de dados
    const createdProduct = await db.product.create({
      data: {
        name,
        description,
        price,
        stockQuantity,
        category,
        details,
        imageUrl,
        images: {
          create: imageUrls.map((url) => ({
            imageUrl: url,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(
      { success: true, product: createdProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/product] Erro:", err);
    return NextResponse.json(
      { success: false, error: "Erro ao processar o produto." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const products = await db.product.findMany({
      include: { images: true },
    });
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos", err },
      { status: 500 }
    );
  }
};
