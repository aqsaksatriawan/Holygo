import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, masterPrayerId } = await req.json();

    const existing = await prisma.bookmark.findFirst({
      where: {
        userId,
        masterPrayerId,
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });

      return NextResponse.json({ message: "Bookmark removed" });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        masterPrayerId,
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Gagal bookmark" }, { status: 500 });
  }
}