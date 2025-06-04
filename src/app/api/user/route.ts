import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, email, name } = await req.json();

  let user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        id,
        email,
        name: name || "Usuário",
        isAdmin: false,
      },
    });
  }

  return NextResponse.json({ success: true, user });
}
