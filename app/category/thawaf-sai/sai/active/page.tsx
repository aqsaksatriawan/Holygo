"use client";

import React, { useEffect, useState, Suspense } from "react";
import { ChevronLeft, RotateCcw, Plus, Menu, Play, Trash2, Volume2, Search, X, ClipboardPlus, Sparkles, MoreVertical, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ActiveSaiContent() {
  
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const roundParam = searchParams.get("round");
  const round = roundParam ? parseInt(roundParam, 10) : 1;
  const TOTAL_ROUNDS = 7;

  const STORAGE_KEY = "holygo_sai_doa";

const [doas, setDoas] = useState<any[]>([]);
const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
const [deleteModal, setDeleteModal] = useState<{ show: boolean; doaId: number | null; doaTitle: string }>({
  show: false,
  doaId: null,
  doaTitle: "",
});
const [showModal, setShowModal] = useState(false);
const [allPrayers, setAllPrayers] = useState<any[]>([]);
const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  fetch("/api/master-prayer?all=true")
    .then((res) => res.json())
    .then((data) => setAllPrayers(data))
    .catch((e) => console.error(e));
}, []);

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);

    setDoas(parsed[round] || []);
  }
}, [round]);

  const handleLanjutkan = () => {
  const PROGRESS_KEY = "holygo_sai_progress";

  const saved =
    JSON.parse(
      localStorage.getItem(PROGRESS_KEY) ||
      JSON.stringify(Array(7).fill(false))
    );

  saved[round - 1] = true;

  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify(saved)
  );

  if (round < 7) {
    router.push(
      `/category/thawaf-sai/sai/active?round=${round + 1}`
    );
  } else {
    router.push(
      "/category/thawaf-sai/sai/finish"
    );
  }
};

const handleResetDoa = () => {
  const confirmReset = window.confirm(
    `Hapus semua doa pada lintasan ${round}?`
  );

  if (!confirmReset) return;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  const parsed = JSON.parse(saved);

  // hanya reset putaran aktif
  parsed[round] = [];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(parsed)
  );

  setDoas([]);

  router.push(
    `/category/thawaf-sai/sai?round=${round}`
  );
};

  const openDeleteModal = (doaId: number, doaTitle: string) => {
    setDeleteModal({ show: true, doaId, doaTitle });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.doaId === null) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const updated = parsed[round].filter((d: any) => d.id !== deleteModal.doaId);
    parsed[round] = updated;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    setDoas(updated);
    setDeleteModal({ show: false, doaId: null, doaTitle: "" });
  };

  const handlePlayAudio = (text: string, doaId: number) => {
    if (typeof window === "undefined") return;
    if ((window as any).speechSynthesis) {
      if (currentPlayingId !== null) {
        window.speechSynthesis.cancel();
        setCurrentPlayingId(null);
        if (currentPlayingId === doaId) return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.9;
      utterance.onend = () => setCurrentPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setCurrentPlayingId(doaId);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] shadow-xl relative flex flex-col">
        {/* ===== HEADER ===== */}
        <header className="px-5 pt-6 pb-2 shrink-0 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 border border-[#F3F4F6] rounded-2xl flex items-center justify-center bg-white shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2.5} />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
              const isActive = i + 1 === round;
              return (
                <div
                  key={i}
                  className={`rounded-full transition-all ${
                    isActive ? "w-2 h-2 bg-[#059669]" : "w-1.5 h-1.5 bg-[#E5E7EB]"
                  }`}
                />
              );
            })}
          </div>

          <button
  onClick={() => setShowModal(true)}
  className="w-10 h-10 flex items-center justify-center"
>
  <Plus className="w-8 h-8 text-[#1A1A1A]" strokeWidth={2.5} />
