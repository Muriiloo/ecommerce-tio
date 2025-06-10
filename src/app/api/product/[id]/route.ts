import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    await db.orderItem.deleteMany({
      where: { productId: id },
    });

    await db.productImage.deleteMany({
      where: { productId: id },
    });

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/product/[id]]", err);
    return NextResponse.json(
      { success: false || "Erro ao excluir." },
      { status: 500 }
    );
  }
}
