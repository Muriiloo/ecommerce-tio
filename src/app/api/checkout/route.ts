import { db } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { orderId } = await req.json();

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order)
    return NextResponse.json(
      { error: "Pedido não encontrado! " },
      { status: 404 }
    );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: { name: `Pedido ${order.id}` },
          unit_amount: Math.round(order.totalAmount.toNumber() * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ url: session.url });
};
