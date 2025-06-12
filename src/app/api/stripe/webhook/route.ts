// para funcionar precisa executar no cmd stripe listen --forward-to localhost:3000/api/stripe/webhook
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  console.log("esta chamando o webhook");

  const buf = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature")!;
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await db.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
