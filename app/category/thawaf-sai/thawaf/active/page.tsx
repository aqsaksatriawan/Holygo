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

  const handleLanjutkan = () => {
    // Mark this round as done, and go back to the susun doa page
    const PROGRESS_KEY = "holygo_thawaf_progress";
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
    router.back();
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

          <button className="w-10 h-10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="15" y2="18"></line>
              <path d="M19 16v6"></path>
              <path d="M16 19h6"></path>
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
            <button className="w-[46px] h-[46px] rounded-[14px] border border-[#E5E7EB] flex items-center justify-center">
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
        <div className="flex-1 mt-6 relative flex flex-col items-center justify-center overflow-hidden">
          {/* Light blue background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          
          <div className="relative w-full h-[260px] flex items-center justify-center">
             {/* Base circles */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[100px] rounded-[50%] border-2 border-blue-50"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[70px] rounded-[50%] border-2 border-blue-100"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[40px] rounded-[50%] border-2 border-blue-200"></div>

             {/* Background arches (Colosseum-like) */}
             <svg width="340" height="120" viewBox="0 0 340 120" fill="none" className="absolute top-4 opacity-40">
                <path d="M0 60 Q 170 0 340 60 L340 120 L0 120 Z" fill="url(#archGrad)"/>
                <defs>
                  <linearGradient id="archGrad" x1="170" y1="0" x2="170" y2="120" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#DBEAFE"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
             </svg>
             
             {/* Arches windows */}
             <div className="absolute top-8 w-full flex justify-between px-2 opacity-30">
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                  <div key={i} className="w-6 h-16 bg-blue-200 rounded-t-full"></div>
                ))}
             </div>

             {/* Sun dome */}
             <div className="absolute top-0 w-[200px] h-[200px] bg-[#F0F6FF] rounded-full opacity-60 pointer-events-none"></div>

             {/* Little clouds & birds */}
             <svg width="300" height="100" className="absolute top-0 pointer-events-none opacity-50">
                <path d="M50 40 Q 55 35 60 40 Q 65 35 70 40" stroke="#94A3B8" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M250 30 Q 255 25 260 30 Q 265 25 270 30" stroke="#94A3B8" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M120 20 Q 130 15 140 20 Q 150 15 160 20" fill="white" opacity="0.8"/>
                <path d="M180 35 Q 190 30 200 35 Q 210 30 220 35" fill="white" opacity="0.8"/>
             </svg>

             {/* Blue orbit path with arrow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[130px] rounded-[50%] pointer-events-none" style={{
                border: "2px solid #3B82F6",
                borderRightColor: "transparent",
                borderTopColor: "transparent",
                borderBottomStyle: "dashed",
                transform: "translate(-50%, -50%) rotate(15deg)",
             }}></div>
             
             {/* Arrow head & dot for orbit */}
             <div className="absolute bottom-6 left-1/2 ml-[20px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#3B82F6] transform rotate-12"></div>
             <div className="absolute bottom-10 left-[80px] w-2.5 h-2.5 bg-[#1D4ED8] rounded-full ring-4 ring-white"></div>

             {/* People (white robes) */}
             {[
               {left: "30%", top: "45%", scale: 0.8},
               {left: "20%", top: "60%", scale: 0.9},
               {left: "40%", top: "75%", scale: 1},
               {left: "60%", top: "80%", scale: 1.1},
               {left: "80%", top: "65%", scale: 0.95},
               {left: "75%", top: "45%", scale: 0.85},
               {left: "50%", top: "35%", scale: 0.75},
             ].map((pos, i) => (
                <svg key={i} width="16" height="32" viewBox="0 0 16 32" className="absolute" style={{ left: pos.left, top: pos.top, transform: `scale(${pos.scale})` }}>
                  {/* Head */}
                  <circle cx="8" cy="4" r="3" fill="#E2E8F0" />
                  {/* Body/Robe */}
                  <path d="M8 7 L4 30 L12 30 Z" fill="white" />
                  {/* Shadow */}
                  <ellipse cx="8" cy="31" rx="6" ry="1.5" fill="rgba(0,0,0,0.1)" />
                </svg>
             ))}

             {/* Ka'bah Block */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[70px] h-[80px]">
               {/* 3D Ka'bah using SVG */}
               <svg viewBox="0 0 100 120" width="100%" height="100%">
                 {/* Left Face */}
                 <path d="M10 50 L50 30 L50 100 L10 80 Z" fill="#1e293b" />
                 {/* Right Face */}
                 <path d="M50 30 L90 50 L90 80 L50 100 Z" fill="#0f172a" />
                 {/* Top Face */}
                 <path d="M10 50 L50 30 L90 50 L50 70 Z" fill="#334155" />
                 
                 {/* Gold Band Left */}
                 <path d="M10 60 L50 40 L50 46 L10 66 Z" fill="#FBBF24" />
                 <path d="M10 68 L50 48 L50 50 L10 70 Z" fill="#FBBF24" opacity="0.6" />
                 
                 {/* Gold Band Right */}
                 <path d="M50 40 L90 60 L90 66 L50 46 Z" fill="#F59E0B" />
                 <path d="M50 48 L90 68 L90 70 L50 50 Z" fill="#F59E0B" opacity="0.6" />

                 {/* Door */}
                 <path d="M60 70 L75 78 L75 92 L60 84 Z" fill="#FBBF24" />
                 {/* Shadow at bottom */}
                 <ellipse cx="50" cy="100" rx="40" ry="10" fill="rgba(0,0,0,0.2)" />
               </svg>
             </div>
             
             {/* Decorative leaves */}
             <svg width="40" height="60" viewBox="0 0 40 60" className="absolute bottom-0 left-4 opacity-60">
                <path d="M20 60 C 20 40 5 30 5 20 C 5 10 15 5 20 5" stroke="#60A5FA" fill="none" strokeWidth="2"/>
                <path d="M20 40 C 30 30 35 20 35 15 C 35 10 25 5 20 20" fill="#93C5FD"/>
                <path d="M15 30 C 5 25 0 15 0 10 C 0 5 10 0 15 15" fill="#BFDBFE"/>
                <path d="M22 50 C 35 45 40 35 40 30 C 40 25 30 20 22 35" fill="#60A5FA"/>
             </svg>
             <svg width="40" height="60" viewBox="0 0 40 60" className="absolute bottom-0 right-4 opacity-60 transform scale-x-[-1]">
                <path d="M20 60 C 20 40 5 30 5 20 C 5 10 15 5 20 5" stroke="#60A5FA" fill="none" strokeWidth="2"/>
                <path d="M20 40 C 30 30 35 20 35 15 C 35 10 25 5 20 20" fill="#93C5FD"/>
                <path d="M15 30 C 5 25 0 15 0 10 C 0 5 10 0 15 15" fill="#BFDBFE"/>
                <path d="M22 50 C 35 45 40 35 40 30 C 40 25 30 20 22 35" fill="#60A5FA"/>
             </svg>
          </div>
        </div>

        {/* ===== BOTTOM TEXT & ACTIONS ===== */}
        <div className="px-5 pb-6 shrink-0 flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-[#1D4ED8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              <path d="M8 7h8" />
              <path d="M8 11h6" />
            </svg>
          </div>
          <h3 className="text-[18px] font-bold text-[#1e293b] mb-1.5">Siap untuk Thawaf</h3>
          <p className="text-[13px] text-[#64748b] leading-relaxed max-w-[260px] mx-auto mb-6">
            Berputarlah mengelilingi Ka&apos;bah sebanyak 7 putaran berlawanan arah jarum jam.
          </p>

          <button
            onClick={handleTambahDoa}
            className="w-full h-[64px] border border-dashed border-[#60A5FA] bg-white rounded-2xl flex flex-col items-center justify-center gap-1 active:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-[#1D4ED8] font-bold text-[14px]">
              <div className="w-5 h-5 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
              Tambah Doa
            </div>
            <p className="text-[11px] text-[#64748b]">
              Ketuk untuk menambahkan dzikir &amp; doa untuk putaran ini.
            </p>
          </button>
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
