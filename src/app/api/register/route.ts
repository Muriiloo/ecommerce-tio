// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Os campos name, email e password são obrigatórios" },
      { status: 400 }
    );
  }

  const exist = await db.user.findUnique({ where: { email } });
  if (exist) {
    return NextResponse.json({ error: "E-mail já existe" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  await db.user.create({
    data: { name, email, password: hash },
  });

  return NextResponse.json({ message: "Criado com sucesso" }, { status: 201 });
}
