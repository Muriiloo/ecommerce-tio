import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, price, stockQuantity, imageUrl } =
    await req.json();

  try {
    const product = await db.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stockQuantity: Number(stockQuantity),
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { success: false, error: "Falha ao criar produto" },
      { status: 500 }
    );
  }
}
