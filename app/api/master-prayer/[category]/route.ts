import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;

    const prayers = await prisma.masterPrayer.findMany({
      where: {
        category,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(prayers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal ambil category prayer" },
      { status: 500 }
    );
  }
}