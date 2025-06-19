import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const order = await db.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return new NextResponse("Pedido não encontrado", { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    return new NextResponse("Erro ao buscar pedido", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    await db.order.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
