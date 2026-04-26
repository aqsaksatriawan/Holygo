"use client";

import React, { useState } from 'react';
import { ChevronLeft, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const LupaPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mengirim instruksi ke:", email);
    alert("Instruksi telah dikirim ke email Anda.");
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col font-sans text-[#3D4759] shadow-2xl border-x border-gray-100">
      
      {/* HEADER: Tombol Back Bulat */}
      <header className="p-6">
        <motion.button 
          whileTap={{ scale: 0.8 }}
          className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-50 text-gray-600 hover:bg-gray-50 transition-all"
          onClick={() => console.log('Back clicked')}
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
        </motion.button>
      </header>

      {/* CONTENT */}
      <main className="flex-1 px-8 pt-4 space-y-6">
        {/* Judul & Deskripsi */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#1A1A1A] flex items-center gap-2">
            Lupa Password? <span className="text-3xl">🔑</span>
          </h1>
          <p className="text-[#8E9AAF] leading-relaxed font-medium">
            Jangan khawatir! Masukkan alamat email yang terdaftar, kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-8 pt-4">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#3D4759] ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#51309E] transition-colors" />
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8F9FB] py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#51309E]/10 transition-all placeholder-gray-300 font-medium border border-transparent focus:border-gray-100"
                required
              />
            </div>
          </div>

          {/* Tombol Kirim */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full bg-[#51309E] hover:bg-[#432785] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all"
          >
            <span>Kirim Instruksi</span>
            <Send className="w-4 h-4 rotate-[-15deg]" />
          </motion.button>
        </form>
      </main>

      {/* FOOTER: Navigasi ke Login */}
      <footer className="p-8 text-center">
        <p className="text-sm font-medium text-gray-400">
          Ingat password?{" "}
          <button 
            className="text-[#51309E] font-bold hover:underline underline-offset-4"
            onClick={() => console.log('Go to Login')}
          >
            Login sekarang
          </button>
        </p>
      </footer>

    </div>
  );
};

export default LupaPassword;