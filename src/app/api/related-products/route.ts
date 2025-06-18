import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { transformProducts } from "@/lib/transformedProducts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json([], { status: 400 });
  }

  const related = await db.product.findMany({
    where: {
      NOT: { id },
    },
    take: 4,
  });

  const transformed = transformProducts(related);

  return NextResponse.json(transformed);
}
