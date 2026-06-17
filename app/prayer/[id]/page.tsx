"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const PrayerDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const source = searchParams.get("source");

  const [doaData, setDoaData] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [fontSize, setFontSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFontControl, setShowFontControl] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();

    const handleVoicesChanged = () => {
      loadVoices();
    };

    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  const getArabicVoice = () => {
    if (typeof window === "undefined") return null;

    const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    if (!availableVoices || availableVoices.length === 0) return null;

    const bestVoice = availableVoices.find(
      (voice) => voice.lang.toLowerCase().startsWith("ar") || voice.name.toLowerCase().includes("arabic")
    );

    return bestVoice || availableVoices[0];
  };

  const handleSpeakDoa = () => {
    if (typeof window === "undefined" || !doaData?.doa) return;

    const text = doaData.doa.trim();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getArabicVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeak = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    fetchPrayerDetail();
  }, []);

  const fetchPrayerDetail = async () => {
    try {
      const savedFont = localStorage.getItem("holygo_font_size");
      if (savedFont) {
        setFontSize(Number(savedFont));
      }

      const res = await fetch(`/api/prayer-detail/${id}?source=${source}`);
      const data = await res.json();
      setDoaData(data);

      const userId = Number(localStorage.getItem("userId"));
      const bookmarkRes = await fetch(`/api/bookmark/${userId}`);
      const bookmarkData = await bookmarkRes.json();

      const found = bookmarkData.find((item: any) => {
        if (source === "master") {
          return item.masterPrayerId === id;
        } else {
          return item.prayerId === id;
        }
      });

      setIsBookmarked(!!found);
      // fetch surrounding list for prev/next navigation
      if (source === "master") {
        if (data?.category) {
          const listRes = await fetch(`/api/master-prayer/${data.category}`);
          const listData = await listRes.json();
          setList(listData || []);
        }
      } else {
        const userId = Number(localStorage.getItem("userId"));
        if (userId) {
          const listRes = await fetch(`/api/prayer?userId=${userId}`);
          const listData = await listRes.json();
          setList(listData || []);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = list.findIndex((item) => item.id === id);

  const goToPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      const prevId = list[currentIndex - 1].id;
      router.push(`/prayer/${prevId}?source=${source}`);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex >= 0 && currentIndex < list.length - 1) {
      const nextId = list[currentIndex + 1].id;
      router.push(`/prayer/${nextId}?source=${source}`);
    }
  };

  const goBackToList = () => {
    if (source === "master") {
      const category = doaData?.category;
      if (category) {
        router.push(`/category/${category}`);
        return;
      }
    }

    if (source === "user") {
      router.push(`/bookmark`);
      return;
    }

    router.push("/home");
  };

  const handleFontChange = (value: number) => {
    setFontSize(value);
    localStorage.setItem("holygo_font_size", value.toString());
  };

  const handleToggleBookmark = async () => {
    try {
      const userId = Number(localStorage.getItem("userId"));

      await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          masterPrayerId: source === "master" ? id : null,
          prayerId: source !== "master" ? id : null,
        }),
      });

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!doaData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Doa tidak ditemukan
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] shadow-xl relative overflow-hidden">

        <header className="p-5 flex items-center justify-between border-b sticky top-0 bg-white z-50">
          <button onClick={goBackToList}>
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              className={`p-1 rounded-md ${currentIndex <= 0 ? "opacity-40 pointer-events-none" : ""}`}
            >
              <ChevronLeft className="w-5 h-5 text-[#51309E]" />
            </button>

            <h1 className="font-bold text-lg">Prayer Detail</h1>

            <button
              onClick={goToNext}
              className={`p-1 rounded-md ${currentIndex === -1 || currentIndex >= list.length - 1 ? "opacity-40 pointer-events-none" : ""}`}
            >
              <ChevronRight className="w-5 h-5 text-[#51309E]" />
            </button>
          </div>

          <button
            onClick={handleToggleBookmark}
            className="relative z-50 active:scale-90 transition"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-[#51309E] fill-[#51309E]" />
            ) : (
              <Bookmark className="w-5 h-5 text-[#51309E]" />
            )}
          </button>
        </header>

        <div className="h-[calc(812px-76px)] overflow-y-auto no-scrollbar">
          <div className="p-6 space-y-8 pb-28">

            <h2 className="text-center text-2xl font-bold bg-gray-100 inline-block px-4 py-1 rounded-xl mx-auto w-fit">
              {doaData?.judul}
            </h2>

            <p
              style={{ fontSize: `${fontSize + 10}px` }}
              className="text-right leading-loose font-serif break-words"
            >
              {doaData.doa}
            </p>

            <div className="flex flex-col items-center gap-3 justify-center">
              <button
                type="button"
                onClick={handleSpeakDoa}
                className="mt-4 rounded-3xl bg-[#51309E] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d257f] active:scale-[0.98]"
              >
                {isSpeaking ? "Stop" : "Baca Doa"}
              </button>
              {isSpeaking && (
                <button
                  type="button"
                  onClick={handleStopSpeak}
                  className="rounded-3xl bg-gray-200 px-5 py-2 text-sm font-semibold text-[#3D4759] shadow-sm transition hover:bg-gray-300 active:scale-[0.98]"
                >
                  Berhenti
                </button>
              )}
            </div>

            <div className="bg-gray-50 rounded-3xl p-5">
              <p
                style={{ fontSize: `${fontSize}px` }}
                className="italic text-gray-500 leading-relaxed break-words"
              >
                {doaData.latin}
              </p>
            </div>

            <div>
              <p className="font-bold mb-3 text-gray-500">Artinya:</p>
              <p
                style={{ fontSize: `${fontSize}px` }}
                className="text-[#3D4759] leading-relaxed break-words"
              >
                {doaData.terjemahan}
              </p>
            </div>
          </div>
          {/* FLOATING FONT BUTTON */}
          <div className="absolute bottom-8 right-6 z-50">

            {showFontControl && (
              <div className="absolute bottom-16 right-0 bg-white border shadow-xl rounded-2xl px-4 py-3 flex items-center gap-4 animate-fadeIn">
                <button
                  onClick={() => handleFontChange(Math.max(fontSize - 1, 16))}
                  className="text-lg font-bold text-[#51309E] active:scale-90"
                >
                  A-
                </button>

                <span className="text-sm font-bold w-[42px] text-center">
                  {fontSize}px
                </span>

                <button
                  onClick={() => handleFontChange(Math.min(fontSize + 1, 32))}
                  className="text-lg font-bold text-[#51309E] active:scale-90"
                >
                  A+
                </button>
              </div>
            )}

            <button
              onClick={() => setShowFontControl(!showFontControl)}
              className="w-14 h-14 rounded-full bg-[#51309E] text-white shadow-2xl flex items-center justify-center text-lg font-bold active:scale-95 transition"
            >
              Aa
            </button>
          </div>
        </div>

      </div>
    </div>

  );
};

export default PrayerDetailPage;