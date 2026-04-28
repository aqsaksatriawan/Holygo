"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

const BookmarkPage = () => {
    const router = useRouter();

    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        const id = Number(localStorage.getItem("userId"));
        setUserId(id);
    }, []);

    useEffect(() => {
        if (userId !== 0) {
            fetchBookmarks();
        } else {
            setLoading(false);
        }
    }, [userId]);

    const fetchBookmarks = async () => {
        try {
            const res = await fetch(`/api/bookmark/${userId}`);
            const data = await res.json();

            console.log("BOOKMARK DATA:", data);

            if (Array.isArray(data)) {
                setBookmarks(data);
            } else {
                setBookmarks([]);
            }
        } catch (error) {
            console.log(error);
            setBookmarks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
            <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] overflow-y-auto shadow-xl">

                <header className="p-5 flex items-center gap-3 border-b sticky top-0 bg-white z-50">
                    <button onClick={() => router.push("/home")}>
                        <ChevronLeft className="w-6 h-6 text-black" />
                    </button>
                    <h1 className="text-xl font-bold text-[#51309E]">My Bookmark</h1>
                </header>

                <div className="p-5">
                    {loading ? (
                        <p className="text-center text-gray-400 mt-10">Loading...</p>
                    ) : bookmarks.length === 0 ? (
                        <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm text-center mt-10">
                            <div className="w-24 h-24 bg-[#51309E] rounded-[28px] mx-auto mb-5 flex flex-col items-center justify-center">
                                <div className="w-14 h-3 bg-[#A6CE39] rounded mb-2"></div>
                                <div className="w-14 h-10 bg-[#A6CE39] rounded"></div>
                            </div>

                            <h2 className="text-3xl font-bold mb-3">
                                <span className="text-[#51309E]">holy</span>
                                <span className="text-[#A6CE39]">Go</span>
                            </h2>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                Belum ada doa tersimpan.
                            </p>
                            <p className="text-gray-400">
                                Tambahkan doa favoritmu untuk mulai koleksi doa pribadi.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {bookmarks.map((item, index) => {
                                const doaData = item.masterPrayer || item.prayer;
                                const source = item.masterPrayer ? "master" : "user";

                                return (
                                    <div
                                        key={index}
                                        onClick={() => router.push(`/prayer/${doaData.id}?source=${source}`)}
                                        className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm cursor-pointer active:scale-[0.98] transition"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="font-bold text-lg leading-snug pr-3">
                                                {doaData?.judul}
                                            </h2>

                                            <Bookmark className="w-5 h-5 text-[#51309E] fill-[#51309E] flex-shrink-0" />
                                        </div>

                                        <p className="text-right text-2xl leading-loose mb-5 font-serif break-words">
                                            {doaData?.doa}
                                        </p>

                                        <p className="italic text-gray-400 mb-4 leading-relaxed break-words">
                                            {doaData?.latin}
                                        </p>

                                        <p className="text-[#3D4759] leading-relaxed break-words">
                                            {doaData?.terjemahan}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookmarkPage;