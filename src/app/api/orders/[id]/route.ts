import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  try {
    await db.order.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Erro ao excluir pedido", { status: 500 });
  }
}
