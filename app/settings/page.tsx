"use client";

import React from 'react';
import { ChevronLeft, Key, ChevronRight, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const user = {
    name: "Aqsa",
    email: "Aqsa@gmail.com",
    avatar: "https://via.placeholder.com/150" 
  };

  return (
    <div className="max-w-md mx-auto bg-[#FDFBFA] min-h-screen flex flex-col font-sans text-[#3D4759] shadow-2xl border-x border-gray-100">
      
      {/* HEADER */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-10">
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-7 h-7 text-black" strokeWidth={2.5} />
        </motion.button>
        <h1 className="text-2xl font-bold ml-2">Settings</h1>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 p-6 space-y-8">
        
        {/* PROFILE CARD */}
        <div className="bg-white p-4 rounded-[28px] shadow-sm flex items-center gap-4 border border-gray-50">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-indigo-100 shrink-0 border-2 border-white shadow-sm">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1A1A1A] tracking-tight">{user.name}</span>
            <span className="text-sm text-gray-400 font-medium">{user.email}</span>
          </div>
        </div>

        {/* SECTION: AKUN */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-black text-[#8E9AAF] uppercase tracking-[0.2em] ml-1">
            Akun
          </h2>
          
          {/* MENU ITEM: UBAH PASSWORD (DENGAN IKON YANG DIPERBARUI) */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white p-4 rounded-[24px] flex items-center justify-between shadow-sm border border-gray-50 group hover:border-indigo-100 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Wadah Ikon Kunci yang Lebih Bagus */}
              <div className="w-12 h-12 bg-[#F8F9FF] rounded-2xl flex items-center justify-center shadow-inner">
                <div className="bg-[#51309E]/10 p-2 rounded-xl">
                  <Key className="w-6 h-6 text-[#51309E]" strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg text-[#1A1A1A]">Ubah password</span>
              </div>
            </div>

            <div className="bg-gray-50 p-1.5 rounded-full group-hover:bg-indigo-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-black group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
            </div>
          </motion.button>
        </div>

      </main>

      {/* FOOTER: SIGN OUT */}
      <footer className="p-6">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-full bg-[#FFF0F0] py-4 rounded-[20px] flex items-center justify-center gap-2 transition-all hover:shadow-md active:bg-red-100"
        >
          <LogOut className="w-5 h-5 text-[#FF4D4D]" strokeWidth={2.5} />
          <span className="font-bold text-[#FF4D4D] tracking-wide">Sign Out</span>
        </motion.button>
      </footer>

    </div>
  );
};

export default SettingsPage;