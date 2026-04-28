import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const { userId, oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    if (user.password !== oldPassword) {
      return NextResponse.json(
        { message: "Password lama salah!" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: "Password berhasil diubah" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Gagal ubah password", error: error.message },
      { status: 500 }
    );
  }
}