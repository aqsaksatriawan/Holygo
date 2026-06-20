"use client";

import React, { useEffect, useState, Suspense } from "react";
import { ChevronLeft, RotateCcw, Plus, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";


function ActiveSaiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundParam = searchParams.get("round");
  const round = roundParam ? parseInt(roundParam, 10) : 1;
  const TOTAL_ROUNDS = 7;
  const PRIMARY_COLOR = "#2F8A5A";

 const STORAGE_KEY = "holygo_sai_doa";

const [doas, setDoas] = useState<any[]>([]);

useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);
    setDoas(parsed[round] || []);
  }
}, [round]);
  

  const handleLanjutkan = () => {
    // Mark this round as done, and go back to the susun doa page
    const PROGRESS_KEY = "holygo_sai_progress";
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      let progress = Array(TOTAL_ROUNDS).fill(false);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length === TOTAL_ROUNDS) {
          progress = parsed;
        }
      }
      progress[round - 1] = true;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
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
    `Hapus semua doa pada putaran ${round}?`
  );

  if (!confirmReset) return;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  const parsed = JSON.parse(saved);

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
                    isActive ? "w-2 h-2" : "w-1.5 h-1.5 bg-[#E5E7EB]"
                  }`}
                  style={isActive ? { backgroundColor: PRIMARY_COLOR } : {}}
                />
              );
            })}
          </div>
<button
  onClick={() =>
    router.push(
      `/category/thawaf-sai/sai?round=${round}`
    )
  }
  className="w-10 h-10 flex items-center justify-center"
>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* ===== TOP SECTION ===== */}
        <div className="px-5 mt-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[54px] font-bold leading-none tracking-tighter" style={{ color: PRIMARY_COLOR }}>
              {round}
            </span>
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] leading-tight">Sa&apos;i</h2>
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
              className="h-[46px] px-5 rounded-[14px] text-white text-[13px] font-bold shadow-md"
              style={{ backgroundColor: PRIMARY_COLOR, boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.2)" }}
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
        <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
              🕌
            </div>

            <h3 className="text-[28px] leading-relaxed font-arabic text-right">
        {doa.arab}
      </h3>
    </div>
        </div>

{/* Content */}
  <div className="p-4">
  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EEF2FF] text-xs font-semibold mb-2">
    Latin
  </div>

  <p className="font-semibold text-base text-[#2F8A5A]">
    {doa.latin}
  </p>

  <p className="text-[#475569] mt-3 leading-relaxed">
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
       <ActiveSaiContent/>
     </Suspense>
   );
 }
 