</button>
        </header>

        {/* ===== TOP SECTION ===== */}
        <div className="px-5 mt-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[54px] font-bold text-[#059669] leading-none tracking-tighter">
              {round}
            </span>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] leading-tight">Sa'i</h2>
              <p className="text-[13px] text-[#6B7280]">Lintasan {round} dari 7</p>
            </div>
          </div>

        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col">
          {doas.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center -mt-10">
              <div className="relative mb-6">
                <div className="w-[120px] h-[120px] bg-[#ECFDF5] rounded-full flex items-center justify-center">
                  <ClipboardPlus className="w-[60px] h-[60px] text-[#059669] stroke-[1.5]" />
                </div>
                {/* little sparkles/stars */}
                <Sparkles className="absolute top-2 left-0 w-4 h-4 text-green-300" />
                <Sparkles className="absolute top-4 right-0 w-5 h-5 text-green-300" />
                <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-green-300" />
              </div>
              <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-2 text-center">Belum ada doa yang ditambahkan</h3>
              <p className="text-[13px] text-[#6B7280] text-center max-w-[240px] mb-8 leading-relaxed">
                Silahkan tambahkan doa untuk lintasan sa'i ke-{round}.
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="h-[46px] px-6 rounded-[14px] bg-[#059669] text-white text-[14px] font-bold shadow-md shadow-green-200 flex items-center gap-2 transition hover:bg-green-700"
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
                Tambah Doa
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-50 rounded-full text-xs font-semibold text-[#059669]">
                  Dzikir / Doa
                </span>

                <span className="text-sm font-bold text-[#059669]">
                  {doas.length} / {doas.length}
                </span>
              </div>

              <div className="space-y-4">
                {doas.map((doa, index) => (
                  <div key={doa.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                    {/* Top Row: Play, Arabic Text, Options */}
                    <div className="flex items-start justify-between w-full">
                      {/* Play Button */}
                      <button
                        onClick={() => handlePlayAudio(doa.arab, doa.id)}
                        className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition ${
                          currentPlayingId === doa.id ? "bg-[#10B981]" : "bg-[#059669] hover:bg-green-700"
                        }`}
                      >
                        <Play className="w-4 h-4 fill-current text-white" />
                      </button>
                      
                      {/* Arabic Text */}
                      <div className="flex-1 mx-3 flex justify-end">
                        <h3 className="text-[22px] sm:text-[26px] leading-[1.6] font-arabic text-right text-[#1A1A1A]" dir="rtl">{doa.arab}</h3>
                      </div>

                      {/* Options Button */}
                      <button 
                        onClick={() => openDeleteModal(doa.id, doa.judul)} 
                        className="w-8 h-8 shrink-0 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                      >
                        <MoreVertical className="w-5 h-5 text-[#6B7280]" strokeWidth={2} />
                      </button>
                    </div>

                    {/* Bottom Row: Latin & Translation */}
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-[#059669]" strokeWidth={2.5} />
                        <span className="text-[#059669] text-[11px] font-bold">Latin</span>
                      </div>
                      <p className="text-[#059669] font-bold text-[13px]">{doa.latin}</p>
                      <p className="text-[#6B7280] text-[12px] leading-relaxed">{doa.terjemahan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Floating Lanjutkan Button */}
        <div className="absolute bottom-6 right-5 z-40">
          <button 
            onClick={handleLanjutkan}
            className="h-[44px] px-5 rounded-xl bg-[#059669] text-white text-[14px] font-bold shadow-lg shadow-green-300 flex items-center gap-2 transition hover:bg-green-700"
          >
            LANJUTKAN
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-[40px]">
            <div className="bg-white rounded-[24px] p-6 w-[280px] shadow-2xl">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-500" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-center text-[18px] font-bold text-[#1A1A1A] mb-2">Hapus Doa</h3>
              <p className="text-center text-[13px] text-[#6B7280] mb-6 leading-relaxed">Apakah kamu yakin ingin menghapus "{deleteModal.doaTitle}"?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal({ show: false, doaId: null, doaTitle: "" })} className="flex-1 h-[44px] rounded-[12px] border border-[#E5E7EB] bg-white text-[#1A1A1A] text-[14px] font-bold hover:bg-gray-50 transition">Batal</button>
                <button onClick={handleConfirmDelete} className="flex-1 h-[44px] rounded-[12px] bg-red-500 text-white text-[14px] font-bold hover:bg-red-600 transition">Hapus</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Tambah Doa */}
        {showModal && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden rounded-[40px]">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/40 transition-opacity"
              onClick={() => setShowModal(false)}
            />
            
            {/* Sheet Content */}
            <div className="relative bg-white rounded-t-[24px] h-[75%] flex flex-col animate-fadeIn shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2 shrink-0">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
              </div>
              
              <div className="px-5 pb-3 flex items-center justify-between shrink-0">
                <h2 className="flex items-center gap-2 font-bold text-[16px] text-[#059669]">
                  <Plus className="w-5 h-5" strokeWidth={2.5} />
                  Tambah Doa
                </h2>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Search */}
              <div className="px-5 pb-4 shrink-0">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari doa atau kategori..."
                    className="w-full h-11 bg-white border border-[#E5E7EB] rounded-2xl pl-11 pr-4 text-[13px] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] transition-all text-[#1A1A1A] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-0 divide-y divide-gray-100">
                {allPrayers
                  .filter((p) => 
                    p.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (p.doa && p.doa.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (p.latin && p.latin.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((prayer) => {
                    const isSelected = doas.some((d) => d.id === prayer.id);
                    
                    return (
                      <div 
                        key={prayer.id}
                        onClick={() => {
                          let updatedList;
                          if (isSelected) {
                            updatedList = doas.filter(d => d.id !== prayer.id);
                          } else {
                            updatedList = [
                              ...doas,
                              {
                                id: prayer.id,
                                judul: prayer.judul,
                                arab: prayer.doa,
                                latin: prayer.latin,
                                terjemahan: prayer.terjemahan,
                              }
                            ];
                          }
                          setDoas(updatedList);
                          
                          const saved = localStorage.getItem(STORAGE_KEY);
                          const parsed = saved ? JSON.parse(saved) : {};
                          parsed[round] = updatedList;
                          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
                        }}
                        className="py-3.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition px-2 -mx-2 rounded-xl"
                      >
                        {/* Radio button style selector */}
                        <div className="shrink-0 pt-0.5">
                          <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-[#059669]' : 'border-gray-300'}`}>
                            {isSelected && <div className="w-3 h-3 rounded-full bg-[#059669]" />}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-bold text-[#1A1A1A] mb-0.5 truncate">{prayer.judul}</h3>
                          <p className="text-[11px] text-[#9CA3AF] line-clamp-1 leading-snug">
                            {prayer.latin || prayer.doa}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {allPrayers.length === 0 && (
                  <p className="text-center text-gray-400 text-sm mt-8">Memuat doa...</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ActiveSaiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f4f6]"></div>}>
      <ActiveSaiContent />
    </Suspense>
  );
}