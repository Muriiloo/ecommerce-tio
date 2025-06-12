import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";
import CheckoutSuccess from "./_component/checkoutPage";

interface Props {
  searchParams: { session_id?: string };
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  const sessionId = session_id;
  if (!sessionId) {
    return redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const orderId = session.metadata?.orderId as string | undefined;
  if (!orderId) {
    return redirect("/");
  }

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order || order.status !== "paid") {
    return redirect("/");
  }

  return <CheckoutSuccess />;
}
