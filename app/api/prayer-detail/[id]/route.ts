import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source");

    let prayer = null;

    if (source === "master") {
      prayer = await prisma.masterPrayer.findUnique({
        where: {
          id: Number(id),
        },
      });
    } else {
      prayer = await prisma.prayer.findUnique({
        where: {
          id: Number(id),
        },
      });
    }

    return NextResponse.json(prayer, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Gagal mengambil detail doa", error: error.message },
      { status: 500 }
    );
  }
}