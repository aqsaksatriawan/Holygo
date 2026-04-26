"use client";

import React, { useState } from 'react';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const PrayerDetail: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(24);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const prayerData = {
    title: "Doa pagi",
    arabic: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ وَخَيْرَ مَا فِيْهِ، وَأَعُوْذُ بِكَ مِنْ شَرِّ هَذَا الْيَوْمِ وَشَرِّ مَا فِيْهِ",
    latin: "Allahumma innī asaluka khaira hāzal yaumi wa khaira mā fīhi, wa a'ūzu bika min syarri hāzal yaumi wa syarri mā fīhi.",
    translation: "Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan hari ini dan kebaikan yang ada di dalamnya, dan aku berlindung kepada-Mu dari keburukan hari ini dan keburukan yang ada di dalamnya."
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col font-sans text-[#3D4759] shadow-2xl">
      {/* Navbar - Judul Doa Pindah ke Sini */}
      <header className="flex items-center justify-between p-4 border-b border-gray-50">
        {/* Tombol Back */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => console.log('Back clicked')}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </motion.button>

        {/* Judul Doa (Menggantikan Prayer Detail) */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#F0F7FF] text-[#3D4759] px-5 py-1.5 rounded-full font-bold text-base shadow-sm border border-blue-50"
        >
          {prayerData.title}
        </motion.div>

        {/* Tombol Bookmark */}
        <motion.button 
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark 
            className={`w-6 h-6 transition-colors ${isBookmarked ? 'fill-black text-black' : 'text-gray-800'}`} 
          />
        </motion.button>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Spasi atas sedikit lebih lega karena judul sudah pindah ke header */}
        <div 
          className="text-right leading-[2.8] mb-8 mt-2 font-serif transition-all duration-300 ease-out"
          style={{ fontSize: `${fontSize}px` }}
          dir="rtl"
        >
          {prayerData.arabic}
        </div>

        <div className="bg-[#F8F9FB] p-5 rounded-2xl border-l-4 border-indigo-200 mb-6 italic text-[#5E6778] leading-relaxed shadow-sm">
          {prayerData.latin}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-black uppercase tracking-wider text-[#A0AABF]">Artinya:</p>
          <p className="text-[#4A5468] leading-relaxed text-lg">
            "{prayerData.translation}"
          </p>
        </div>
      </main>

      {/* Footer / Font Size Slider */}
      <footer className="p-8 bg-[#F8F9FB] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.04)] border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-[#3D4759] tracking-tight">Font size</span>
          <span className="bg-white px-3 py-1 rounded-lg shadow-sm text-xs font-bold text-[#5236A0]">
            {fontSize} px
          </span>
        </div>
        
        <input
          type="range"
          min="20"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5236A0]"
        />
      </footer>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #5236A0;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 4px 10px rgba(82, 54, 160, 0.3);
          transition: all 0.2s ease;
        }
        input[type='range']::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default PrayerDetail;