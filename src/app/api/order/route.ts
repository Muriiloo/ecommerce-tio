import { CartItem } from "@/context/cartContext";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { items, userId, paymentMethod, totalAmount } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio." }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Método de pagamento não selecionado." },
        { status: 400 }
      );
    }

    const order = await db.order.create({
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

    await db.orderItem.createMany({
      data: orderItems,
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    return NextResponse.json(
      { error: "Erro ao criar pedido." },
      { status: 500 }
    );
  }
}
