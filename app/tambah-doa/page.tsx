"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { X, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface PrayerData {
  judul: string;
  doa: string;
  latin: string;
  terjemahan: string;
}

const TambahDoa: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<PrayerData>({
    judul: "",
    doa: "",
    latin: "",
    terjemahan: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("holygo_user") || "{}");

    if (!user.id) {
      alert("User belum login");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Doa berhasil disimpan ke bookmark!");

        setFormData({
          judul: "",
          doa: "",
          latin: "",
          terjemahan: "",
        });

        router.push("/bookmark");
      } else {
        alert(data.message || "Gagal menyimpan doa");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FDFBFA] min-h-screen p-6 font-sans shadow-xl border-x border-gray-100">
      <div className="relative flex items-center justify-center mb-8 pt-2">
        <button
          type="button"
          className="absolute left-0 p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-95 group"
          onClick={() => router.push("/home")}
        >
          <X
            className="w-5 h-5 text-[#3D4759] group-hover:text-black"
            strokeWidth={2.5}
          />
        </button>

        <h1 className="text-xl font-bold text-[#3D4759]">Tambah Doa</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">
            Judul Doa
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white shadow-sm outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">
            Doa
          </label>
          <textarea
            name="doa"
            rows={4}
            value={formData.doa}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white shadow-sm outline-none resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">
            Latin
          </label>
          <textarea
            name="latin"
            rows={3}
            value={formData.latin}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white shadow-sm outline-none resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-[#8E9AAF] ml-1">
            Terjemahan
          </label>
          <textarea
            name="terjemahan"
            rows={3}
            value={formData.terjemahan}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white shadow-sm outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5236A0] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8"
        >
          <CheckSquare className="w-5 h-5" />
          Save My Prayer
        </button>
      </form>
    </div>
  );
};

export default TambahDoa;