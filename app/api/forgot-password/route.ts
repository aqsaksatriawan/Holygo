import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: "Password berhasil direset" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Gagal reset password", error: error.message },
      { status: 500 }
    );
  }
}