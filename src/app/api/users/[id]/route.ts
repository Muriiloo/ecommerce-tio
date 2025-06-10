import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = params;

    await db.user.delete({ where: { id } });

    return NextResponse.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao excluir usuário" }, { status: 500 });
  }
}
