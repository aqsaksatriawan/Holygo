"use client";

import React, { useState } from 'react';
import { Search, Bookmark, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. KOMPONEN LOGO ---
interface HolyLogoProps {
  size?: "sm" | "md" | "lg";
}

const HolyLogo: React.FC<HolyLogoProps> = ({ size = "md" }) => {
  const scale =
    size === "sm" ? "w-8 h-8" : size === "lg" ? "w-20 h-20" : "w-16 h-16";
  const textScale = 
    size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-3xl";

  return (
    <div className="flex items-center gap-2">
      <div className={`${scale} bg-[#51309E] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[12px] flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-sm`}>
        <div className="w-2/3 h-1.5 bg-[#A6CE39] rounded-sm mb-0.5"></div>
        <div className="w-2/3 h-1/2 bg-[#A6CE39] rounded-sm"></div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className={`${textScale} font-bold leading-none tracking-tight`}>
          <span className="text-[#51309E]">holy</span>
          <span className="text-[#A6CE39]">Go</span>
        </h1>
      </div>
    </div>
  );
};

// --- 2. HALAMAN UTAMA ---
const SearchPrayer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const prayers = [
    { id: 1, title: "Doa Pagi" },
    { id: 2, title: "Doa Siang" },
    { id: 3, title: "Doa Sore" },
    { id: 4, title: "Doa Makan" },
    { id: 5, title: "Doa Tidur" },
  ];

  const filteredPrayers = prayers.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col font-sans text-[#3D4759] shadow-2xl border-x border-gray-100">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-50 border-b border-gray-50">
        <HolyLogo size="sm" />
        
        <div className="flex items-center gap-1">
          {/* Ikon Bookmark */}
          <motion.button 
            whileTap={{ scale: 0.75 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <Bookmark className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
          </motion.button>

          {/* Ikon User (Profil) */}
          <motion.button 
            whileTap={{ scale: 0.75 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            onClick={() => console.log("Profile clicked")}
          >
            <User className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
          </motion.button>
        </div>
      </header>

      {/* SEARCH SECTION */}
      <div className="p-5 space-y-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51309E] transition-colors" />
          <input
            type="text"
            placeholder="Search for prayers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F3F4F6] py-3.5 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#51309E]/10 transition-all placeholder-gray-400 text-sm font-medium border border-transparent focus:border-gray-100"
          />
        </div>

        <div className="flex justify-between items-center px-1">
          <span className="text-[11px] font-black text-[#8E9AAF] uppercase tracking-widest">
            Results
          </span>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-[11px] font-black text-[#51309E] uppercase tracking-widest hover:opacity-60 transition-opacity"
          >
            Clear
          </button>
        </div>
      </div>

      {/* PRAYER LIST */}
      <main className="flex-1 overflow-y-auto px-5">
        <div className="divide-y divide-gray-50">
          <AnimatePresence mode="popLayout">
            {filteredPrayers.length > 0 ? (
              filteredPrayers.map((prayer) => (
                <motion.button
                  key={prayer.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full flex items-center justify-between py-6 group transition-colors"
                >
                  <div className="flex items-center gap-1 overflow-hidden">
                    <span className="font-bold text-[#1A1A1A] text-lg whitespace-nowrap">
                      {prayer.title}
                    </span>
                    <span className="text-gray-200 font-light tracking-tighter opacity-70">
                      ........................................
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#51309E] group-hover:translate-x-1 transition-all shrink-0" />
                </motion.button>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-gray-400 text-sm italic"
              >
                No prayers found.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default SearchPrayer;