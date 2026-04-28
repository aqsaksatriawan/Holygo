import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, masterPrayerId, prayerId } = await req.json();

    const existing = await prisma.bookmark.findFirst({
      where: {
        userId,
        ...(masterPrayerId ? { masterPrayerId } : {}),
        ...(prayerId ? { prayerId } : {}),
      },
    });

    // toggle hapus bookmark
    if (existing) {
      await prisma.bookmark.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({ message: "Bookmark removed" });
    }

    // toggle simpan bookmark
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        masterPrayerId: masterPrayerId || null,
        prayerId: prayerId || null,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Gagal bookmark", error: error.message },
      { status: 500 }
    );
  }
}