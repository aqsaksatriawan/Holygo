"use client";

import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Prayer {
  id: number;
  judul: string;
  doa: string;
  latin: string;
  terjemahan: string;
  category: string;
}

const STORAGE_KEY_THAWAF = "holygo_thawaf_progress";
const STORAGE_KEY_SAI = "holygo_sai_progress";
const TOTAL_ROUNDS = 7;

export default function ThawafSaiPage() {
  const router = useRouter();

  const [thawafCompleted, setThawafCompleted] = useState<boolean[]>(
    Array(TOTAL_ROUNDS).fill(false)
  );
  const [saiCompleted, setSaiCompleted] = useState<boolean[]>(
    Array(TOTAL_ROUNDS).fill(false)
  );
  const [thawafPrayers, setThawafPrayers] = useState<Prayer[]>([]);
  const [saiPrayers, setSaiPrayers] = useState<Prayer[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedThawaf = localStorage.getItem(STORAGE_KEY_THAWAF);
      if (savedThawaf) {
        const parsed = JSON.parse(savedThawaf);
        if (Array.isArray(parsed) && parsed.length === TOTAL_ROUNDS) {
          setThawafCompleted(parsed);
        }
      }
      const savedSai = localStorage.getItem(STORAGE_KEY_SAI);
      if (savedSai) {
        const parsed = JSON.parse(savedSai);
        if (Array.isArray(parsed) && parsed.length === TOTAL_ROUNDS) {
          setSaiCompleted(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load progress", e);
    }
  }, []);

  // Fetch prayers
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const [thawafRes, saiRes] = await Promise.all([
          fetch("/api/master-prayer/thawaf"),
          fetch("/api/master-prayer/sai"),
        ]);
        const thawafData = await thawafRes.json();
        const saiData = await saiRes.json();
        if (Array.isArray(thawafData)) setThawafPrayers(thawafData);
        if (Array.isArray(saiData)) setSaiPrayers(saiData);
      } catch (e) {
        console.error("Failed to fetch prayers", e);
      }
    };
    fetchPrayers();
  }, []);

  const saveProgress = useCallback(
    (type: "thawaf" | "sai", arr: boolean[]) => {
      const key = type === "thawaf" ? STORAGE_KEY_THAWAF : STORAGE_KEY_SAI;
      localStorage.setItem(key, JSON.stringify(arr));
    },
    []
  );

  const toggleThawaf = (index: number) => {
    setThawafCompleted((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      saveProgress("thawaf", updated);
      return updated;
    });
  };

  const toggleSai = (index: number) => {
    setSaiCompleted((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      saveProgress("sai", updated);
      return updated;
    });
  };

  const thawafDone = thawafCompleted.filter(Boolean).length;
  const saiDone = saiCompleted.filter(Boolean).length;
  const thawafAllDone = thawafDone === TOTAL_ROUNDS;
  const saiAllDone = saiDone === TOTAL_ROUNDS;

  // Current Sa'i position: first incomplete round, or last if all done
  const saiCurrentIndex = saiCompleted.findIndex((v) => !v);
  const saiPosition = saiCurrentIndex === -1 ? TOTAL_ROUNDS : saiCurrentIndex;

  const handleThawafNavigate = () => {
    router.push(`/category/thawaf-sai/thawaf`);
  };

  const handleSaiNavigate = () => {
    router.push(`/category/thawaf-sai/sai`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-[#F5F6FA] border-8 border-slate-800 rounded-[40px] shadow-xl relative overflow-hidden flex flex-col">
        {/* ===== HEADER ===== */}
        <header className="px-5 pt-5 pb-3 bg-[#F5F6FA] shrink-0">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push("/home")}
              className="mt-0.5 p-0.5"
            >
              <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="font-bold text-[22px] text-[#1A1A1A] leading-tight">
                Thawaf &amp; Sa&apos;i
              </h1>
              <p className="text-[11px] text-[#9CA3AF] leading-snug mt-1">
                Pilih doa dan dzikir &amp; doa,
                <br />
                lalu geser antar doa pada setiap putaran
              </p>
            </div>
          </div>
        </header>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 space-y-4">
          {/* ============ THAWAF CARD ============ */}
          <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            {/* Top row: Ka'bah icon + text + chevron */}
            <button
              onClick={handleThawafNavigate}
              className="w-full flex items-center gap-3.5 px-4 pt-4 pb-3 text-left active:bg-gray-50 transition"
            >
              {/* Ka'bah circle */}
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] flex items-center justify-center shrink-0 shadow-md">
                <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                  {/* Ka'bah body */}
                  <rect x="10" y="12" width="20" height="20" rx="1.5" fill="#1F2937" />
                  {/* Roof top triangle */}
                  <path d="M8 12L20 5L32 12H8Z" fill="#374151" />
                  {/* Gold kiswah band */}
                  <rect x="10" y="16" width="20" height="2.5" rx="0.5" fill="#FBBF24" />
                  {/* Lower gold band */}
                  <rect x="10" y="25" width="20" height="1.5" rx="0.5" fill="#F59E0B" />
                  {/* Door */}
                  <path d="M17 32V25C17 23.3431 18.3431 22 20 22C21.6569 22 23 23.3431 23 25V32" fill="#FBBF24" />
                  {/* Circular tawaf arrows */}
                  <circle cx="20" cy="22" r="16" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[15px] text-[#1A1A1A]">Mulai Thawaf</h2>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">Mengelilingi Ka&apos;bah</p>
                <span className="text-[12px] font-semibold text-[#3B82F6] mt-0.5 inline-block">
                  7 putaran
                </span>
              </div>

              <ChevronRight className="w-5 h-5 text-[#D1D5DB] shrink-0" />
            </button>

            {/* Thawaf progress section */}
            <div className="px-4 pb-4">
              {/* Progress label row */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] font-medium text-[#6B7280]">
                  Putaran {thawafDone} dari {TOTAL_ROUNDS}
                </span>
                {thawafAllDone && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selesai
                  </span>
                )}
              </div>

              {/* 7 progress dots connected by lines */}
              <div className="flex items-center gap-0 px-0.5">
                {thawafCompleted.map((done, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div
                        className="flex-1 h-[2.5px] rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor:
                            thawafCompleted[i - 1] && done ? "#22C55E" : "#E5E7EB",
                        }}
                      />
                    )}
                    <button
                      onClick={() => toggleThawaf(i)}
                      className="shrink-0 transition-all duration-300"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        backgroundColor: done ? "#22C55E" : "#F3F4F6",
                        color: done ? "white" : "#9CA3AF",
                        border: done ? "none" : "2px solid #E5E7EB",
                      }}
                    >
                      {done ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Info row with book icon */}
              <div className="flex items-center gap-2.5 mt-4 bg-[#F9FAFB] rounded-xl px-3 py-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                  {/* Book icon */}
                  <svg className="w-4 h-4 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V14a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-snug flex-1">
                  Baca doa setiap putaran di antara Rukun Yamani dan Hajar Aswad.
                </p>
                <ChevronRight className="w-4 h-4 text-[#D1D5DB] shrink-0" />
              </div>
            </div>
          </div>

          {/* ============ SA'I CARD ============ */}
          <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            {/* Top row: Mosque icon + text + chevron */}
            <button
              onClick={handleSaiNavigate}
              className="w-full flex items-center gap-3.5 px-4 pt-4 pb-3 text-left active:bg-gray-50 transition"
            >
              {/* Mosque icon */}
              <div className="w-[60px] h-[60px] rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0 border border-[#E5E7EB]">
                <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                  {/* Dome */}
                  <path d="M12 24C12 16 20 10 20 10C20 10 28 16 28 24" fill="#374151" />
                  {/* Building body */}
                  <rect x="10" y="24" width="20" height="10" fill="#4B5563" />
                  {/* Left minaret */}
                  <rect x="6" y="16" width="4" height="18" rx="1" fill="#6B7280" />
                  <circle cx="8" cy="14" r="2.5" fill="#9CA3AF" />
                  {/* Right minaret */}
                  <rect x="30" y="16" width="4" height="18" rx="1" fill="#6B7280" />
                  <circle cx="32" cy="14" r="2.5" fill="#9CA3AF" />
                  {/* Crescent on dome */}
                  <path d="M19 8C19 6.5 21 6.5 21 8" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Door */}
                  <path d="M17.5 34V30C17.5 28.6193 18.6193 27.5 20 27.5C21.3807 27.5 22.5 28.6193 22.5 30V34" fill="#374151" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[15px] text-[#1A1A1A]">Mulai Sa&apos;i</h2>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">Berjalan antara Shafa dan Marwah</p>
                <span className="text-[12px] font-semibold text-[#3B82F6] mt-0.5 inline-block">
                  7 putaran
                </span>
              </div>

              <ChevronRight className="w-5 h-5 text-[#D1D5DB] shrink-0" />
            </button>

            {/* Sa'i progress section */}
            <div className="px-4 pb-4">
              {/* Progress label */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] font-medium text-[#6B7280]">
                  Perjalanan {Math.min(saiDone + 1, TOTAL_ROUNDS)} dari {TOTAL_ROUNDS}
                </span>
                {saiAllDone && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Selesai
                  </span>
                )}
              </div>

              {/* Shafa <-> Marwah track */}
              <div className="relative mb-3">
                {/* Labels */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-[#6B7280]">Shafa</span>
                  <span className="text-[10px] font-semibold text-[#6B7280]">Marwah</span>
                </div>

                {/* Track line */}
                <div className="relative h-[4px] bg-[#E5E7EB] rounded-full mx-1">
                  {/* Filled */}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#22C55E] rounded-full transition-all duration-500"
                    style={{ width: `${(saiDone / TOTAL_ROUNDS) * 100}%` }}
                  />
                </div>

                {/* Dots at Shafa and Marwah ends */}
                <div className="flex items-center justify-between mt-[-12px] px-0">
                  {/* Shafa dot */}
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: saiDone > 0 ? "#22C55E" : "#22C55E",
                      borderColor: saiDone > 0 ? "#22C55E" : "#22C55E",
                    }}
                  />
                  {/* Marwah dot */}
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: saiAllDone ? "#22C55E" : "white",
                      borderColor: saiAllDone ? "#22C55E" : "#D1D5DB",
                    }}
                  />
                </div>
              </div>

              {/* Info row with book icon */}
              <div className="flex items-center gap-2.5 mt-2 bg-[#F9FAFB] rounded-xl px-3 py-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V14a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-snug flex-1">
                  Baca doa dan dzikir di setiap perjalanan antara Shafa dan Marwah.
                </p>
                <ChevronRight className="w-4 h-4 text-[#D1D5DB] shrink-0" />
              </div>
            </div>
          </div>

          {/* ============ BOTTOM INFO ============ */}
          <div className="flex items-center gap-3 bg-white rounded-[16px] px-4 py-3" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[#3B82F6]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-snug">
              Pilih ritual untuk melanjutkan.
              <br />
              Progress tersimpan otomatis.
            </p>
          </div>

          {/* ============ MOSQUE SILHOUETTE DECORATION ============ */}
          <div className="relative mt-2 mx-auto w-full overflow-hidden rounded-[16px]" style={{ height: 100 }}>
            <svg viewBox="0 0 340 100" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
              {/* Sky gradient */}
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#134E4A" />
                  <stop offset="100%" stopColor="#0F766E" />
                </linearGradient>
              </defs>
              <rect width="340" height="100" fill="url(#skyGrad)" rx="16" />

              {/* Stars */}
              <circle cx="40" cy="15" r="1.2" fill="#FDE68A" opacity="0.8" />
              <circle cx="80" cy="25" r="0.8" fill="#FDE68A" opacity="0.6" />
              <circle cx="120" cy="12" r="1" fill="#FDE68A" opacity="0.7" />
              <circle cx="200" cy="20" r="1.2" fill="#FDE68A" opacity="0.8" />
              <circle cx="260" cy="10" r="0.8" fill="#FDE68A" opacity="0.6" />
              <circle cx="300" cy="22" r="1" fill="#FDE68A" opacity="0.7" />
              <circle cx="155" cy="8" r="0.6" fill="#FDE68A" opacity="0.5" />

              {/* Crescent moon */}
              <circle cx="280" cy="18" r="8" fill="#FBBF24" opacity="0.9" />
              <circle cx="283" cy="16" r="7" fill="#134E4A" />

              {/* Mosque silhouette - center large dome */}
              <path d="M120 100V70C120 55 170 35 170 35C170 35 220 55 220 70V100Z" fill="#0D4A45" />
              {/* Left minaret */}
              <rect x="95" y="50" width="8" height="50" fill="#0D4A45" />
              <rect x="93" y="46" width="12" height="6" rx="1" fill="#0D4A45" />
              <circle cx="99" cy="44" r="4" fill="#0D4A45" />
              {/* Crescent on left minaret */}
              <path d="M98 38C98 36 100 36 100 38" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
              {/* Right minaret */}
              <rect x="237" y="50" width="8" height="50" fill="#0D4A45" />
              <rect x="235" y="46" width="12" height="6" rx="1" fill="#0D4A45" />
              <circle cx="241" cy="44" r="4" fill="#0D4A45" />
              {/* Crescent on right minaret */}
              <path d="M240 38C240 36 242 36 242 38" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
              {/* Crescent on main dome */}
              <path d="M169 31C169 28 171 28 171 31" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />

              {/* Small buildings left */}
              <rect x="0" y="75" width="100" height="25" fill="#0D4A45" />
              <rect x="10" y="65" width="18" height="35" rx="2" fill="#0D4A45" />
              <rect x="35" y="60" width="22" height="40" rx="2" fill="#0D4A45" />
              <path d="M35 60L46 50L57 60" fill="#0D4A45" />
              <rect x="65" y="68" width="15" height="32" rx="2" fill="#0D4A45" />

              {/* Small buildings right */}
              <rect x="245" y="75" width="100" height="25" fill="#0D4A45" />
              <rect x="255" y="62" width="20" height="38" rx="2" fill="#0D4A45" />
              <path d="M255 62L265 52L275 62" fill="#0D4A45" />
              <rect x="280" y="68" width="16" height="32" rx="2" fill="#0D4A45" />
              <rect x="305" y="65" width="18" height="35" rx="2" fill="#0D4A45" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
