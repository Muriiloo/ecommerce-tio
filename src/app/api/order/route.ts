import { CartItem } from "@/context/cartContext";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { items, userId, paymentMethod, totalAmount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Carrinho vazio." }, { status: 400 });
    }

    for (const item of items) {
      if (!item.selectedSize || item.selectedSize.trim() === "") {
        return NextResponse.json(
          { message: "Tamanho deve ser selecionado." },
          { status: 400 }
        );
      }
      if (item.selectedColor.trim() === "" || !item.selectedColor) {
        return NextResponse.json(
          { message: "Cor deve ser selecionada." },
          { status: 400 }
        );
      }

      const product = await db.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { message: `Produto não encontrado.` },
          { status: 404 }
        );
      }

      if (product.stockQuantity < item.quantity) {
        return NextResponse.json(
          {
            message: `Estoque insuficiente para ${product.name}. Disponível: ${product.stockQuantity}`,
          },
          { status: 400 }
        );
      }
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { message: "Método de pagamento não selecionado." },
        { status: 400 }
      );
    }

    const result = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          status: "pending",
          totalAmount,
          paymentMethod,
        },
      });

      const orderItems = items.map((item: CartItem) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.price,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });

    return NextResponse.json({ success: true, orderId: result.id });
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    return NextResponse.json(
      { message: "Erro ao criar pedido." },
      { status: 500 }
    );
  }
}
