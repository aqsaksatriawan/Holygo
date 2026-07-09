"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";

interface SelectedDoa {
  id: number;
  judul: string;
  arab?: string;
  latin?: string;
  terjemahan?: string;
}

const TOTAL_ROUNDS = 7;
const STORAGE_KEY = "holygo_sai_doa";

export default function SaiDetailPage() {
  const [activeRound, setActiveRound] = useState(1);
  const [roundDoas, setRoundDoas] = useState<Record<number, SelectedDoa[]>>({});
  const [showModal, setShowModal] = useState(false);
  const [allPrayers, setAllPrayers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all prayers
  useEffect(() => {
    fetch("/api/master-prayer?all=true")
      .then((res) => res.json())
      .then((data) => setAllPrayers(data))
      .catch((e) => console.error(e));
  }, []);

  // Load saved doas
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRoundDoas(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Auto-open modal when round has no doas
  useEffect(() => {
    const doas = roundDoas[activeRound] || [];
    if (doas.length === 0 && allPrayers.length > 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [activeRound, roundDoas, allPrayers]);

  const currentDoas = roundDoas[activeRound] || [];

  return (
    <div>
      {/* Only render modal */}
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
              <h2 className="flex items-center gap-2 font-bold text-[16px] text-[#2F8A5A]">
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
                  className="w-full h-11 bg-white border border-[#E5E7EB] rounded-2xl pl-11 pr-4 text-[13px] focus:outline-none focus:border-[#2F8A5A] focus:ring-1 focus:ring-[#2F8A5A] transition-all text-[#1A1A1A] placeholder-gray-400"
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
                          updatedList = [
                            ...currentDoas,
                            {
                              id: prayer.id,
                              judul: prayer.judul,
                              arab: prayer.doa,
                              latin: prayer.latin,
                              terjemahan: prayer.terjemahan,
                            }
                          ];
                        }
                        const newRoundDoas = { ...roundDoas, [activeRound]: updatedList };
                        setRoundDoas(newRoundDoas);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRoundDoas));
                      }}
                      className="py-3.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition px-2 -mx-2 rounded-xl"
                    >
                      {/* Radio button */}
                      <div className="shrink-0 pt-0.5">
                        <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-[#2F8A5A]' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-3 h-3 rounded-full bg-[#2F8A5A]" />}
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
