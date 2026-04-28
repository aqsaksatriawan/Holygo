import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        masterPrayer: true,
        prayer: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil bookmark" },
      { status: 500 }
    );
  }
}