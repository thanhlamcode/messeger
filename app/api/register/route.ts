import prisma from "@/app/libs/prismadb";
// prisma: Thể hiện của Prisma Client, dùng để tương tác với cơ sở dữ liệu.

import bcrypt from "bcrypt";

import { NextResponse } from "next/server";
// NextResponse: Cung cấp cách trả về phản hồi HTTP trong API routes của Next.js.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
  }
}
