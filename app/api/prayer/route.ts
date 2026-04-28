import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { judul, doa, latin, terjemahan, userId } = await req.json();

    const prayer = await prisma.prayer.create({
      data: {
        judul,
        doa,
        latin,
        terjemahan,
        userId,
      },
    });

    await prisma.bookmark.create({
      data: {
        userId,
        prayerId: prayer.id,
      },
    });

    return NextResponse.json(
      { message: "Doa berhasil disimpan", prayer },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Gagal simpan doa", error: error.message },
      { status: 500 }
    );
  }
}