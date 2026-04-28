"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Prayer {
    id: number;
    judul: string;
    doa: string;
    latin: string;
    terjemahan: string;
    category: string;
    bookmarked?: boolean;
}

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const [prayers, setPrayers] = useState<Prayer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/master-prayer/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setPrayers(data);
                setLoading(false);
            });
    }, [slug]);

    const handleBookmark = async (id: number) => {
        const userId = Number(localStorage.getItem("userId"));

        await fetch("/api/save-bookmark", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                masterPrayerId: id,
            }),
        });

        setPrayers((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
            )
        );
    };

    const getTitle = () => {
        if (slug === "sehari-hari") return "Doa Sehari-hari";
        if (slug === "haji") return "Doa Haji";
        if (slug === "umroh") return "Doa Umroh";
        return "Daftar Doa";
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
            <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] overflow-y-auto shadow-xl">

                <header className="p-5 flex items-center gap-3 border-b sticky top-0 bg-white z-50">
                    <button onClick={() => router.push("/home")}>
                        <ChevronLeft className="w-6 h-6 text-[#51309E]" />
                    </button>
                    <h1 className="font-bold text-xl text-[#51309E]">{getTitle()}</h1>
                </header>

                <div className="p-5 space-y-5">
                    {loading ? (
                        <p className="text-center text-gray-400">Loading...</p>
                    ) : (
                        prayers.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-[28px] p-5 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="font-bold text-lg">{item.judul}</h2>
                                    <button onClick={() => handleBookmark(item.id)}>
                                        {item.bookmarked ? (
                                            <BookmarkCheck className="w-5 h-5 text-[#51309E]" />
                                        ) : (
                                            <Bookmark className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-right text-2xl leading-loose mb-4 font-serif">
                                    {item.doa}
                                </p>

                                <p className="italic text-gray-400 mb-3">{item.latin}</p>

                                <p className="text-sm text-gray-700">{item.terjemahan}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}