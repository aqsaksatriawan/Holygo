"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { X, CheckSquare } from 'lucide-react';

interface PrayerData {
  judul: string;
  doa: string;
  latin: string;
  terjemahan: string;
}

const TambahDoa: React.FC = () => {
  const [formData, setFormData] = useState<PrayerData>({
    judul: '',
    doa: '',
    latin: '',
    terjemahan: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Data Doa Disimpan:', formData);
    // Tambahkan logika integrasi database atau API di sini
    alert('Doa berhasil disimpan!');
  };

  return (
    <div className="max-w-md mx-auto bg-[#FDFBFA] min-h-screen p-6 font-sans shadow-xl border-x border-gray-100">
      {/* Header Section dengan Tombol X Melingkar */}
      <div className="relative flex items-center justify-center mb-8 pt-2">
        {/* Tombol X dengan Lingkaran */}
        <button 
          type="button"
          className="absolute left-0 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-95 group"
          onClick={() => console.log('Close clicked')}
          aria-label="Tutup"
        >
          <X className="w-5 h-5 text-[#3D4759] group-hover:text-black" strokeWidth={2.5} />
        </button>
        
        {/* Judul Halaman Centered */}
        <h1 className="text-xl font-bold text-[#3D4759]">Tambah Doa</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Judul Doa */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">Judul Doa</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="..................................."
            className="w-full p-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-[#3D4759]"
          />
        </div>

        {/* Input Doa (Teks Arab/Utama) */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">Doa</label>
          <textarea
            name="doa"
            rows={4}
            value={formData.doa}
            onChange={handleChange}
            placeholder="..................................."
            className="w-full p-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-[#3D4759] resize-none"
          />
        </div>

        {/* Input Latin */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">Latin</label>
          <textarea
            name="latin"
            rows={3}
            value={formData.latin}
            onChange={handleChange}
            placeholder="..................................."
            className="w-full p-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-[#3D4759] resize-none"
          />
        </div>

        {/* Input Terjemahan */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">Terjemahan (Indonesian)</label>
          <textarea
            name="terjemahan"
            rows={3}
            value={formData.terjemahan}
            onChange={handleChange}
            placeholder="..................................."
            className="w-full p-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-all placeholder-gray-300 text-[#3D4759] resize-none"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-[#5236A0] hover:bg-[#432C85] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100"
        >
          <CheckSquare className="w-5 h-5" />
          Save My Prayer
        </button>
      </form>
    </div>
  );
};

export default TambahDoa;