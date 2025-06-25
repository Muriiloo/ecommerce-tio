import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH – Alternar destaque do produto
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const product = await db.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado." },
        { status: 404 }
      );
    }

    const updated = await db.product.update({
      where: { id },
      data: { isFeatured: !product.isFeatured },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    console.error("[PATCH /api/product/[id]]", err);
    return NextResponse.json(
      { success: false, error: "Erro ao alternar destaque." },
      { status: 500 }
    );
  }
}

// DELETE – Excluir produto e seus dados relacionados
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await db.orderItem.deleteMany({ where: { productId: id } });
    await db.productImage.deleteMany({ where: { productId: id } });
    await db.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/product/[id]]", err);
    return NextResponse.json(
      { success: false, error: "Erro ao excluir." },
      { status: 500 }
    );
  }
}
