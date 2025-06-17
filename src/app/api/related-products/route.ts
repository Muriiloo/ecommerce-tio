import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

  return NextResponse.json(related);
}
