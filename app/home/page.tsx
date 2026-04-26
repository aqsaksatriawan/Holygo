"use client";
import { useState } from "react";
import { Bookmark, User, Search, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // Gunakan objek transisi yang sederhana tanpa variabel terpisah jika masih error
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] overflow-y-auto shadow-xl relative">

        {/* HEADER */}
        <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-white z-50 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#51309E] rounded-lg flex flex-col items-center justify-center overflow-hidden shrink-0">
              <div className="w-5 h-1.5 bg-[#A6CE39] mb-0.5 rounded-sm"></div>
              <div className="w-5 h-4 bg-[#A6CE39] rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[#51309E]">holy</span>
              <span className="text-[#A6CE39]">Go</span>
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <motion.button 
              whileTap={{ scale: 0.75 }}
              // Penulisan inline seperti ini paling aman dari error tipe data
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Bookmark className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.75 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <User className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
            </motion.button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-5 pt-6 pb-24">

          {/* SEARCH */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for prayers..."
              className="w-full h-14 bg-[#F3F4F6] rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#51309E]/10 transition-all"
            />
          </div>

          {/* KATEGORI */}
          <div className="mb-10">
            <h2 className="text-[10px] font-black text-[#8E9AAF] uppercase tracking-[0.2em] mb-4 ml-1">
              KATEGORI
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {["Sehari-hari", "Haji", "Umroh"].map((item, i) => (
                <motion.div
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex flex-col items-center justify-center aspect-square bg-[#F8F9FB] rounded-[24px] border border-gray-50 cursor-pointer"
                >
                  <div className="text-2xl mb-2">
                    {i === 0 ? "🌙" : i === 1 ? "🧭" : "🗺️"}
                  </div>
                  <span className="text-[11px] font-bold text-[#3D4759]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* DOA */}
          <div>
            <div className="flex justify-between items-center mb-5 px-1">
              <h2 className="text-[10px] font-black text-[#8E9AAF] uppercase tracking-[0.2em]">
                DOA
              </h2>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#51309E]"
              >
                <PlusCircle className="w-4 h-4" />
                Tambah Doa
              </motion.button>
            </div>

            {/* CARD DOA */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
              <motion.button 
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute top-6 right-6 p-1"
              >
                <Bookmark className="w-5 h-5 text-[#1A1A1A]" strokeWidth={2} />
              </motion.button>

              <h3 className="text-lg font-bold text-[#1A1A1A] mb-6 pr-8">
                Doa Sebelum makan
              </h3>

              <div className="text-right text-2xl leading-loose mb-6 font-serif text-[#1A1A1A]">
                اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ
              </div>

              <div className="space-y-3">
                <p className="text-sm italic text-[#8E9AAF] leading-relaxed">
                  Allahumma barik lana fima razaqtana wa qina 'adhaban-nar.
                </p>

                <p className="text-sm text-[#3D4759] leading-relaxed">
                  <span className="font-bold text-[#1A1A1A]">Artinya:</span>{" "}
                  Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan
                  dan lindungi kami dari api neraka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}