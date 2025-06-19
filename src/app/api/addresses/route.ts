import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "UserId é obrigatório" },
        { status: 400 }
      );
    }

    const addresses = await db.address.findMany({
      where: { userId },
      orderBy: { isDefault: "desc" },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    return NextResponse.json(
      { message: "Erro ao buscar endereços" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      name,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      isDefault,
    } = await request.json();

    if (
      !userId ||
      !street ||
      !number ||
      !neighborhood ||
      !city ||
      !state ||
      !zipCode
    ) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    if (isDefault) {
      await db.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    const address = await db.address.create({
      data: {
        userId,
        name: name || "Endereço",
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    return NextResponse.json(
      { message: "Erro ao criar endereço" },
      { status: 500 }
    );
  }
}
