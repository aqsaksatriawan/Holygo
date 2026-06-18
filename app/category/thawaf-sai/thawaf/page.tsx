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
const STORAGE_KEY = "holygo_thawaf_doa";
const PROGRESS_KEY = "holygo_thawaf_progress";

export default function ThawafDetailPage() {
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

  const completedCount = progress.filter(Boolean).length;
  const currentDoas = roundDoas[activeRound] || [];

  const handleStartRound = () => {
    // Navigate to doa if available, else go to empty state active thawaf page
    if (currentDoas.length > 0) {
      router.push(`/prayer/${currentDoas[0].id}?source=master`);
    } else {
      router.push(`/category/thawaf-sai/thawaf/active?round=${activeRound}`);
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
              className="mt-0.5 p-0.5"
            >
              <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="font-bold text-[20px] text-[#1A1A1A] leading-tight">
                Thawaf — Susun Doa
              </h1>
              <p className="text-[11px] text-[#9CA3AF] leading-snug mt-1.5 max-w-[260px]">
                Pilih doa untuk setiap putaran sebelum memulai. Ketuk nomor putaran untuk beralih.
              </p>
            </div>
          </div>
        </header>

        {/* ===== ROUND TABS ===== */}
        <div className="px-5 pb-4 shrink-0">
          <div className="flex items-center justify-between">
            {Array.from({ length: TOTAL_ROUNDS }, (_, i) => {
              const round = i + 1;
              const isActive = activeRound === round;
              const isDone = progress[i];
              return (
                <button
                  key={round}
                  onClick={() => setActiveRound(round)}
                  className="transition-all duration-200"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? "#3B82F6"
                      : isDone
                      ? "#DBEAFE"
                      : "#F3F4F6",
                    color: isActive
                      ? "white"
                      : isDone
                      ? "#3B82F6"
                      : "#9CA3AF",
                    border: "none",
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
          {/* Ka'bah Illustration */}
          <div className="relative flex flex-col items-center justify-center px-5 pt-2 pb-4">
            {/* Background mosque silhouette - very faint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
              <svg viewBox="0 0 300 180" className="w-[280px]" fill="none">
                <path d="M100 180V120C100 80 150 40 150 40C150 40 200 80 200 120V180Z" fill="#6B7280" />
                <rect x="60" y="90" width="12" height="90" fill="#6B7280" />
                <circle cx="66" cy="85" r="8" fill="#6B7280" />
                <rect x="228" y="90" width="12" height="90" fill="#6B7280" />
                <circle cx="234" cy="85" r="8" fill="#6B7280" />
                <rect x="30" y="130" width="80" height="50" fill="#6B7280" />
                <rect x="190" y="130" width="80" height="50" fill="#6B7280" />
              </svg>
            </div>

            {/* Ka'bah with orbit */}
            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
              {/* Orbit circle */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px dashed rgba(59,130,246,0.3)",
                }}
              />

              {/* Orbiting dot */}
              <div
                className="absolute w-3 h-3 rounded-full bg-[#3B82F6] shadow-lg shadow-blue-300"
                style={{
                  top: "50%",
                  left: "-2px",
                  transform: "translateY(-50%)",
                  animation: "none",
                }}
              />

              {/* Ka'bah SVG */}
              <svg viewBox="0 0 120 120" className="w-[120px] h-[120px]" fill="none">
                {/* Ka'bah body */}
                <rect x="25" y="30" width="70" height="65" rx="3" fill="#1F2937" />
                {/* Roof */}
                <path d="M20 30L60 10L100 30H20Z" fill="#374151" />
                {/* Gold kiswah band top */}
                <rect x="25" y="40" width="70" height="6" fill="#FBBF24" />
                {/* Gold kiswah band bottom */}
                <rect x="25" y="70" width="70" height="4" fill="#F59E0B" />
                {/* Calligraphy detail lines */}
                <rect x="35" y="48" width="50" height="1.5" rx="0.5" fill="#D97706" opacity="0.4" />
                <rect x="40" y="52" width="40" height="1.5" rx="0.5" fill="#D97706" opacity="0.3" />
                {/* Door */}
                <path d="M48 95V72C48 66.4772 52.4772 62 58 62H62C67.5228 62 72 66.4772 72 72V95" fill="#FBBF24" />
                <path d="M48 95V72C48 66.4772 52.4772 62 58 62H62C67.5228 62 72 66.4772 72 72V95" stroke="#D97706" strokeWidth="1" />
                {/* Door detail line */}
                <line x1="60" y1="65" x2="60" y2="95" stroke="#D97706" strokeWidth="0.8" />
              </svg>
            </div>

            {/* Putaran label */}
            <p className="text-[13px] font-medium text-[#6B7280] mt-2">
              Putaran {activeRound} dari {TOTAL_ROUNDS}
            </p>
          </div>

          {/* Doa Section */}
          <div className="px-5 pb-5">
            {currentDoas.length === 0 ? (
              /* Empty state */
              <div className="bg-[#F9FAFB] rounded-[20px] px-5 py-6 flex flex-col items-center text-center mb-4">
                {/* Book icon */}
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-[#6366F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-[14px] text-[#1A1A1A] mb-1">
                  Belum ada doa terpilih
                </h3>
                <p className="text-[11px] text-[#9CA3AF] leading-snug max-w-[220px]">
                  Ketuk Susun Doa untuk menambahkan dzikir &amp; doa untuk putaran ini.
                </p>
              </div>
            ) : (
              /* Selected doas list */
              <div className="bg-[#F9FAFB] rounded-[20px] px-4 py-4 mb-4 space-y-2">
                {currentDoas.map((doa, idx) => (
                  <div
                    key={doa.id}
                    className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm"
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
              className="w-full h-[48px] rounded-full border-2 border-[#E5E7EB] bg-white flex items-center justify-center gap-2 text-[14px] font-bold text-[#1A1A1A] active:scale-[0.98] transition mb-3"
            >
              <Plus className="w-4.5 h-4.5" strokeWidth={2.5} />
              Tambah Doa
            </button>

            {/* MULAI button */}
            <button
              onClick={handleStartRound}
              className="w-full h-[50px] rounded-full bg-[#3B82F6] flex items-center justify-center gap-2 text-[14px] font-bold text-white shadow-lg shadow-blue-200 active:scale-[0.98] transition"
            >
              <Play className="w-4 h-4 fill-white" />
              MULAI
            </button>
          </div>

          {/* Bottom Info */}
          <div className="px-5 pb-6">
            <div className="flex items-start gap-3 bg-[#F0F9FF] rounded-[16px] px-4 py-3.5">
              <div className="w-7 h-7 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5 text-[#3B82F6]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                Thawaf dimulai dari Hajar Aswad dan dilakukan berlawanan arah jarum jam mengelilingi Ka&apos;bah. Setiap kembali ke titik awal dihitung 1 putaran.
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
              <h2 className="flex items-center gap-2 font-bold text-[16px] text-[#3B82F6]">
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
                  className="w-full h-11 bg-white border border-[#E5E7EB] rounded-2xl pl-11 pr-4 text-[13px] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all text-[#1A1A1A] placeholder-gray-400"
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
                        <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-[#3B82F6]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />}
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
