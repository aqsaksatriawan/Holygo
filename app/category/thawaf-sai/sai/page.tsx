"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus, Play, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SelectedDoa {
  id: number;
  judul: string;
  latin?: string;
}

const TOTAL_ROUNDS = 7;
const STORAGE_KEY = "holygo_sai_doa";
const PROGRESS_KEY = "holygo_sai_progress";
const PRIMARY_COLOR = "#2F8A5A";

export default function SaiDetailPage() {
  const router = useRouter();
  const [activeRound, setActiveRound] = useState(1);
  const [roundDoas, setRoundDoas] = useState<Record<number, SelectedDoa[]>>({});
  const [progress, setProgress] = useState<boolean[]>(Array(TOTAL_ROUNDS).fill(false));
  const [showModal, setShowModal] = useState(false);
  const [allPrayers, setAllPrayers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all prayers for modal
  useEffect(() => {
    fetch("/api/master-prayer?all=true")
      .then((res) => res.json())
      .then((data) => setAllPrayers(data))
      .catch((e) => console.error(e));
  }, []);

  // Load saved doas and progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRoundDoas(JSON.parse(saved));
      }
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length === TOTAL_ROUNDS) {
          setProgress(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const currentDoas = roundDoas[activeRound] || [];

  const handleStartRound = () => {
    // Navigate to doa if available, else go to empty state active sai page
    if (currentDoas.length > 0) {
      router.push(`/prayer/${currentDoas[0].id}?source=master`);
    } else {
      router.push(`/category/thawaf-sai/sai/active?round=${activeRound}`);
    }
  };

  const handleAddDoa = () => {
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] shadow-xl relative overflow-hidden flex flex-col">
        {/* ===== HEADER ===== */}
        <header className="px-5 pt-5 pb-4 bg-white shrink-0">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push("/category/thawaf-sai")}
              className="mt-0.5 p-1.5 border border-[#F3F4F6] rounded-[14px] bg-white shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="font-bold text-[20px] text-[#1A1A1A] leading-tight">
                Sa&apos;i — Susun Doa
              </h1>
              <p className="text-[11px] text-[#9CA3AF] leading-snug mt-1.5 max-w-[260px]">
                Pilih doa untuk setiap putaran sebelum memulai. Ketuk nomor putaran untuk beralih.
              </p>
            </div>
          </div>
        </header>

        {/* ===== ROUND TABS ===== */}
        <div className="px-5 pb-4 shrink-0 relative">
          <div className="absolute top-1/2 left-[30px] right-[30px] h-[1px] border-t-2 border-dashed border-[#E5E7EB] -translate-y-1/2 z-0"></div>
          <div className="flex items-center justify-between relative z-10">
            {Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
              const round = i + 1;
              const isActive = activeRound === round;
              const isDone = progress[i];
              return (
                <button
                  key={round}
                  onClick={() => setActiveRound(round)}
                  className="transition-all duration-200 shadow-sm"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? PRIMARY_COLOR
                      : "white",
                    color: isActive
                      ? "white"
                      : "#6B7280",
                    border: isActive ? "none" : "1px solid #E5E7EB",
                  }}
                >
                  {round}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Shafa & Marwah Illustration */}
          <div className="relative flex flex-col items-center justify-center px-5 pt-4 pb-6">
            {/* Background mosque silhouette - faint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none -top-10">
              <svg viewBox="0 0 300 180" className="w-[300px]" fill="none">
                <path d="M100 180V120C100 80 150 40 150 40C150 40 200 80 200 120V180Z" fill="#6B7280" />
                <rect x="60" y="90" width="12" height="90" fill="#6B7280" />
                <circle cx="66" cy="85" r="8" fill="#6B7280" />
                <rect x="228" y="90" width="12" height="90" fill="#6B7280" />
                <circle cx="234" cy="85" r="8" fill="#6B7280" />
                <rect x="30" y="130" width="80" height="50" fill="#6B7280" />
                <rect x="190" y="130" width="80" height="50" fill="#6B7280" />
              </svg>
            </div>

            {/* Illustration */}
            <div className="relative w-full h-[140px] flex items-center justify-between px-2">
              {/* Shafa */}
              <div className="flex flex-col items-center relative z-10">
                <div className="absolute -top-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={PRIMARY_COLOR}/>
                  </svg>
                </div>
                {/* Rock illustration */}
                <svg width="80" height="50" viewBox="0 0 80 50" fill="none" className="mt-2">
                  <path d="M40 10L10 45H70L40 10Z" fill="#9CA3AF" />
                  <path d="M40 10L55 25L45 30L70 45H10L40 10Z" fill="#D1D5DB" />
                  <path d="M20 30L10 45H30L20 30Z" fill="#6B7280" />
                  <ellipse cx="40" cy="45" rx="35" ry="5" fill="#E5E7EB" className="opacity-50" />
                </svg>
                <span className="text-[12px] font-bold text-[#1A1A1A] mt-2">Shafa</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-[-5px] bottom-6">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#86efac"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="absolute right-[-2px] bottom-8">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#4ade80"/>
                </svg>
              </div>

              {/* Path line */}
              <div className="absolute left-16 right-16 top-1/2 -translate-y-4">
                <svg width="100%" height="40" preserveAspectRatio="none" className="overflow-visible">
                  <path d="M0,0 Q 50,40 100,0" stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  <path d="M50,20 L55,15 L50,10" stroke="#86efac" strokeWidth="2" fill="none" />
                  <path d="M40,16 L45,11 L40,6" stroke="#86efac" strokeWidth="2" fill="none" />
                  <path d="M60,24 L65,19 L60,14" stroke="#86efac" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Marwah */}
              <div className="flex flex-col items-center relative z-10">
                <div className="absolute -top-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={PRIMARY_COLOR}/>
                  </svg>
                </div>
                {/* Rock illustration */}
                <svg width="70" height="40" viewBox="0 0 70 40" fill="none" className="mt-6">
                  <path d="M35 5L5 40H65L35 5Z" fill="#9CA3AF" />
                  <path d="M35 5L50 20L40 25L65 40H5L35 5Z" fill="#D1D5DB" />
                  <path d="M20 25L10 40H30L20 25Z" fill="#6B7280" />
                  <ellipse cx="35" cy="40" rx="30" ry="4" fill="#E5E7EB" className="opacity-50" />
                </svg>
                <span className="text-[12px] font-bold text-[#1A1A1A] mt-2">Marwah</span>
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="absolute left-[-8px] bottom-6">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#86efac"/>
                </svg>
              </div>
            </div>

            {/* Pill Badge */}
            <div className="mt-4 bg-[#F0FDF4] px-4 py-1.5 rounded-full">
              <p className="text-[12px] font-medium text-[#4B5563]">
                Perjalanan <span className="font-bold text-[#166534]">{activeRound}</span> dari {TOTAL_ROUNDS}
              </p>
            </div>
          </div>

          {/* Doa Section */}
          <div className="px-5 pb-5">
            {currentDoas.length === 0 ? (
              /* Empty state */
              <div className="bg-[#F9FAFB] rounded-[20px] px-5 py-6 flex flex-col items-start mb-4 shadow-sm relative overflow-hidden border border-[#F3F4F6]">
                <div className="flex items-center gap-4">
                  {/* Book icon */}
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#F0FDF4] relative">
                    <svg className="w-7 h-7 text-[#2F8A5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      <path d="M8 7h8" />
                      <path d="M8 11h6" />
                    </svg>
                    {/* Sparkles */}
                    <div className="absolute top-1 right-0 text-[#2F8A5A] text-[10px]">✨</div>
                    <div className="absolute bottom-2 left-0 text-[#2F8A5A] text-[8px]">✨</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#1A1A1A] mb-1">
                      Belum ada doa terpilih
                    </h3>
                    <p className="text-[12px] text-[#6B7280] leading-snug">
                      Ketuk Susun Doa untuk menambahkan dzikir &amp; doa untuk perjalanan ini.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Selected doas list */
              <div className="bg-[#F9FAFB] rounded-[20px] px-4 py-4 mb-4 space-y-2 border border-[#F3F4F6]">
                {currentDoas.map((doa, idx) => (
                  <div
                    key={doa.id}
                    className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-[#F3F4F6]"
                  >
                    <span className="text-[13px] font-medium text-[#1A1A1A]">
                      {idx + 1}. {doa.judul}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tambah Doa button */}
            <button
              onClick={handleAddDoa}
              className="w-full h-[48px] rounded-[14px] border border-[#E5E7EB] bg-white flex items-center justify-center gap-2 text-[14px] font-bold active:scale-[0.98] transition mb-3"
              style={{ color: PRIMARY_COLOR }}
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} />
              Tambah Doa
            </button>

            {/* MULAI button */}
            <button
              onClick={handleStartRound}
              className="w-full h-[50px] rounded-[14px] flex items-center justify-center gap-2 text-[14px] font-bold text-white shadow-md shadow-emerald-200 active:scale-[0.98] transition"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <Play className="w-4 h-4 fill-white" />
              MULAI
            </button>
          </div>

          {/* Bottom Info */}
          <div className="px-5 pb-6">
            <div className="flex items-start gap-3 bg-[#F0FDF4] rounded-[16px] px-4 py-3.5 border border-[#DCFCE7]">
              <div className="w-6 h-6 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={PRIMARY_COLOR}/>
                </svg>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                Sa&apos;i dimulai dari Shafa dan diakhiri di Marwah.
                Satu kali perjalanan Shafa-Marwah dihitung 1 putaran.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SHEET MODAL ===== */}
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
              <h2 className="flex items-center gap-2 font-bold text-[16px]" style={{ color: PRIMARY_COLOR }}>
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
                  className="w-full h-11 bg-white border border-[#E5E7EB] rounded-2xl pl-11 pr-4 text-[13px] focus:outline-none transition-all text-[#1A1A1A] placeholder-gray-400"
                  style={{ '--tw-ring-color': PRIMARY_COLOR } as any}
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
                  const isSelected = currentDoas.some((d) => d.id === prayer.id);
                  
                  return (
                    <div 
                      key={prayer.id}
                      onClick={() => {
                        let updatedList;
                        if (isSelected) {
                          updatedList = currentDoas.filter(d => d.id !== prayer.id);
                        } else {
                          updatedList = [...currentDoas, { id: prayer.id, judul: prayer.judul, latin: prayer.latin }];
                        }
                        const newRoundDoas = { ...roundDoas, [activeRound]: updatedList };
                        setRoundDoas(newRoundDoas);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRoundDoas));
                      }}
                      className="py-3.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition px-2 -mx-2 rounded-xl"
                    >
                      {/* Radio button style selector */}
                      <div className="shrink-0 pt-0.5">
                        <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-[' + PRIMARY_COLOR + ']' : 'border-gray-300'}`}
                             style={isSelected ? { borderColor: PRIMARY_COLOR } : {}}
                        >
                          {isSelected && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PRIMARY_COLOR }} />}
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
  );
}
