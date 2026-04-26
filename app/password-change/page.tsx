"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = () => {
    if (!oldPass || !newPass || !confirmPass) {
      setError("Harap isi semua kolom!");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    setError("");
    alert("Password berhasil diperbarui!");
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6] font-sans">
      <div className="w-[375px] h-[812px] bg-white border-8 border-slate-800 rounded-[40px] p-6 flex flex-col shadow-xl">

        {/* HEADER */}
        <div className="flex items-center gap-4 mt-4 mb-10">
          <button
            onClick={() => router.back()}
            className="hover:bg-gray-100 p-1 rounded-full transition active:scale-90"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold">Ubah Password</h1>
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-6">

          {/* OLD PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 ml-1">
              Password Lama
            </label>
            <div className="flex items-center px-4 py-4 rounded-2xl border bg-gray-100 focus-within:bg-white focus-within:border-[#51309E] transition">
              <span className="mr-3">🔒</span>
              <input
                type="password"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Masukkan password lama"
                className="bg-transparent w-full outline-none text-sm font-medium"
              />
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* NEW PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 ml-1">
              Password Baru
            </label>
            <div className="flex items-center px-4 py-4 rounded-2xl border bg-gray-100 focus-within:bg-white focus-within:border-[#51309E] transition">
              <span className="mr-3">🔑</span>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Masukkan password baru"
                className="bg-transparent w-full outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 ml-1">
              Konfirmasi Password Baru
            </label>
            <div className={`flex items-center px-4 py-4 rounded-2xl border transition ${
              error ? "border-red-400 bg-white" : "bg-gray-100"
            }`}>
              <span className="mr-3">✅</span>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setError("");
                }}
                placeholder="Ulangi password baru"
                className="bg-transparent w-full outline-none text-sm font-medium"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 font-medium">
              {error}
            </p>
          )}

        </div>

        {/* BUTTON */}
        <div className="pb-6">
          <button
            onClick={handleUpdate}
            className="w-full py-5 bg-[#51309E] text-white rounded-3xl font-bold text-lg 
                       shadow-lg active:scale-95 transition-all"
          >
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}