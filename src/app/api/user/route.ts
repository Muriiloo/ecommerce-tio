import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: session.user });
}
