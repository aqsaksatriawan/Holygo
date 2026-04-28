import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return NextResponse.json(
      { message: "Register success", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Register failed", error },
      { status: 500 }
    );
  }
}