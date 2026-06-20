"use client";

import React, { useEffect, useState, Suspense } from "react";
import { ChevronLeft, RotateCcw, Plus, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ActiveThawafContent() {
  
  const router = useRouter();
  
  const searchParams = useSearchParams();
  const roundParam = searchParams.get("round");
  const round = roundParam ? parseInt(roundParam, 10) : 1;
  const TOTAL_ROUNDS = 7;

  const STORAGE_KEY = "holygo_thawaf_doa";

const [doas, setDoas] = useState<any[]>([]);

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);

    setDoas(parsed[round] || []);
  }
}, [round]);

  const handleLanjutkan = () => {
  const PROGRESS_KEY = "holygo_thawaf_progress";

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
      `/category/thawaf-sai/thawaf/active?round=${round + 1}`
    );
  } else {
    router.push(
      "/category/thawaf-sai/thawaf/finish"
    );
  }
};

const handleResetDoa = () => {
  const confirmReset = window.confirm(
    `Hapus semua doa pada putaran ${round}?`
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
    `/category/thawaf-sai/thawaf?round=${round}`
  );
};

  const handleTambahDoa = () => {
    router.back();
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
                    isActive ? "w-2 h-2 bg-[#1D4ED8]" : "w-1.5 h-1.5 bg-[#E5E7EB]"
                  }`}
                />
              );
            })}
          </div>

          <button
  onClick={() =>
    router.push(
      `/category/thawaf-sai/thawaf?round=${round}`
    )
  }
  className="w-10 h-10 flex items-center justify-center"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D4ED8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="15" y2="18" />
    <path d="M19 16v6" />
    <path d="M16 19h6" />
  </svg>
</button>
        </header>

        {/* ===== TOP SECTION ===== */}
        <div className="px-5 mt-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[54px] font-bold text-[#1D4ED8] leading-none tracking-tighter">
              {round}
            </span>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] leading-tight">Thawaf</h2>
              <p className="text-[13px] text-[#6B7280]">Putaran {round} dari 7</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
  onClick={handleResetDoa}
  className="w-[46px] h-[46px] rounded-[14px] border border-[#E5E7EB] flex items-center justify-center"
>
  <RotateCcw className="w-5 h-5 text-[#1D4ED8]" />
</button>
            <button 
              onClick={handleLanjutkan}
              className="h-[46px] px-5 rounded-[14px] bg-[#1D4ED8] text-white text-[13px] font-bold shadow-md shadow-blue-200"
            >
              LANJUTKAN
            </button>
          </div>
        </div>

        {/* ===== ILLUSTRATION ===== */}
<div className="flex-1 overflow-y-auto px-4 pb-4">
  <div className="flex items-center justify-between mb-4">
    <span className="px-3 py-1 bg-blue-50 rounded-full text-xs font-semibold text-[#1D4ED8]">
      Dzikir / Doa
    </span>

    <span className="text-sm font-bold text-[#1D4ED8]">
      {doas.length} / {doas.length}
    </span>
  </div>

  <div className="space-y-4">
    {doas.map((doa, index) => (
      <div
  key={doa.id}
  className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm"
>
  {/* Header */}
  <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC]">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center">
        🕌
      </div>

      <h3 className="text-[28px] leading-relaxed font-arabic text-right">
        {doa.arab}
      </h3>
    </div>

    
  </div>

  {/* Content */}
  <div className="p-4">
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EEF2FF] text-[#2563EB] text-xs font-semibold mb-2">
      Latin
    </div>

    <p className="text-[#2563EB] font-semibold text-base">
      {doa.latin}
    </p>

    <p className="text-[#475569] mt-2 leading-relaxed">
      {doa.terjemahan}
    </p>
  </div>
</div>
  
    ))}
  </div>
</div>

           
      </div>
    </div>
  );
}

export default function ActiveThawafPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f4f6]"></div>}>
      <ActiveThawafContent />
    </Suspense>
  );
}
