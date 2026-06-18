import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (searchParams.get("all") === "true") {
      const allPrayers = await prisma.masterPrayer.findMany({
        orderBy: { id: "asc" }
      });
      return NextResponse.json(allPrayers);
    }

    if (!query.trim()) {
      // If query is empty, return a default set of popular prayers for the default search display.
      // E.g., Doa untuk Kedua Orang Tua, Doa Masuk Rumah, Doa Masuk Masjid, Doa Sebelum Tidur
      const popularPrayers = await prisma.masterPrayer.findMany({
        where: {
          judul: {
            in: [
              "Doa untuk Kedua Orang Tua",
              "Doa Masuk Rumah",
              "Doa Masuk Masjid",
              "Doa Sebelum Tidur"
            ]
          }
        },
        orderBy: {
          id: "asc"
        }
      });

      // If we don't find all/any (e.g. database seeds differ slightly), just return the first 4 prayers
      if (popularPrayers.length === 0) {
        const fallback = await prisma.masterPrayer.findMany({
          take: 4,
          orderBy: {
            id: "asc"
          }
        });
        return NextResponse.json(fallback);
      }

      return NextResponse.json(popularPrayers);
    }

    const prayers = await prisma.masterPrayer.findMany({
      where: {
        OR: [
          { judul: { contains: query, mode: "insensitive" } },
          { latin: { contains: query, mode: "insensitive" } },
          { terjemahan: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(prayers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mencari doa" },
      { status: 500 }
    );
  }
}
